import type { Vec3 } from '../vector/Vec3.ts'
import { VectorSpace } from '../VectorSpace.ts'
import { Line3P } from './Line3P.ts'
import { Odd3P } from './Odd3P.ts'
import { Plane3P } from './Plane3P.ts'
import { Point3P } from './Point3P.ts'

export class Direction3P implements Vec3 {
  trivec: Odd3P

  constructor(x: number, y: number, z: number) {
    const xyz = 1
    const xyo = z
    const xzo = -y
    const yzo = x
    this.trivec = new Odd3P(0, 0, 0, 0, xyz, xyo, xzo, yzo)
  }

  static from_vec3(point: Vec3): Direction3P {
    if (point instanceof Direction3P) {
      return point
    }

    const { x, y, z } = point
    return new Direction3P(x, y, z)
  }

  static from_trivec(trivec: Odd3P): Direction3P {
    throw new Error('not implemented')
  }

  to_point(): Point3P {
    return new Point3P(this.x, this.y, this.z)
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

  scale(scalar: number): Direction3P {
    return new Direction3P(scalar * this.x, scalar * this.z, scalar * this.y)
  }

  dual(): Plane3P {
    const vec = this.trivec.dual()
    return Plane3P.from_vec(vec)
  }

  neg(): Direction3P {
    return new Direction3P(-this.x, -this.y, -this.z)
  }

  add(other: Direction3P): Direction3P {
    throw new Error('not implemented')
  }

  sub(other: Direction3P): Direction3P {
    throw new Error('not implemented')
  }

  join(other: Point3P): Line3P
  join(other: Direction3P): Line3P
  join(other: Line3P): Plane3P
  join(other: Point3P | Direction3P | Line3P): Line3P | Plane3P {
    throw new Error('not implemented')
  }

  equals(other: Direction3P): boolean {
    return this.trivec.equals(other.trivec)
  }

  static readonly ZERO = new Direction3P(0, 0, 0)
}

export const VS3P = new VectorSpace<Direction3P>({
  equals(a, b) {
    return a.equals(b)
  },
  zero() {
    return Direction3P.ZERO
  },
  add(a, b) {
    return a.add(b)
  },
  neg(v) {
    return v.neg()
  },
  scale(k, v) {
    return v.scale(k)
  },
  efficient_combo(scalars, vectors) {
    let x = 0
    let y = 0
    let z = 0
    for (let i = 0; i < scalars.length; i++) {
      const k = scalars[i]
      const { x: vx, y: vy, z: vz } = vectors[i]
      x += k * vx
      y += k * vy
      z += k * vz
    }

    return new Direction3P(x, y, z)
  },
})
