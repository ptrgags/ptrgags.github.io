import { is_nearly } from '../is_nearly.js'
import { Odd2C } from './Odd2C.js'

export class Even2C {
  scalar: any
  xy: any
  xp: any
  xm: any
  yp: any
  ym: any
  pm: any
  xypm: any

  /**
   * Constructor
   * @param {number} scalar
   * @param {number} xy
   * @param {number} xp
   * @param {number} xm
   * @param {number} yp
   * @param {number} ym
   * @param {number} pm
   * @param {number} xypm
   */
  constructor(
    scalar: number,
    xy: number,
    xp: number,
    xm: number,
    yp: number,
    ym: number,
    pm: number,
    xypm: number,
  ) {
    this.scalar = scalar
    this.xy = xy
    this.xp = xp
    this.xm = xm
    this.yp = yp
    this.ym = ym
    this.pm = pm
    this.xypm = xypm
  }

  /**
   * Compute the squared norm of the multivector
   * TODO: I need to check the math on this, as the dot product isn't
   * always a scalar in 4D+
   * @returns {number}
   */
  norm_sqr(): number {
    return (
      this.xy * this.xy +
      this.xp * this.xp +
      this.xm * this.xm +
      this.yp * this.yp -
      this.ym * this.ym -
      this.pm * this.pm -
      this.xypm * this.xypm
    )
  }

  /**
   * Get the magnitude of the multivector
   * @returns {number}
   */
  norm(): number {
    const norm_sqr = this.norm_sqr()
    if (norm_sqr < 0) {
      throw new Error('taking norm of negative multivector')
    }

    return Math.sqrt(norm_sqr)
  }

  /**
   * Rescale the multivector so it has unit magnitude
   * @returns {Even2C}
   */
  normalize(): Even2C {
    const length = this.norm()
    if (is_nearly(length, 0)) {
      return this
    }

    return new Even2C(
      this.scalar / length,
      this.xy / length,
      this.xp / length,
      this.xm / length,
      this.yp / length,
      this.ym / length,
      this.pm / length,
      this.xypm / length,
    )
  }

  /**
   * Negate all the coordinates of this multivector
   * @returns {Even2C}
   */
  neg(): Even2C {
    return new Even2C(
      -this.scalar,
      -this.xy,
      -this.xp,
      -this.xm,
      -this.yp,
      -this.ym,
      -this.pm,
      -this.xypm,
    )
  }

  /**
   * Add two even multivectors together
   * @param {Even2C} other
   * @returns {Even2C}
   */
  add(other: Even2C): Even2C {
    const scalar = this.scalar + other.scalar
    const xy = this.xy + other.xy
    const xp = this.xp + other.xp
    const xm = this.xm + other.xm
    const yp = this.yp + other.yp
    const ym = this.ym + other.ym
    const pm = this.pm + other.pm
    const xypm = this.xypm + other.xypm

    return new Even2C(scalar, xy, xp, xm, yp, ym, pm, xypm)
  }

  /**
   * Subtract two even multivectors
   * @param {Even2C} other
   * @returns {Even2C}
   */
  sub(other: Even2C): Even2C {
    const scalar = this.scalar - other.scalar
    const xy = this.xy - other.xy
    const xp = this.xp - other.xp
    const xm = this.xm - other.xm
    const yp = this.yp - other.yp
    const ym = this.ym - other.ym
    const pm = this.pm - other.pm
    const xypm = this.xypm - other.xypm

    return new Even2C(scalar, xy, xp, xm, yp, ym, pm, xypm)
  }

  /**
   * Compute the Hodge dual
   * @returns {Even2C}
   */
  dual(): Even2C {
    // this_blade ^ abs_dual(this_blade) = sign * xypm
    // dual(this_blade) = sign * abs_dual(this_blade)
    // 1 ^ xypm = xypm
    // xy ^ pm = xypm
    // xp ^ ym = -xypm
    // xm ^ yp = xypm
    // yp ^ xm = xypm
    // ym ^ xp = -xypm
    // pm ^ xy = xypm
    // xypm ^ 1 = xypm
    const scalar = this.xypm
    const xy = this.pm
    const xp = -this.ym
    const xm = this.yp
    const yp = this.xm
    const ym = -this.xp
    const pm = this.xy
    const xypm = this.scalar
    return new Even2C(scalar, xy, xp, xm, yp, ym, pm, xypm)
  }

