import { lerp } from '../math/lerp.ts'
import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import { Polyline } from '../primitives/Polyline.ts'
import type { Vec2 } from '../primitives/Vec2.ts'

export type Surface = (uv: Vec2) => number

export interface SliceSurfaceOptions {
  // (u_count, v_count)
  // slices are labeled like the planes they are in. E.g.
  // u-slice 0 is the first slice with u = constant
  slice_counts: Vec2
  // (u_samples, v_samples)
  // these are how many samples between each slit in the u direction/v direction
  samples_between: Vec2
  /**
   * (width, max_height) of each slice in world space units
   * This is the dimensions of the part with the curve, not the base
   */
  slice_dimensions: Dimensionlike
  /**
   * How far below the xy-plane the base extends in world space units
   */
  base_depth: number
  // How thick a slit should be in units of world space
  slit_thickness: number
}

export class Slicer {
  slice_counts: Direction2P
  slit_spacing: Direction2P
  slice_dimensions: Direction2P
  samples_between: Direction2P
  slit_thickness: number
  base_depth: number

  constructor(options: SliceSurfaceOptions) {
    this.slice_counts = Direction2P.from_vec2(options.slice_counts)
    const cell_counts = this.slice_counts.add(new Direction2P(1, 1))
    this.slit_spacing = new Direction2P(1, 1).div_components(cell_counts)
    this.slit_thickness = options.slit_thickness
    this.samples_between = Direction2P.from_vec2(options.samples_between)
    this.slice_dimensions = Direction2P.from_dimensions(options.slice_dimensions)
    this.base_depth = options.base_depth
  }

  get full_slice_dimensions(): Direction2P {
    const { width, height } = this.slice_dimensions
    return new Direction2P(width, height + this.base_depth)
  }

  /**
   * Make a slice through the surface along the plane u=u0. The slits
   * will be cut on the upper edge (i.e. the curved part)
   * @param u0 The constant u value that indicates the slice plane
   * @param surface The surface function
   * @returns A polyline representing the slice
   */
  #make_u_slice(u0: number, surface: Surface): Polyline {
    const { width, height } = this.slice_dimensions
    const depth = this.base_depth

    const f = (v: number) => height * surface(new Direction2P(u0, v)) + depth
    const slit_count = this.slice_counts.y
    const samples_between = this.samples_between.y
    const samples_ends = samples_between + 1

    const slit_thickness_v = this.slit_thickness / width
    const slit_radius = 0.5 * slit_thickness_v

    // compute spacings in units of the v coordinate (i.e. [0, 1])
    const slit_spacing_v = 1.0 / (slit_count + 1)
    const sample_spacing_ends_v = slit_spacing_v / (samples_ends + 1)
    const sample_spacing_between_v = (slit_spacing_v - slit_thickness_v) / (samples_between + 1)

    const vertices = [
      // Since the slits are on the top, the base will always be a horizontal
      // line.
      new Point2P(0, 0),
      new Point2P(width, 0),
      // Right corner
      new Point2P(width, f(1)),
    ]

    // we're now proceeding from right to left across the top of the slice

    // samples between the top right corner and the rightmost slit
    for (let i = 0; i < samples_ends; i++) {
      const v = 1.0 - sample_spacing_ends_v * (i + 1)
      vertices.push(new Point2P(width * v, f(v)))
    }

    // rightmost slit
    const slit_v = slit_spacing_v * slit_count
    const right_v = slit_v + slit_radius
    const left_v = slit_v - slit_radius
    const bottom_height = 0.5 * f(slit_v)
    const left_height = f(left_v)
    const right_height = f(right_v)
    vertices.push(
      new Point2P(width * right_v, right_height),
      new Point2P(width * right_v, bottom_height),
      new Point2P(width * left_v, bottom_height),
      new Point2P(width * left_v, left_height),
    )

    // for the remaining slits...
    for (let i = 0; i < slit_count - 1; i++) {
      // Add samples between slits...
      const prev_slit_left = slit_spacing_v * (slit_count - i) - slit_radius
      for (let j = 0; j < samples_between; j++) {
        const v = prev_slit_left - (j + 1) * sample_spacing_between_v
        vertices.push(new Point2P(width * v, f(v)))
      }

      // ... and the next slit itself
      const slit_v = slit_spacing_v * (slit_count - 1 - i)
      const right_v = slit_v + slit_radius
      const left_v = slit_v - slit_radius
      const bottom_height = 0.5 * f(slit_v)
      const left_height = f(left_v)
      const right_height = f(right_v)
      vertices.push(
        new Point2P(width * right_v, right_height),
        new Point2P(width * right_v, bottom_height),
        new Point2P(width * left_v, bottom_height),
        new Point2P(width * left_v, left_height),
      )
    }

    // Samples between the first slit and the leftmost corner
    for (let i = 0; i < samples_ends; i++) {
      // We want samples 1, 2, ..., samples_ends - 1
      // but listed in reverse order
      const v = sample_spacing_ends_v * (samples_ends - i)
      vertices.push(new Point2P(width * v, f(v)))
    }

    vertices.push(
      // Left corner
      new Point2P(0, f(0)),
    )
    return new Polyline({ vertices, closed: true })
  }

  #make_v_slice(v0: number, surface: Surface): Polyline {
    const { width, height } = this.slice_dimensions
    const depth = this.base_depth

    const f = (u: number) => height * surface(new Direction2P(u, v0)) + depth
    const slit_count = this.slice_counts.x
    const samples_between = this.samples_between.x
    const samples_ends = samples_between + 1

    const vertices = [
      // bottom left corner
      new Point2P(0, 0),
    ]

    // slits from left to right
    const slit_spacing_u = 1.0 / (slit_count + 1)
    const slit_thickness_u = this.slit_thickness / width
    const slit_radius = 0.5 * slit_thickness_u
    for (let i = 0; i < slit_count; i++) {
      const slit_u = (i + 1) * slit_spacing_u
      const left_u = slit_u - slit_radius
      const right_u = slit_u + slit_radius
      const slit_height = 0.5 * f(slit_u)
      vertices.push(
        new Point2P(width * left_u, 0),
        new Point2P(width * left_u, slit_height),
        new Point2P(width * right_u, slit_height),
        new Point2P(width * right_u, 0),
      )
    }

    vertices.push(
      // slits go here
      // bottom right corner
      new Point2P(width, 0),
      // top right corner
      new Point2P(width, f(1)),
      // top samples
    )

    // samples across the top from right to left.
    // The count of samples matches the u-slice traversal,
    // but the samples are evenly spaced here so the loop is simpler
    const top_samples = (slit_count - 1) * samples_between + 3 * slit_count + 2 * samples_ends
    const top_sample_spacing = 1.0 / (top_samples + 1)
    for (let i = 0; i < top_samples; i++) {
      const u = (top_samples - i) * top_sample_spacing
      vertices.push(new Point2P(width * u, f(u)))
    }

    vertices.push(
      // top left corner
      new Point2P(0, f(0)),
    )
    return new Polyline({ vertices, closed: true })
  }

  slice(surface: Surface): Polyline[] {
    const result = []
    for (let i = 0; i < this.slice_counts.x; i++) {
      const u0 = (i + 1) * this.slit_spacing.x
      result.push(this.#make_u_slice(u0, surface))
    }

    for (let i = 0; i < this.slice_counts.y; i++) {
      const v0 = (i + 1) * this.slit_spacing.y
      result.push(this.#make_v_slice(v0, surface))
    }
    return result
  }
}
