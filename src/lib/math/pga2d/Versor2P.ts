import type { Vec2 } from '../../primitives/Vec2.ts'
import { Group } from '../Group.ts'
import { Even2P } from './Even2P.ts'
import { Odd2P } from './Odd2P.ts'

export class Versor2P {
  versor: Even2P | Odd2P

  constructor(versor: Even2P | Odd2P) {
    this.versor = versor
  }

  equals(other: Versor2P): boolean {
    if (this.versor instanceof Even2P && other.versor instanceof Even2P) {
      return this.versor.equals(other.versor)
    } else if (this.versor instanceof Odd2P && other.versor instanceof Odd2P) {
      return this.versor.equals(other.versor)
    }

    // one is even, the other is odd
    return false
  }

  /**
   * Translation
   * @param offset Translation amount (dx, dy)
   * @returns An even versor
   */
  static translation(offset: Vec2): Versor2P {
    const { x, y } = offset
    const xo = x
    const yo = y
    const versor = new Even2P(1, 0, xo, yo)
    return new Versor2P(versor)
  }

  /**
   * Rotation about the origin
   * @param angle Angle in radians
   * @returns An even versor
   */
  static rotation(angle: number): Versor2P {
    const half_angle = angle / 2
    const c = Math.cos(half_angle)
    const s = Math.sin(half_angle)

    // the versor cos(theta/2) + sin(theta / 2)xy rotates in the negative
    // direction, so use -sin() instead
    const versor = new Even2P(c, -s, 0, 0)
    return new Versor2P(versor)
  }

  /**
   * Reflection in plane through the origin
   * @param normal normal vector that determines the reflection direction
   * @returns An odd versor
   */
  static reflection(normal: Vec2): Versor2P {
    const { x, y } = normal
    const versor = new Odd2P(x, y, 0, 0)
    return new Versor2P(versor)
  }

  /**
   * Shorthand for an n-fold rotation (i.e. rotation by 2pi/n or 1/n of a full turn)
   * @param n number of folds
   * @returns A rotation versor
   */
  static rot_n(n: number): Versor2P {
    return Versor2P.rotation((2 * Math.PI) / n)
  }

  inv(): Versor2P {
    return new Versor2P(this.versor.reverse())
  }

  compose(other: Versor2P): Versor2P {
    return new Versor2P(this.versor.gp(other.versor))
  }

  static readonly IDENTITY = new Versor2P(Even2P.IDENTITY)
  static readonly FLIP_X = new Versor2P(new Odd2P(1, 0, 0, 0))
  static readonly FLIP_Y = new Versor2P(new Odd2P(0, 1, 0, 0))
}

export const GVersor2P = new Group<Versor2P>({
  equals(a, b) {
    return a.equals(b)
  },
  identity() {
    return Versor2P.IDENTITY
  },
  // group operation: composition
  mul(a, b) {
    return a.compose(b)
  },
  inv(g) {
    return g.inv()
  },
})
