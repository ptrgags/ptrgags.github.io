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
  // these are how many samples along the length of a slice
  sample_counts: Vec2
  /**
   * (width, max_height) of each slice in the output units (e.g. pixels, mm, etc)
   */
  slice_dimensions: Dimensionlike
  // How thick a slit should be in units of uv. This must be the same for
  // both u and v slices, which is why this field is a number and not Vec2
  slit_thickness: number
}

export class Slicer {
  slice_counts: Direction2P
  slit_spacing: Direction2P
  slice_dimensions: Direction2P
  slit_thickness: number

  constructor(options: SliceSurfaceOptions) {
    this.slice_counts = Direction2P.from_vec2(options.slice_counts)
    const cell_counts = this.slice_counts.add(new Direction2P(1, 1))
    this.slit_spacing = new Direction2P(1, 1).div_components(cell_counts)
    this.slit_thickness = options.slit_thickness
    this.slice_dimensions = Direction2P.from_dimensions(options.slice_dimensions)
  }

  #make_u_slice(u: number): Polyline {
    const { width, height } = this.slice_dimensions
    const vertices = [
      new Point2P(0, 0),
      new Point2P(width, 0),
      new Point2P(width, height),
      new Point2P(0, height),
    ]

    // iterate from v = 1 downto v = 0 based on the sample counts
    // however, whenever we cross one of the slices in the orthogonal direction,
    // insert a slit. For u slits, the slits will be in the top half

    return new Polyline({
      vertices,
      closed: true,
    })
  }

  #make_v_slice(v: number): Polyline {
    const { width, height } = this.slice_dimensions
    const vertices = [
      new Point2P(0, 0),
      new Point2P(width, 0),
      new Point2P(width, height),
      new Point2P(0, height),
    ]

    // iterate over the slit spacing and insert splits on the bottom edge
    // then jump up to f(1, v) and sample points on the return path

    return new Polyline({
      vertices,
      closed: true,
    })
  }

  slice(surface: Surface): Polyline[] {
    const result = []
    for (let i = 0; i < this.slice_counts.x; i++) {
      const u0 = (i + 1) * this.slit_spacing.x
      result.push(this.#make_u_slice(u0))
    }

    for (let i = 0; i < this.slice_counts.y; i++) {
      const v0 = (i + 1) * this.slit_spacing.y
      result.push(this.#make_v_slice(v0))
    }
    return result
  }
}