  /**
   * in 2D CGA, the anti (hodge) dual of an even multivector
   * has the same signs as the dual, so we get this for free!
   * @returns {Even2C}
   */
  antidual = this.dual

  /**
   * The reverse operation takes each blade and reverses the
   * order of basis vectors. This makes the bivector part
   * reverse orientation
   * @returns {Even2C}
   */
  reverse(): Even2C {
    return new Even2C(
      this.scalar,
      -this.xy,
      -this.xp,
      -this.xm,
      -this.yp,
      -this.ym,
      -this.pm,
      this.xypm,
    )
  }

  /**
   * Check if two Even2C objects are equal
   * @param {Even2C} other
   */
  equals(other: Even2C) {
    return (
      is_nearly(this.scalar, other.scalar) &&
      is_nearly(this.xy, other.xy) &&
      is_nearly(this.xp, other.xp) &&
      is_nearly(this.xm, other.xm) &&
      is_nearly(this.yp, other.yp) &&
      is_nearly(this.ym, other.ym) &&
      is_nearly(this.pm, other.pm) &&
      is_nearly(this.xypm, other.xypm)
    )
  }

  // Geometric product code partially generated with the help of
  // my repo math-notebook, specifically the symbolic subdirectory which
  // uses kingdon for symbolic computation.

  /**
   * Geometric product with an even multivector
   * @param {Even2C} even
   * @returns {Even2C}
   */
  #gp_even(even: Even2C): Even2C {
    const { scalar: As, xy: Axy, xp: Axp, xm: Axm, yp: Ayp, ym: Aym, pm: Apm, xypm: Axypm } = this
    const { scalar: Bs, xy: Bxy, xp: Bxp, xm: Bxm, yp: Byp, ym: Bym, pm: Bpm, xypm: Bxypm } = even

    const scalar =
      Apm * Bpm +
      As * Bs +
      Axm * Bxm -
      Axp * Bxp -
      Axy * Bxy -
      Axypm * Bxypm +
      Aym * Bym -
      Ayp * Byp
    const xy =
      Apm * Bxypm +
      As * Bxy +
      Axm * Bym -
      Axp * Byp +
      Axy * Bs +
      Axypm * Bpm -
      Aym * Bxm +
      Ayp * Bxp
    const xp =
      -Apm * Bxm +
      As * Bxp +
      Axm * Bpm +
      Axp * Bs +
      Axy * Byp -
      Axypm * Bym -
      Aym * Bxypm -
      Ayp * Bxy
    const xm =
      -Apm * Bxp +
      As * Bxm +
      Axm * Bs +
      Axp * Bpm +
      Axy * Bym -
      Axypm * Byp -
      Aym * Bxy -
      Ayp * Bxypm
    const yp =
      -Apm * Bym +
      As * Byp +
      Axm * Bxypm +
      Axp * Bxy -
      Axy * Bxp +
      Axypm * Bxm +
      Aym * Bpm +
      Ayp * Bs
    const ym =
      -Apm * Byp +
      As * Bym +
      Axm * Bxy +
      Axp * Bxypm -
      Axy * Bxm +
      Axypm * Bxp +
      Aym * Bs +
      Ayp * Bpm
    const pm =
      Apm * Bs +
      As * Bpm +
      Axm * Bxp -
      Axp * Bxm -
      Axy * Bxypm -
      Axypm * Bxy +
      Aym * Byp -
      Ayp * Bym
    const xypm =
      Apm * Bxy +
      As * Bxypm +
      Axm * Byp -
      Axp * Bym +
      Axy * Bpm +
      Axypm * Bs -
      Aym * Bxp +
      Ayp * Bxm

