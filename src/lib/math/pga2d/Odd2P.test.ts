import { describe, it, expect } from 'vitest'
import { Odd2P } from './Odd2P.ts'
import { Even2P } from './Even2P.ts'

describe('Odd2P', () => {
  it('add computes sum', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-1, 3, 4, 1)

    const result = a.add(b)

    const expected = new Odd2P(0, 5, 7, 5)
    expect(result).toBeOdd2P(expected)
  })

  it('sub computes difference', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-1, 3, 4, 1)

    const result = a.sub(b)

    const expected = new Odd2P(2, -1, -1, 3)
    expect(result).toBeOdd2P(expected)
  })

  it('neg negates all components', () => {
    const a = new Odd2P(1, 2, 3, 4)

    const result = a.neg()

    const expected = new Odd2P(-1, -2, -3, -4)
    expect(result).toBeOdd2P(expected)
  })

  it('computes dual', () => {
    const a = new Odd2P(1, 2, 3, 4)

    const result = a.dual()

    const expected = new Even2P(4, 3, -2, 1)
    expect(result).toBeEven2P(expected)
  })

  it('antidual is the same as dual', () => {
    const a = new Odd2P(1, 2, 3, 4)

    const a_dual = a.dual()
    const a_antidual = a.antidual()

    expect(a_dual).toBeEven2P(a_antidual)
  })

  it('computes dot product', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-1, 3, 4, 1)

    const result = a.dot(b)

    const expected = 5
    expect(result).toBe(expected)
  })

  it('computes gp with Even2P multivector', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Even2P(-2, 1, 3, -1)

    const result = a.gp(b)

    const expected = new Odd2P(-4, -3, -9, -12)
    expect(result).toBeOdd2P(expected)
  })

  it('computes gp with Odd2P multivector', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-2, 1, 3, -1)

    const result = a.gp(b)

    const expected = new Even2P(0, 5, 7, -6)
    expect(result).toBeEven2P(expected)
  })

  it('computes wedge with Even2P multivector', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Even2P(-2, 1, 3, -1)

    const result = a.wedge(b)

    const expected = new Odd2P(-2, -4, -6, -12)
    expect(result).toBeOdd2P(expected)
  })

  it('computes wedge with Odd2P multivector', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-2, 1, 3, -1)

    const result = a.wedge(b)

    const expected = new Even2P(0, 5, 9, 3)
    expect(result).toBeEven2P(expected)
  })

  it('computes vee with Even2P multivector', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Even2P(-2, 1, 3, -1)

    const result = a.vee(b)

    const expected = new Even2P(-12, 4, 12, -4)
    expect(result).toBeEven2P(expected)
  })

  it('computes vee with Odd2P multivector', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-2, 1, 3, -1)

    const result = a.vee(b)

    const expected = new Odd2P(-9, 2, 9, -4)
    expect(result).toBeOdd2P(expected)
  })
})
