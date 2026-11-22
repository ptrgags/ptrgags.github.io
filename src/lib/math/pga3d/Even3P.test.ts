import { describe, it, expect } from 'vitest'
import { Even3P } from './Even3P.ts'
import { Odd3P } from './Odd3P.ts'

// These tests are checked against the kingdon GA library
// see math-notebook repo
describe('Even3P', () => {
  it('adds Even2P multivectors', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.add(b)

    const expected = new Even3P(-2, 3, 1, 6, 9, 3, 8, 10)
    expect(result).toBeEven3P(expected)
  })

  it('subtracts Even3P multivectors', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.sub(b)

    const expected = new Even3P(4, 1, 5, 2, 1, 9, 6, 6)
    expect(result).toBeEven3P(expected)
  })

  it('computes dual', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.dual()

    const expected = new Even3P(8, 7, -6, 5, 4, -3, 2, 1)
    expect(result).toBeEven3P(expected)
  })

  it('antidual same as dual in 3D PGA', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)

    const a_dual = a.dual()
    const a_antidual = a.antidual()

    expect(a_dual).toBeEven3P(a_antidual)
  })

  it('computes reverse', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.reverse()

    const expected = new Even3P(1, -2, -3, -4, -5, -6, -7, 8)
    expect(result).toBeEven3P(expected)
  })

  it('computes geometric product with Even3P multivector', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.gp(b)

    const expected = new Even3P(-19, -27, -8, -47, -4, -54, -7, 34)
    expect(result).toBeEven3P(expected)
  })

  it('computes geometric product with Odd3P multivector', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.gp(b)

    const expected = new Odd3P(-27, 9, -6, 47, -18, -34, 45, 28)
    expect(result).toBeOdd3P(expected)
  })

  it('computes wedge with Even3P multivector', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.wedge(b)

    const expected = new Even3P(-3, -5, -11, -10, -11, -21, -20, 34)
    expect(result).toBeEven3P(expected)
  })

  it('computes wedge with Odd3P multivector', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.wedge(b)

    const expected = new Odd3P(-3, 1, -2, 2, -18, -21, -6, 31)
    expect(result).toBeOdd3P(expected)
  })

  it('computes vee with Even3P multivector', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.vee(b)

    const expected = new Even3P(-34, -12, 10, -24, -42, 12, -22, -16)
    expect(result).toBeEven3P(expected)
  })

  it('computes vee with Odd3P multivector', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.vee(b)

    const expected = new Odd3P(-3, -51, -13, 3, -32, 24, -8, -16)
    expect(result).toBeOdd3P(expected)
  })

  /*
  it('lerp with t zero returns first point', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2)

    const result = Even3P.lerp(a, b, 0.0)

    expect(result).toBeEven3P(a)
  })

  it('lerp with t one returns second point', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = Even3P.lerp(a, b, 1.0)

    expect(result).toBeEven3P(b)
  })

  it('lerp with t in between interpolates', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = Even3P.lerp(a, b, 0.75)

    const expected = new Even3P(-2, 1.25, -0.75, 2.5)
    expect(result).toBeEven3P(expected)
  })

  it('lerp with t negative extrapolates', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = Even3P.lerp(a, b, -1)

    const expected = new Even3P(5, 3, 8, 6)
    expect(result).toBeEven3P(expected)
  })

  it('lerp with t out of bounds extrapolates', () => {
    const a = new Even3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = Even3P.lerp(a, b, 2)

    const expected = new Even3P(-7, 0, -7, 0)
    expect(result).toBeEven3P(expected)
  })
    */
})
