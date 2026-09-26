import { is_nearly } from '../is_nearly.js'
import { Odd2P } from './Odd2P.js'

// Much of the math here is determined by using the geometric algebra library
// kingdon. See my other repo math-notebook in symbolic/gaproduct.py.
// At the time of this writing
// this is in the cga branch
export class Even2P {
  scalar: number
  xy: number
  xo: number
  yo: number

  constructor(scalar: number, xy: number, xo: number, yo: number) {
    this.scalar = scalar
    this.xy = xy
    this.xo = xo
    this.yo = yo
  }

  /**
   * Add two Even2P multivectors together
   * @param {Even2P} other
   * @returns {Even2P}
   */
  add(other: Even2P): Even2P {
    const scalar = this.scalar + other.scalar
    const xy = this.xy + other.xy
    const xo = this.xo + other.xo
    const yo = this.yo + other.yo
    return new Even2P(scalar, xy, xo, yo)
  }

  /**
   * Subtract two Even2P multivectors
   * @param {Even2P} other
   * @returns {Even2P}
   */
  sub(other: Even2P): Even2P {
    const scalar = this.scalar - other.scalar
    const xy = this.xy - other.xy
    const xo = this.xo - other.xo
    const yo = this.yo - other.yo
    return new Even2P(scalar, xy, xo, yo)
  }

  /**
   * Compute the multivector y such that for each blade,
   * x_i wedge y_i = pseudoscalar
   * @returns {Odd}
   */
  dual(): Odd2P {
    // this_blade ^ abs_dual(this_blade) = sign * xyo
    // dual(this_blade) = sign * abs_dual(this_blade)
    // 1 ^ xyo = xyo
    // xy ^ o = xyo
    // xo ^ y = -xyo
    // yo ^ x = xyo
    const x = this.yo
    const y = -this.xo
    const o = this.xy
    const xyo = this.scalar

    return new Odd2P(x, y, o, xyo)
  }

  // in 2D PGA, the antidual has exactly the same signs as the dual
  // so we get this function for free!
  antidual = this.dual

  reverse() {
    return new Even2P(this.scalar, -this.xy, -this.xo, -this.yo)
  }

  /**
   * Compute the regressive product with another Even2P multivector
   * @param other The other Even2P multivector
   * @returns The regressive product
   */
  vee_Even2P(other: Even2P): Odd2P {
    // Bread V = A + Bxy + Cxo + Dyo
    const { xy: axy, xo: axo, yo: ayo } = this
    // Filling U = a + bxy + cxo + dyo
    const { xy: bxy, xo: bxo, yo: byo } = other

    const x = -axo * bxy + axy * bxo
    const y = -ayo * bxy + axy * byo
    const o = axo * byo - ayo * bxo
    // Since the regressive product reduces grade, we will never get the
    // pseudoscalar
    return new Odd2P(x, y, o, 0)
  }

  vee_odd(other: Odd2P) {
    throw new Error('Not implemented')
  }

  equals(other: Even2P): boolean {
    return (
      is_nearly(this.scalar, other.scalar) &&
      is_nearly(this.xy, other.xy) &&
      is_nearly(this.xo, other.xo) &&
      is_nearly(this.yo, other.yo)
    )
  }

  sandwich_even(other: Even2P): Even2P {
    // Bread V = A + Bxy + Cxo + Dyo
    const { scalar: as, xy: axy, xo: axo, yo: ayo } = this
    // Filling U = a + bxy + cxo + dyo
    const { scalar: bs, xy: bxy, xo: bxo, yo: byo } = other

    const mag_sqr = as * as + axy * axy
    if (is_nearly(mag_sqr, 0)) {
      return Even2P.ZERO
    }

    const scalar = bs
    const xy = bxy
    const xo =
      -(
        -2 * axo * axy * bxy +
        2 * ayo * as * bxy +
        -as * as * bxo +
        -2 * as * axy * byo +
        axy * axy * bxo
      ) / mag_sqr
    const yo =
      -(
        -2 * axo * as * bxy +
        -2 * ayo * axy * bxy +
        -as * as * byo +
        2 * as * axy * bxo +
        axy * axy * byo
      ) / mag_sqr
    return new Even2P(scalar, xy, xo, yo)
  }

  sandwich_odd(other: Odd2P): Odd2P {
    const { scalar: as, xy: axy, xo: axo, yo: ayo } = this
    const { x: bx, y: by, o: bo, xyo: bxyo } = other

    const mag_sqr = as * as + axy * axy
    if (is_nearly(mag_sqr, 0)) {
      return Odd2P.ZERO
    }

    const x = (as * as * bx + 2 * as * axy * by - axy * axy * bx) / mag_sqr
    const y = (as * as * by - 2 * as * axy * bx - axy * axy * by) / mag_sqr
    const o =
      (-2 * axo * as * bx +
        -2 * axo * axy * by +
        -2 * ayo * as * by +
        2 * ayo * axy * bx +
        as * as * bo +
        axy * axy * bo) /
      mag_sqr
    const xyo = bxyo

    return new Odd2P(x, y, o, xyo)
  }

  sandwich(other: Even2P): Even2P
  sandwich(other: Odd2P): Odd2P
  sandwich(other: Even2P | Odd2P): Even2P | Odd2P {
    if (other instanceof Odd2P) {
      return this.sandwich_odd(other)
    }

    return this.sandwich_even(other)
  }

  /*
  unit_sandwich(other: Odd2P): Odd2P
  unit_sandwich(other: Even2P): Even2P
  unit_sandwich(other: Even2P | Odd2P): Even2P | Odd2P {
    return this.gp(other).gp(this.reverse)
  }
    */

  static lerp(a: Even2P, b: Even2P, t: number): Even2P {
    const s = 1 - t

    const scalar = s * a.scalar + t * b.scalar
    const xy = s * a.xy + t * b.xy
    const xo = s * a.xo + t * b.xo
    const yo = s * a.yo + t * b.yo

    return new Even2P(scalar, xy, xo, yo)
  }

  toString() {
    return `${this.scalar.toPrecision(2)} + ${this.xy.toPrecision(
      2,
    )}xy + ${this.xo.toPrecision(2)}xo + ${this.yo.toPrecision(2)}yo`
  }

  static readonly ZERO = new Even2P(0, 0, 0, 0)
  static readonly IDENTITY = new Even2P(1, 0, 0, 0)
}
