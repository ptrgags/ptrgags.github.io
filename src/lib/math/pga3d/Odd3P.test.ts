import { describe, it, expect } from 'vitest'
import { Odd3P } from './Odd3P.ts'
import { Even3P } from './Even3P.ts'

describe('Odd3P', () => {
  it('add computes sum', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.add(b)

    const expected = new Odd3P(-2, 3, 1, 6, 9, 3, 8, 10)
    expect(result).toBeOdd3P(expected)
  })

  it('sub computes difference', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.sub(b)

    const expected = new Odd3P(4, 1, 5, 2, 1, 9, 6, 6)
    expect(result).toBeOdd3P(expected)
  })

  it('neg negates all components', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.neg()

    const expected = new Odd3P(-1, -2, -3, -4, -5, -6, -7, -8)
    expect(result).toBeOdd3P(expected)
  })

  it('computes dual', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.dual()

    const expected = new Odd3P(-8, 7, -6, 5, -4, 3, -2, 1)
    expect(result).toBeOdd3P(expected)
  })

  it('antidual is the same as -dual', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)

    const a_neg_dual = a.dual().neg()
    const a_antidual = a.antidual()

    expect(a_neg_dual).toBeOdd3P(a_antidual)
  })

  /*
  it('computes dot product', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.dot(b)

    const expected = 5
    expect(result).toBe(expected)
  })
    */

  it('computes gp with Even3P multivector', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.gp(b)

    const expected = new Odd3P(-19, -27, -8, -47, -4, -54, -7, 34)
    expect(result).toBeOdd3P(expected)
  })

  it('computes gp with Odd3P multivector', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.gp(b)

    const expected = new Even3P(-27, 9, -6, 47, -18, -34, 45, 28)
    expect(result).toBeEven3P(expected)
  })

  it('computes wedge with Even3P multivector', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.wedge(b)

    const expected = new Odd3P(-3, -6, -9, -12, -4, -21, -34, 3)
    expect(result).toBeOdd3P(expected)
  })

  it('computes wedge with Odd3P multivector', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.wedge(b)

    const expected = new Even3P(0, 7, 7, 14, -7, 0, 14, 28)
    expect(result).toBeEven3P(expected)
  })

  it('computes vee with Even3P multivector', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.vee(b)

    const expected = new Odd3P(-31, 27, 33, -51, -10, -12, -14, -16)
    expect(result).toBeOdd3P(expected)
  })

  it('computes vee with Odd3P multivector', () => {
    const a = new Odd3P(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd3P(-3, 1, -2, 2, 4, -3, 1, 2)

    const result = a.vee(b)

    const expected = new Even3P(-28, 39, 23, -27, 22, -36, -6, 0)
    expect(result).toBeEven3P(expected)
  })
})
