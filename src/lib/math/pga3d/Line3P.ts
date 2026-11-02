import { is_nearly } from '../is_nearly.ts'
import { Direction3P } from './Direction3P.ts'
import type { Even3P } from './Even3P.ts'
import type { Plane3P } from './Plane3P.ts'
import { Point3P } from './Point3P.ts'

export class Line3P {
  bivec: Even3P

  /**
   * Do not construct directly, compute either from joining two points
   * or meeting two planes
   * @param bivec
   */
  constructor(bivec: Even3P) {
    this.bivec = bivec
  }

  meet(other: Plane3P): Point3P | Direction3P {
    const trivec = this.bivec.wedge(other.vec)
    if (is_nearly(trivec.xyz, 0)) {
      return Direction3P.from_trivec(trivec)
    }
    return Point3P.from_trivec(trivec)
  }

  join(other: Point3P): Plane3P {
    throw new Error('not implemented')
  }
}
