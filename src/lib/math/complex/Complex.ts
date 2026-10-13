import { is_inf } from '../is_inf'
import { is_nearly } from '../is_nearly'

export class Complex {
  real: number
  imag: number

  constructor(real: number, imag: number = 0) {
    if (isNaN(real) || isNaN(imag)) {
      throw new Error('NaN NaN NaN NaN NaN NaN NaN NaN BatNaN!')
    }

    if (is_nearly(real, 0) && is_nearly(imag, 0)) {
      this.real = 0
      this.imag = 0
    } else if (is_inf(real) || is_inf(imag)) {
      this.real = Infinity
      this.imag = Infinity
    } else {
      this.real = real
      this.imag = imag
    }
  }

  get is_inf() {
    // The constructor enforces that both components will be infinity
    // if either of them were.
    return this.real === Infinity
  }

  get is_zero() {
    // The constructor enforces that both components will be exactly 0
    return this.real === 0 && this.imag === 0
  }

  static from_polar(r: number, theta: number): Complex {
    if (r === 0.0) {
      return Complex.ZERO
    }

    const s = Math.sin(theta)
    const c = Math.cos(theta)

    return new Complex(r * c, r * s)
  }

  static roots_of_unity(n: number): Complex[] {
    const result = new Array(n)
    for (let i = 0; i < n; i++) {
      const angle = (2.0 * Math.PI) / n
      const c = Math.cos(i * angle)
      const s = Math.sin(i * angle)
      result[i] = new Complex(c, s)
    }
    return result
  }

  get is_real(): boolean {
    return is_nearly(this.imag, 0.0)
  }

  get is_imag(): boolean {
    return is_nearly(this.real, 0.0)
  }

  get is_finite(): boolean {
    return !this.is_inf
  }

  get norm(): number {
    if (this.is_inf) {
      return Infinity
    }

    if (this.is_zero) {
      return 0
    }

    const { real, imag } = this
    return real * real + imag * imag
  }

  get mag(): number {
    return Math.sqrt(this.norm)
  }

  get arg(): number | undefined {
    if (this.is_inf || this.is_zero) {
      return undefined
    }

    return Math.atan2(this.imag, this.real)
  }

  get conj(): Complex {
    if (this.is_zero || this.is_inf) {
      return this
    }

    return new Complex(this.real, -this.imag)
  }

  get inv(): Complex {
    if (this.is_inf) {
      return Complex.ZERO
    }

    if (this.is_zero) {
      return Complex.INF
    }

    const { real: a, imag: b } = this

    // 1/z = conj(z) / |z|^2 = (a - bi) / (a^2 + b^2)

    const denom = a * a + b * b
    return new Complex(a / denom, -b / denom)
  }

  get sqrt(): Complex {
    if (this.is_zero || this.is_inf) {
      return this
    }

    const r = this.mag
    // We already handled 0 and inf but TypeScript can't infer that.
    const theta = this.arg ?? 0

    const sqrt_r = Math.sqrt(r)
    const half_theta = theta / 2.0
    return Complex.from_polar(sqrt_r, half_theta)
  }

  add(other: Complex): Complex {
    if (this.is_inf || other.is_inf) {
      return Complex.INF
    }

    const { real: a, imag: b } = this
    const { real: c, imag: d } = other
    return new Complex(a + c, b + d)
  }

  sub(other: Complex): Complex {
    if (this.is_inf && other.is_inf) {
      throw new Error("can't subtract infinity from infinity!")
    }

    if (this.is_inf || other.is_inf) {
      return Complex.INF
    }

    const { real: a, imag: b } = this
    const { real: c, imag: d } = other
    return new Complex(a - c, b - d)
  }

  mul(other: Complex): Complex {
    if ((this.is_zero && other.is_inf) || (this.is_inf && other.is_zero)) {
      throw new Error("can't multiply zero and infinity!")
    }

    if (this.is_zero || other.is_zero) {
      return Complex.ZERO
    }

    if (this.is_inf || other.is_inf) {
      return Complex.INF
    }

    const { real: a, imag: b } = this
    const { real: c, imag: d } = other
    return new Complex(a * c - b * d, a * d + b * c)
  }

  get neg(): Complex {
    if (this.is_inf) {
      return Complex.INF
    }

    if (this.is_zero) {
      return Complex.ZERO
    }

    const { real, imag } = this
    return new Complex(-real, -imag)
  }

  div(other: Complex): Complex {
    return this.mul(other.inv)
  }

  dot(other: Complex): number {
    return this.mul(other.conj).real
  }

  wedge(other: Complex): number {
    return this.conj.mul(other).imag
  }

  equals(other: Complex): boolean {
    if ((this.is_zero && other.is_zero) || (this.is_inf && other.is_inf)) {
      return true
    }

    if (this.is_finite && other.is_finite) {
      return is_nearly(this.real, other.real) && is_nearly(this.imag, other.imag)
    }

    return false
  }

  toString(): string {
    if (this.is_inf) {
      return '♾️'
    }

    if (this.is_zero) {
      return '0'
    }

    if (this.is_real) {
      return this.real.toFixed(3)
    } else if (this.is_imag) {
      return `${this.imag.toFixed(3)}i`
    }

    return `(${this.real.toFixed(3)} + ${this.imag.toFixed(3)}i)`
  }

  static readonly ZERO = new Complex(0)
  static readonly ONE = new Complex(1)
  static readonly I = new Complex(0, 1)
  static readonly INF = new Complex(Infinity, Infinity)
}
