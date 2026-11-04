import { type Vec2 } from '../primitives/Vec2.ts'
import { Direction2P, VS2P } from './pga2d/Direction2P.ts'
import { Point2P } from './pga2d/Point2P.ts'
import type { Vec3 } from './vector/Vec3.ts'

export class CRS32 {
  origin: Point2P
  basis_x: Direction2P
  basis_y: Direction2P
  basis_z: Direction2P

  constructor(origin: Vec2, basis_x: Vec2, basis_y: Vec2, basis_z: Vec2) {
    this.origin = Point2P.from_vec2(origin)
    this.basis_x = Direction2P.from_vec2(basis_x)
    this.basis_y = Direction2P.from_vec2(basis_y)
    this.basis_z = Direction2P.from_vec2(basis_z)
  }

  position(coords: Vec3): Point2P {
    return this.origin.add(this.offset(coords))
  }

  offset(coords: Vec3): Direction2P {
    const { x, y, z } = coords
    return VS2P.combo([x, y, z], [this.basis_x, this.basis_y, this.basis_z])
  }
}
