import { describe, it, expect } from 'vitest'
import { Odd2P } from './Odd2P.ts'
import { Even2P } from './Even2P.ts'

// These tests are checked against the kingdon GA library
// see math-notebook
describe('Even2P', () => {
  it('adds Even2P multivectors', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Even2P(-3, 1, -2, 2)

    const result = a.add(b)

    const expected = new Even2P(-2, 3, 1, 6)
    expect(result).toBeEven2P(expected)
  })

  it('subtracts Even2P multivectors', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Even2P(-3, 1, -2, 2)

    const result = a.sub(b)

    const expected = new Even2P(4, 1, 5, 2)
    expect(result).toBeEven2P(expected)
  })

  it('computes dual', () => {
    const a = new Even2P(1, 2, 3, 4)

    const result = a.dual()

    const expected = new Odd2P(4, -3, 2, 1)
    expect(result).toBeOdd2P(expected)
  })

  it('dual and antidual are the same in PGA2D', () => {
    const a = new Even2P(1, 2, 3, 4)

    const a_dual = a.dual()
    const a_antidual = a.antidual()

    expect(a_dual).toBeOdd2P(a_antidual)
  })

  it('computes reverse', () => {
    const a = new Even2P(1, 2, 3, 4)

    const result = a.reverse()

    const expected = new Even2P(1, -2, -3, -4)
    expect(result).toBeEven2P(expected)
  })

  it('computes vee with Even2P multivector', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Even2P(-3, 1, -2, 2)

    const result = a.vee(b)

    const expected = new Odd2P(-7, 0, 14, 0)
    expect(result).toBeOdd2P(expected)
  })

  // Even2P vee Odd2P not yet implemented

  it('sandwich with null bread and Even2P filling returns zero', () => {
    const a = new Even2P(0, 0, 1, 0)
    const b = new Even2P(1, 2, 3, 4)

    const result = a.sandwich(b)

    expect(result).toBeEven2P(Even2P.ZERO)
  })

  it('sandwich with null bread and Odd2P filling returns zero', () => {
    const a = new Even2P(0, 0, 1, 0)
    const b = new Odd2P(1, 2, 3, 4)

    const result = a.sandwich(b)

    expect(result).toBeOdd2P(Odd2P.ZERO)
  })

  it('computes sandwich with Even2P filling', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Even2P(-3, 1, -2, 2)

    const result = a.sandwich(b)

    const expected = new Even2P(-3, 1, 3.6, 4.8)
    expect(result).toBeEven2P(expected)
  })

  it('computes sandwich with Odd2P filling', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Odd2P(-3, 1, -2, 2)

    const result = a.sandwich(b)

    const expected = new Odd2P(2.6, 1.8, -12, 2)
    expect(result).toBeOdd2P(expected)
  })

  it('lerp with t zero returns first point', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Even2P(-3, 1, -2, 2)

    const result = Even2P.lerp(a, b, 0.0)

    expect(result).toBeEven2P(a)
  })

  it('lerp with t one returns second point', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Even2P(-3, 1, -2, 2)

    const result = Even2P.lerp(a, b, 1.0)

    expect(result).toBeEven2P(b)
  })

  it('lerp with t in between interpolates', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Even2P(-3, 1, -2, 2)

    const result = Even2P.lerp(a, b, 0.75)

    const expected = new Even2P(-2, 1.25, -0.75, 2.5)
    expect(result).toBeEven2P(expected)
  })

  it('lerp with t negative extrapolates', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Even2P(-3, 1, -2, 2)

    const result = Even2P.lerp(a, b, -1)

    const expected = new Even2P(5, 3, 8, 6)
    expect(result).toBeEven2P(expected)
  })

  it('lerp with t out of bounds extrapolates', () => {
    const a = new Even2P(1, 2, 3, 4)
    const b = new Even2P(-3, 1, -2, 2)

    const result = Even2P.lerp(a, b, 2)

    const expected = new Even2P(-7, 0, -7, 0)
    expect(result).toBeEven2P(expected)
  })
})
