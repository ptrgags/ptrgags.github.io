import { is_nearly } from '../is_nearly.ts'
import type { Line3P } from './Line3P.ts'
import { Odd3P } from './Odd3P.ts'
import type { Point3P } from './Point3P.ts'

export class Plane3P {
  vec: Odd3P
  is_infinite: boolean

  constructor(nx: number, ny: number, nz: number, d: number) {
    const mag_sqr = nx * nx + ny * ny + nz * nz

    this.is_infinite = is_nearly(mag_sqr, 0)

    if (this.is_infinite) {
      this.vec = new Odd3P(0, 0, 0, -d, 0, 0, 0, 0)
    } else {
      const mag = Math.sqrt(mag_sqr)
      this.vec = new Odd3P(nx / mag, ny / mag, nz / mag, -d / mag, 0, 0, 0, 0)
    }
  }

  static from_vec(vec: Odd3P): Plane3P {
    throw new Error('not implemented')
  }

  meet(other: Line3P): Point3P
  meet(other: Plane3P): Line3P
  meet(other: Line3P | Plane3P): Point3P | Line3P {
    throw new Error('not implemented')
  }

  static readonly XY_PLANE = new Plane3P(0, 0, 1, 0)
  static readonly YZ_PLANE = new Plane3P(1, 0, 0, 0)
  static readonly ZX_PLANE = new Plane3P(0, 1, 0, 0)
}
