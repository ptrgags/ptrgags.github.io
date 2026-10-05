import type { Vec2 } from '../primitives/Vec2.ts'
import { Direction2P, VS2P } from './pga2d/Direction2P.ts'
import type { VectorSpace } from './VectorSpace.ts'

export class CRS12 {
  origin: Direction2P
  basis_x: Direction2P

  constructor(origin: Vec2, basis_x: Vec2) {
    this.origin = Direction2P.from_vec2(origin)
    this.basis_x = Direction2P.from_vec2(basis_x)
  }

  /**
   * Convert coordinates within the CRS to a world position. E.g. this can
   * be used to map a number line to screen pixels
   * @param coord coordinate within this CRS. The origin is at coord 0, origin + basis_x is at coord 1
   * @returns World position
   */
  to_world(coord: number): Direction2P {
    return VS2P.combo([1, coord], [this.origin, this.basis_x])
  }
}
