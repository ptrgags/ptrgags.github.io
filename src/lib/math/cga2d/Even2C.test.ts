import { describe, it, expect } from 'vitest'
import { Even2C } from './Even2C.js'
import { Odd2C } from './Odd2C.js'

// These tests are checked against the kingdon GA library
// see math-notebook
describe('Even2C', () => {
  it('adds even multivectors', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = a.add(b)

    const expected = new Even2C(-2, 3, 1, 6, 9, 9, 5, 9)
    expect(result).toBeEven2C(expected)
  })

  it('subtracts even multivectors', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = a.sub(b)

    const expected = new Even2C(4, 1, 5, 2, 1, 3, 9, 7)
    expect(result).toBeEven2C(expected)
  })

  it('neg negates all components', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.neg()

    const expected = new Even2C(-1, -2, -3, -4, -5, -6, -7, -8)
    expect(result).toBeEven2C(expected)
  })

  it('computes dual', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.dual()

    const expected = new Even2C(8, 7, -6, 5, 4, -3, 2, 1)
    expect(result).toBeEven2C(expected)
  })

  it('dual and antidual are the same in PGA2D', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)

    const a_dual = a.dual()
    const a_antidual = a.antidual()

    expect(a_dual).toBeEven2C(a_antidual)
  })

  it('computes reverse', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.reverse()

    const expected = new Even2C(1, -2, -3, -4, -5, -6, -7, 8)
    expect(result).toBeEven2C(expected)
  })

  it('gp with even produces correct even multivector', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.gp(b)

    const expected = new Even2C(0, 116, -90, -72, 74, 60, -18, 48)
    expect(result).toBeEven2C(expected)
  })

  it('gp with odd produces correct odd multivector', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.gp(b)

    const expected = new Odd2C(122, -18, -76, -66, -54, -36, 46, 0)
    expect(result).toBeOdd2C(expected)
  })

  it('unit_sandwich with unit versor and odd filling returns correct odd result', () => {
    // 90 degree rotation
    const a = new Even2C(Math.SQRT1_2, Math.SQRT1_2, 0, 0, 0, 0, 0, 0)
    const b = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.unit_sandwich(b)

    const expected = new Odd2C(2, -1, 3, 4, 5, 6, 8, -7)
    expect(result).toBeOdd2C(expected)
  })

  it('unit_sandwich with unit versor and even filling returns correct odd result', () => {
    // 90 degree rotation
    const a = new Even2C(Math.SQRT1_2, Math.SQRT1_2, 0, 0, 0, 0, 0, 0)
    const b = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.unit_sandwich(b)

    const expected = new Even2C(1, 2, 5, 6, -3, -4, 7, 8)
    expect(result).toBeEven2C(expected)
  })

  it('lerp with t zero returns first point', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Even2C.lerp(a, b, 0.0)

    expect(result).toBeEven2C(a)
  })

  it('lerp with t one returns second point', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Even2C.lerp(a, b, 1.0)

    expect(result).toBeEven2C(b)
  })

  it('lerp with t in between interpolates', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Even2C.lerp(a, b, 0.75)

    const expected = new Even2C(-2, 1.25, -0.75, 2.5, 4.25, 3.75, 0.25, 2.75)
    expect(result).toBeEven2C(expected)
  })

  it('lerp with t negative extrapolates', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Even2C.lerp(a, b, -1)

    const expected = new Even2C(5, 3, 8, 6, 6, 9, 16, 15)
    expect(result).toBeEven2C(expected)
  })

  it('lerp with t out of bounds extrapolates', () => {
    const a = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Even2C.lerp(a, b, 2)

    const expected = new Even2C(-7, 0, -7, 0, 3, 0, -11, -6)
    expect(result).toBeEven2C(expected)
  })
})
