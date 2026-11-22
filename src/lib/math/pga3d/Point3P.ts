import type { Vec3 } from '../vector/Vec3.ts'
import { Direction3P } from './Direction3P.ts'
import type { Line3P } from './Line3P.ts'
import { Odd3P } from './Odd3P.ts'
import { Plane3P } from './Plane3P.ts'

export class Point3P implements Vec3 {
  trivec: Odd3P

  constructor(x: number, y: number, z: number) {
    const xyz = 1
    const xyo = z
    const xzo = -y
    const yzo = x
    this.trivec = new Odd3P(0, 0, 0, 0, xyz, xyo, xzo, yzo)
  }

  static from_vec3(point: Vec3): Point3P {
    if (point instanceof Point3P) {
      return point
    }

    const { x, y, z } = point
    return new Point3P(x, y, z)
  }

  static from_trivec(trivec: Odd3P): Point3P {
    throw new Error('not implemented')
  }

  to_direction() {
    return new Direction3P(this.x, this.y, this.z)
  }

  get x() {
    return this.trivec.yzo
  }

  get y() {
    return -this.trivec.xzo
  }

  get z() {
    return this.trivec.xyo
  }

  dual(): Plane3P {
    const vec = this.trivec.dual()
    return Plane3P.from_vec(vec)
  }

  add(dir: Direction3P): Point3P {
    throw new Error('not implemented')
  }

  sub(other: Point3P): Direction3P {
    throw new Error('not implemented')
  }

  join(other: Point3P): Line3P
  join(other: Direction3P): Line3P
  join(other: Line3P): Plane3P
  join(other: Point3P | Direction3P | Line3P): Line3P | Plane3P {
    throw new Error('not implemented')
  }

  static readonly ORIGIN = new Point3P(0, 0, 0)
}
