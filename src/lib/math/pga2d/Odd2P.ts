export class Odd2P {
  constructor(x, y, o, xyo) {
    this.x = x
    this.y = y
    this.o = o
    this.xyo = xyo
  }

  norm_sqr() {
    return this.x * this.x + this.y * this.y
  }

  norm() {
    return Math.sqrt(this.norm_sqr())
  }

  scale(scalar) {
    return new Odd2P(this.x * scalar, this.y * scalar, this.o * scalar, this.xyo * scalar)
  }

  normalize() {
    const length = this.norm()
    if (is_nearly(length, 0)) {
      return this
    }

    return new Odd2P(this.x / length, this.y / length, this.o / length, this.xyo / length)
  }

  neg() {
    return new Odd2P(-this.x, -this.y, -this.o, -this.xyo)
  }

  add(other) {
    const x = this.x + other.x
    const y = this.y + other.y
    const o = this.o + other.o
    const xyo = this.xyo + other.xyo
    return new Odd2P(x, y, o, xyo)
  }

  sub(other) {
    const x = this.x - other.x
    const y = this.y - other.y
    const o = this.o - other.o
    const xyo = this.xyo - other.xyo
    return new Odd2P(x, y, o, xyo)
  }

  dual() {
    return new Even(this.xyo, this.o, -this.y, this.x)
  }

  antidual = this.dual

  dot(other) {
    // The o and xyo components square to zero, so they are needed
    const { x: ax, y: ay } = this
    const { x: bx, y: by } = other

    return ax * bx + ay * by
  }

  wedge_odd(other) {
    // Note that the pseudoscalar part xyo will always wedge to 0, so we can
    // ignore it.
    const { x: ax, y: ay, o: ao } = this
    const { x: bx, y: by, o: bo } = other

    const xy_part = ax * by - ay * bx
    const xo_part = ax * bo - ao * bx
    const yo_part = ay * bo - ao * by

    return new Even(0, xy_part, xo_part, yo_part)
  }

  wedge_even(other) {
    throw new Error('Not Implemented')
  }

  sandwich_even(other) {
    const { x: ax, y: ay, o: ao, xyo: axyo } = this
    const { scalar: bs, xy: bxy, xo: bxo, yo: byo } = other

    // if the bread is a null vector, the result will be zero
    const mag_sqr = ax * ax + ay * ay
    if (is_nearly(mag_sqr, 0)) {
      return Even.ZERO
    }

    const scalar = bs
    const xy = -bxy
    const xo =
      -(
        2 * ao * ay * bxy +
        -2 * axyo * ax * bxy +
        ax * ax * bxo +
        2 * ax * ay * byo +
        -ay * ay * bxo
      ) / mag_sqr
    const yo =
      -(
        -2 * ao * ax * bxy +
        -2 * axyo * ay * bxy +
        -ax * ax * byo +
        2 * ax * ay * bxo +
        ay * ay * byo
      ) / mag_sqr

    return new Even(scalar, xy, xo, yo)
  }

  sandwich_odd(other) {
    const { x: ax, y: ay, o: ao, xyo: axyo } = this
    const { x: bx, y: by, o: bo, xyo: bxyo } = other

    const mag_sqr = ax * ax + ay * ay
    if (is_nearly(mag_sqr, 0)) {
      return Odd2P.ZERO
    }

    const x = (ax * ax * bx + 2 * ax * ay * by - ay * ay * bx) / mag_sqr
    const y = (-ax * ax * by + 2 * ax * ay * bx + ay * ay * by) / mag_sqr
    const o =
      (2 * ao * ax * bx +
        2 * ao * ay * by +
        2 * axyo * ax * by +
        -2 * axyo * ay * bx +
        -ax * ax * bo +
        -ay * ay * bo) /
      mag_sqr
    const xyo = bxyo

    // Note: for odd[odd], we need to negate the result. The other 3
    // sandwich products have a positive sign.
    return new Odd2P(-x, -y, -o, -xyo)
  }

  sandwich(other) {
    if (other instanceof Odd2P) {
      return this.sandwich_odd(other)
    }

    return this.sandwich_even(other)
  }

  equals(other) {
    return (
      is_nearly(this.x, other.x) &&
      is_nearly(this.y, other.y) &&
      is_nearly(this.o, other.o) &&
      is_nearly(this.xyo, other.xyo)
    )
  }

  toString() {
    return `${this.x.toPrecision(2)}x + ${this.y.toPrecision(
      2,
    )}y + ${this.o.toPrecision(2)}o + ${this.xyo.toPrecision(2)}xyo`
  }
}
Odd2P.ZERO = Object.freeze(new Odd2P(0, 0, 0, 0))
