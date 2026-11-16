import { is_nearly } from '../is_nearly.ts'
import { Even2P } from './Even2P.ts'

export class Odd2P {
  x: number
  y: number
  o: number
  xyo: number
  constructor(x: number, y: number, o: number, xyo: number) {
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

  scale(scalar: number): Odd2P {
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

  add(other: Odd2P): Odd2P {
    const x = this.x + other.x
    const y = this.y + other.y
    const o = this.o + other.o
    const xyo = this.xyo + other.xyo
    return new Odd2P(x, y, o, xyo)
  }

  sub(other: Odd2P): Odd2P {
    const x = this.x - other.x
    const y = this.y - other.y
    const o = this.o - other.o
    const xyo = this.xyo - other.xyo
    return new Odd2P(x, y, o, xyo)
  }

  dual(): Even2P {
    return new Even2P(this.xyo, this.o, -this.y, this.x)
  }

  antidual = this.dual

  reverse(): Odd2P {
    return new Odd2P(this.x, this.y, this.o, -this.xyo)
  }

  #gp_odd(odd: Odd2P): Even2P {
    const { x: Ax, y: Ay, o: Ao, xyo: Axyo } = this
    const { x: Bx, y: By, o: Bo, xyo: Bxyo } = odd
    const scalar = Ax * Bx + Ay * By
    const xo = -(Ao * Bx + Axyo * By - Ax * Bo + Ay * Bxyo)
    const yo = -(Ao * By - Axyo * Bx - Ax * Bxyo - Ay * Bo)
    const xy = Ax * By - Ay * Bx

    return new Even2P(scalar, xy, xo, yo)
  }

  #gp_even(even: Even2P): Odd2P {
    const { x: Ax, y: Ay, o: Ao, xyo: Axyo } = this
    const { scalar: Bs, xy: Bxy, xo: Bxo, yo: Byo } = even
    const x = Ax * Bs - Ay * Bxy
    const y = Ax * Bxy + Ay * Bs
    const o = Ao * Bs - Axyo * Bxy - Ax * -Bxo - Ay * -Byo
    const xyo = Ao * Bxy + Axyo * Bs - Ax * -Byo + Ay * -Bxo
    return new Odd2P(x, y, o, xyo)
  }

  gp(other: Even2P): Odd2P
  gp(other: Odd2P): Even2P
  gp(other: Even2P | Odd2P): Even2P | Odd2P
  gp(other: Even2P | Odd2P): Even2P | Odd2P {
    if (other instanceof Odd2P) {
      return this.#gp_odd(other)
    }

    return this.#gp_even(other)
  }

  dot(other: Odd2P): number {
    // The o and xyo components square to zero, so they are needed
    const { x: ax, y: ay } = this
    const { x: bx, y: by } = other

    return ax * bx + ay * by
  }

  #wedge_odd(odd: Odd2P): Even2P {
    // Note that the pseudoscalar part xyo will always wedge to 0, so we can
    // ignore it.
    const { x: ax, y: ay, o: ao } = this
    const { x: bx, y: by, o: bo } = odd

    const xy_part = ax * by - ay * bx
    const xo_part = ax * bo - ao * bx
    const yo_part = ay * bo - ao * by

    return new Even2P(0, xy_part, xo_part, yo_part)
  }

  #wedge_even(even: Even2P): Odd2P {
    const { x: Ax, y: Ay, o: Ao, xyo: Axyo } = this
    const { scalar: Bs, xy: Bxy, xo: Bxo, yo: Byo } = even
    const x = Ax * Bs
    const y = Ay * Bs
    const o = Ao * Bs
    const xyo = Ao * Bxy + Axyo * Bs - Ax * -Byo + Ay * -Bxo
    return new Odd2P(x, y, o, xyo)
  }

  wedge(other: Even2P): Odd2P
  wedge(other: Odd2P): Even2P
  wedge(other: Even2P | Odd2P): Even2P | Odd2P
  wedge(other: Even2P | Odd2P): Even2P | Odd2P {
    if (other instanceof Odd2P) {
      return this.#wedge_odd(other)
    }
    return this.#wedge_even(other)
  }

  #vee_even(even: Even2P): Even2P {
    const { x: Ax, y: Ay, o: Ao, xyo: Axyo } = this
    const { scalar: Bs, xy: Bxy, xo: Bxo, yo: Byo } = even
    const scalar = Ao * Bxy + Axyo * Bs - Ax * -Byo + Ay * -Bxo
    const xo = -(Axyo * -Bxo)
    const yo = -(Axyo * -Byo)
    const xy = Axyo * Bxy
    return new Even2P(scalar, xy, xo, yo)
  }

  #vee_odd(odd: Odd2P): Odd2P {
    const { x: Ax, y: Ay, o: Ao, xyo: Axyo } = this
    const { x: Bx, y: By, o: Bo, xyo: Bxyo } = odd
    const o = Ao * Bxyo + Axyo * Bo
    const x = Axyo * Bx + Ax * Bxyo
    const y = Axyo * By + Ay * Bxyo
    const xyo = Axyo * Bxyo
    return new Odd2P(x, y, o, xyo)
  }

  vee(other: Even2P): Even2P
  vee(other: Odd2P): Odd2P
  vee(other: Even2P | Odd2P): Even2P | Odd2P
  vee(other: Even2P | Odd2P): Even2P | Odd2P {
    if (other instanceof Odd2P) {
      return this.#vee_odd(other)
    }
    return this.#vee_even(other)
  }

  equals(other: Odd2P): boolean {
    return (
      is_nearly(this.x, other.x) &&
      is_nearly(this.y, other.y) &&
      is_nearly(this.o, other.o) &&
      is_nearly(this.xyo, other.xyo)
    )
  }

  toString(): string {
    return `${this.x.toPrecision(2)}x + ${this.y.toPrecision(
      2,
    )}y + ${this.o.toPrecision(2)}o + ${this.xyo.toPrecision(2)}xyo`
  }

  static readonly ZERO = new Odd2P(0, 0, 0, 0)
}
