import { describe, it, expect } from 'vitest'

describe('Odd2P', () => {
  it('add computes sum', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-1, 3, 4, 1)

    const result = a.add(b)

    const expected = new Odd2P(0, 5, 7, 5)
    expect(result).toBeOdd(expected)
  })

  it('sub computes difference', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-1, 3, 4, 1)

    const result = a.sub(b)

    const expected = new Odd2P(2, -1, -1, 3)
    expect(result).toBeOdd(expected)
  })

  it('neg negates all components', () => {
    const a = new Odd2P(1, 2, 3, 4)

    const result = a.neg()

    const expected = new Odd2P(-1, -2, -3, -4)
    expect(result).toBeOdd(expected)
  })

  it('computes dual', () => {
    const a = new Odd2P(1, 2, 3, 4)

    const result = a.dual()

    const expected = new Even(4, 3, -2, 1)
    expect(result).toBeEven(expected)
  })

  it('antidual is the same as dual', () => {
    const a = new Odd2P(1, 2, 3, 4)

    const a_dual = a.dual()
    const a_antidual = a.antidual()

    expect(a_dual).toBeEven(a_antidual)
  })

  it('computes dot product', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-1, 3, 4, 1)

    const result = a.dot(b)

    const expected = 5
    expect(result).toBe(expected)
  })

  it('computes wedge with Odd2P multivector', () => {
    const a = new Odd2P(1, 2, 3, 4)
    const b = new Odd2P(-2, 1, 3, -1)

    const result = a.wedge_odd(b)

    const expected = new Even(0, 5, 9, 3)
    expect(result).toBeEven(expected)
  })

  // wedge even is not yet implemented

  it('sandwich with null bread and even filling returns zero', () => {
    const a = new Odd2P(0, 0, 0, 1)
    const b = new Even(1, 2, 3, 4)

    const result = a.sandwich(b)

    expect(result).toBeEven(Even.ZERO)
  })

  it('sandwich with null bread and Odd2P filling returns zero', () => {
    const a = new Odd2P(0, 0, 0, 1)
    const b = new Odd2P(1, 2, 3, 4)

    const result = a.sandwich(b)

    expect(result).toBeOdd(Odd2P.ZERO)
  })
})

// For reference
