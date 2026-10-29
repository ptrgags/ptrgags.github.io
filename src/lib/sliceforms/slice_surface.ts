import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
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
  // How thick a slit should be in units of uv. This must be the same for
  // both u and v slices, which is why this field is a number and not Vec2
  slit_thickness: number
}

export class Slicer {
  slice_counts: Direction2P
  slit_spacing: Direction2P
  slit_thickness: number

  constructor(options: SliceSurfaceOptions) {
    this.slice_counts = Direction2P.from_vec2(options.slice_counts)
    const cell_counts = this.slice_counts.add(new Direction2P(1, 1))
    this.slit_spacing = new Direction2P(1, 1).div_components(cell_counts)
    this.slit_thickness = options.slit_thickness
  }

  #make_u_slice(u: number): Polyline {
    const vertices = [new Point2P(0, 0), new Point2P(1, 0)]

    // iterate from v = 1 downto v = 0 based on the sample counts
    // however, whenever we cross one of the slices in the orthogonal direction,
    // insert a slit. For u slits, the slits will be in the top half

    return new Polyline({
      vertices,
      closed: true,
    })
  }

  #make_v_slice(v: number): Polyline {
    const vertices = [new Point2P(0, 0)]

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