    return new Even2C(scalar, xy, xp, xm, yp, ym, pm, xypm)
  }

  /**
   * Geometric product with an odd multivector
   * @param {Odd2C} odd
   * @returns {Odd2C}
   */
  #gp_odd(odd: Odd2C): Odd2C {
    const { scalar: As, xy: Axy, xp: Axp, xm: Axm, yp: Ayp, ym: Aym, pm: Apm, xypm: Axypm } = this
    const { x: Bx, y: By, p: Bp, m: Bm, xyp: Bxyp, xym: Bxym, xpm: Bxpm, ypm: Bypm } = odd

    const x =
      Apm * Bxpm + As * Bx - Axm * Bm + Axp * Bp + Axy * By + Axypm * Bypm + Aym * Bxym - Ayp * Bxyp
    const y =
      Apm * Bypm + As * By - Axm * Bxym + Axp * Bxyp - Axy * Bx - Axypm * Bxpm - Aym * Bm + Ayp * Bp
    const p =
      -Apm * Bm +
      As * Bp -
      Axm * Bxpm -
      Axp * Bx -
      Axy * Bxyp +
      Axypm * Bxym -
      Aym * Bypm -
      Ayp * By
    const m =
      -Apm * Bp +
      As * Bm -
      Axm * Bx -
      Axp * Bxpm -
      Axy * Bxym +
      Axypm * Bxyp -
      Aym * By -
      Ayp * Bypm
    const xyp =
      -Apm * Bxym +
      As * Bxyp -
      Axm * Bypm -
      Axp * By +
      Axy * Bp -
      Axypm * Bm +
      Aym * Bxpm +
      Ayp * Bx
    const xym =
      -Apm * Bxyp +
      As * Bxym -
      Axm * By -
      Axp * Bypm +
      Axy * Bm -
      Axypm * Bp +
      Aym * Bx +
      Ayp * Bxpm
    const xpm =
      Apm * Bx + As * Bxpm - Axm * Bp + Axp * Bm + Axy * Bypm + Axypm * By + Aym * Bxyp - Ayp * Bxym
    const ypm =
      Apm * By + As * Bypm - Axm * Bxyp + Axp * Bxym - Axy * Bxpm - Axypm * Bx - Aym * Bp + Ayp * Bm

    return new Odd2C(x, y, p, m, xyp, xym, xpm, ypm)
  }

  /**
   * Geometric Product
   * @param {Odd2C | Even2C} other
   * @returns {Odd2C | Even2C}
   */
  gp(other: Odd2C): Odd2C
  gp(other: Even2C): Even2C
  gp(other: Odd2C | Even2C): Odd2C | Even2C {
    if (other instanceof Even2C) {
      return this.#gp_even(other)
    }

    return this.#gp_odd(other)
  }

  #wedge_even(even: Even2C): Even2C {
    const { scalar: As, xy: Axy, xp: Axp, xm: Axm, yp: Ayp, ym: Aym, pm: Apm, xypm: Axypm } = this
    const { scalar: Bs, xy: Bxy, xp: Bxp, xm: Bxm, yp: Byp, ym: Bym, pm: Bpm, xypm: Bxypm } = even

    const scalar = As * Bs
    const xy = As * Bxy + Axy * Bs
    const xp = As * Bxp + Axp * Bs
    const xm = As * Bxm + Axm * Bs
    const yp = As * Byp + Ayp * Bs
    const ym = As * Bym + Aym * Bs
    const pm = Apm * Bs + As * Bpm
    const xypm =
      Apm * Bxy +
      As * Bxypm +
      Axm * Byp -
      Axp * Bym +
      Axy * Bpm +
      Axypm * Bs -
      Aym * Bxp +
      Ayp * Bxm

    return new Even2C(scalar, xy, xp, xm, yp, ym, pm, xypm)
  }

  #wedge_odd(odd: Odd2C): Odd2C {
    const { scalar: As, xy: Axy, xp: Axp, xm: Axm, yp: Ayp, ym: Aym, pm: Apm, xypm: Axypm } = this
    const { x: Bx, y: By, p: Bp, m: Bm, xyp: Bxyp, xym: Bxym, xpm: Bxpm, ypm: Bypm } = odd

    const x = As * Bx
    const y = As * By
    const p = As * Bp
    const m = As * Bm
    const xym = As * Bxyp - Axp * By + Axy * Bp + Ayp * Bx
    const xyp = As * Bxym - Axm * By + Axy * Bm + Aym * Bx
    const xpm = Apm * Bx + As * Bxpm - Axm * Bp + Axp * Bm
    const ypm = Apm * By + As * Bypm - Aym * Bp + Ayp * Bm
    return new Odd2C(x, y, p, m, xyp, xym, xpm, ypm)
  }

  wedge(even: Even2C): Even2C
  wedge(odd: Odd2C): Odd2C
  wedge(other: Even2C | Odd2C): Even2C | Odd2C
  wedge(other: Even2C | Odd2C): Even2C | Odd2C {
    if (other instanceof Even2C) {
      return this.#wedge_even(other)
    }

    return this.#wedge_odd(other)
  }

  #vee_even(even: Even2C): Even2C {
    const { scalar: As, xy: Axy, xp: Axp, xm: Axm, yp: Ayp, ym: Aym, pm: Apm, xypm: Axypm } = this
    const { scalar: Bs, xy: Bxy, xp: Bxp, xm: Bxm, yp: Byp, ym: Bym, pm: Bpm, xypm: Bxypm } = even
    const scalar =
      Apm * Bxy +
      As * Bxypm +
      Axm * Byp -
      Axp * Bym +
      Axy * Bpm +
      Axypm * Bs -
      Aym * Bxp +
      Ayp * Bxm
    const xy = Axy * Bxypm + Axypm * Bxy
    const xp = Axp * Bxypm + Axypm * Bxp
    const xm = Axm * Bxypm + Axypm * Bxm
    const yp = Axypm * Byp + Ayp * Bxypm
    const ym = Axypm * Bym + Aym * Bxypm
    const pm = Apm * Bxypm + Axypm * Bpm
    const xypm = Axypm * Bxypm
    return new Even2C(scalar, xy, xp, xm, yp, ym, pm, xypm)
  }

  #vee_odd(odd: Odd2C): Odd2C {
    const { scalar: As, xy: Axy, xp: Axp, xm: Axm, yp: Ayp, ym: Aym, pm: Apm, xypm: Axypm } = this
    const { x: Bx, y: By, p: Bp, m: Bm, xyp: Bxyp, xym: Bxym, xpm: Bxpm, ypm: Bypm } = odd
    const x = Axm * Bxyp - Axp * Bxym + Axy * Bxpm + Axypm * Bx
    const y = Axy * Bypm + Axypm * By + Aym * Bxyp - Ayp * Bxym
    const p = Apm * Bxyp + Axp * Bypm + Axypm * Bp - Ayp * Bxpm
    const m = Apm * Bxym + Axm * Bypm + Axypm * Bm - Aym * Bxpm
    const xyp = Axypm * Bxyp
    const xym = Axypm * Bxym
    const xpm = Axypm * Bxpm
    const ypm = Axypm * Bypm
    return new Odd2C(x, y, p, m, xyp, xym, xpm, ypm)
  }

  vee(even: Even2C): Even2C
  vee(odd: Odd2C): Odd2C
  vee(other: Even2C | Odd2C): Even2C | Odd2C
  vee(other: Even2C | Odd2C): Even2C | Odd2C {
    if (other instanceof Even2C) {
      return this.#vee_even(other)
    }

    return this.#vee_odd(other)
  }

  /**
   * Compute the sandwich product A * B * A.rev() for unit versor A
   * (i.e. a Even2C that squares to 1).
   * @param {Even2C | Odd2C} other
   * @returns {Even2C | Odd2C}
   */
  unit_sandwich(other: Even2C): Even2C
  unit_sandwich(other: Odd2C): Odd2C
  unit_sandwich(other: Even2C | Odd2C): Even2C | Odd2C {
    if (other instanceof Even2C) {
      return this.gp(other).gp(this.reverse())
    }
    return this.gp(other).gp(this.reverse())
  }

  /**
   * Interpolate between even multivectors
   * @param {Even2C} a First multivector
   * @param {Even2C} b Second multivector
   * @param {number} t Interpolation factor
   * @returns {Even2C} Interpolated value
   */
  static lerp(a: Even2C, b: Even2C, t: number): Even2C {
    const s = 1 - t

    const scalar = s * a.scalar + t * b.scalar
    const xy = s * a.xy + t * b.xy
    const xp = s * a.xp + t * b.xp
    const xm = s * a.xm + t * b.xm
    const yp = s * a.yp + t * b.yp
    const ym = s * a.ym + t * b.ym
    const pm = s * a.pm + t * b.pm
    const xypm = s * a.xypm + t * b.xypm

    return new Even2C(scalar, xy, xp, xm, yp, ym, pm, xypm)
  }

  static readonly ZERO = new Even2C(0, 0, 0, 0, 0, 0, 0, 0)
  static readonly ONE = new Even2C(1, 0, 0, 0, 0, 0, 0, 0)
  static readonly IDENTITY = new Even2C(1, 0, 0, 0, 0, 0, 0, 0)
}
