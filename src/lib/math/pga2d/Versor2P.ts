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

  // TODO: reflection, translation

  /**
   * Rotation about the origin
   * @param angle Angle in radians
   * @returns
   */
  static rotation(angle: number): Versor2P {
    const c = Math.cos(angle / 2)
    const s = Math.sin(angle / 2)

    // the versor cos(theta/2) + sin(theta / 2)xy rotates in the negative
    // direction, so use -sin() instead
    const versor = new Even2P(c, -s, 0, 0)
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
