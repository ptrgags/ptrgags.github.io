import type { Vec2 } from '../primitives/Vec2.ts'
import { Direction2P } from './pga2d/Direction2P.ts'
import { Point2P } from './pga2d/Point2P.ts'

/**
 * 1D coordinate reference system in a 2D world space (e.g. screen space)
 * The class name is pronounced "CRS 1, 2", not "CRS 12"
 */
export class CRS12 {
  origin: Point2P
  basis_x: Direction2P

  constructor(origin: Vec2, basis_x: Vec2) {
    this.origin = Point2P.from_vec2(origin)
    this.basis_x = Direction2P.from_vec2(basis_x)
  }

  /**
   * Convert coordinates within the CRS to a world position. E.g. this can
   * be used to map a number line to screen pixels
   * @param x coordinate within this CRS. The origin is at coord 0, origin + basis_x is at coord 1
   * @returns World position
   */
  position(x: number): Point2P {
    return this.origin.add(this.basis_x.scale(x))
  }

  /**
   * Compute the offset within a CRS ignoring the origin
   * @param x
   * @returns Offset in units of world space
   */
  offset(x: number): Direction2P {
    return this.basis_x.scale(x)
  }
}
