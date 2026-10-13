import { describe, it, expect } from 'vitest'
import { Complex } from './Complex'

describe('Complex', () => {
  it.for([
    { real: -3.0, imag: NaN, label: 'NaN in imaginary part' },
    { real: NaN, imag: 3.0, label: 'NaN in real part' },
    { real: NaN, imag: NaN, label: 'NaN in both components' },
  ])('constructor throws for $label', ({ real, imag }) => {
    expect(() => {
      return new Complex(real, imag)
    }).toThrow('NaN')
  })

  it.for([
    { real: Infinity, imag: 3.0, label: 'inf in real part' },
    { real: -Infinity, imag: 3.0, label: 'neg inf in real part' },
    { real: 4.0, imag: Infinity, label: 'inf in imag part' },
    { real: 4.0, imag: -Infinity, label: 'neg inf in imag part' },
    { real: Infinity, imag: -Infinity, label: 'inf in both parts' },
  ])('constructor returns INF for $label', ({ real, imag }) => {
    const result = new Complex(real, imag)

    expect(result).toBeComplex(Complex.INF)
  })

  it('new_returns_zero_for_exactly_zero', () => {
    const result = new Complex(0.0, 0.0)

    expect(result).toEqual(Complex.ZERO)
  })

  it.for([
    { real: 1.0, imag: 0.0, label: '1' },
    { real: -1.0, imag: 0.0, label: 'negative 1' },
    { real: 0.0, imag: 1.0, label: 'i' },
    { real: 3.0, imag: -4.0, label: 'arbitrary complex number' },
  ])('constructor with $label returns finite complex', ({ real, imag }) => {
    const result = new Complex(real, imag)

    const expected = new Complex(real, imag)
    expect(result).toEqual(expected)
  })

  it('from_polar_computes_one', () => {
    const result = Complex.from_polar(1, 0)

    expect(result).toBeComplex(Complex.ONE)
  })

  it('from_polar with pi/2 computes I', () => {
    const result = Complex.from_polar(1.0, Math.PI / 2)

    expect(result).toBeComplex(Complex.I)
  })

  it('from_polar computes arbitrary point', () => {
    const result = Complex.from_polar(2.0, Math.PI / 3)

    // From high school trig, a 30 degree angle will give (cos, sin) = (1/2, sqrt(3)/2)
    // but the radius of 2 clears the denominator
    let expected = new Complex(1.0, Math.sqrt(3))
    expect(result).toBeComplex(expected)
  })

  it('is_finite with infinity returns false', () => {
    const result = Complex.INF.is_finite

    expect(result).toBe(false)
  })

  it('is_finite with zero returns true', () => {
    const result = Complex.ZERO.is_finite

    expect(result).toBe(true)
  })

  it('is_finite with finite complex returns true', () => {
    const result = new Complex(1.0, 2.0).is_finite

    expect(result).toBe(true)
  })

  it('sum_of_additive_inverses_is_zero', () => {
    const a = new Complex(3.0, 4.0)
    const b = new Complex(-3.0, -4.0)

    const sum = a.add(b)

    expect(sum).toEqual(Complex.ZERO)
  })

  it('sum_of_finites_is_finite', () => {
    const a = new Complex(10.0, 2.0)
    const b = new Complex(3.0, 5.0)

    const sum = a.add(b)

    expect(sum).toEqual(new Complex(13.0, 7.0))
  })

  it('display_formats_zero_as_zero', () => {
    const result = Complex.ZERO.toString()

    expect(result).toEqual('0')
  })

  it('display_formats_infinity_as_emoji', () => {
    const result = Complex.INF.toString()

    expect(result).toEqual('♾️')
  })

  it.for([
    { pole: Complex.ZERO, label: 'zero' },
    { pole: Complex.INF, label: 'infinity' },
  ])('sqrt fixes $label', ({ pole }) => {
    const result = pole.sqrt

    expect(result).toEqual(pole)
  })
})
