import { describe, it, expect } from 'vitest'
import { Odd2C } from './Odd2C'
import { Even2C } from './Even2C'

describe('Odd2C', () => {
  it('add computes sum', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd2C(-1, 3, 4, 1, 2, -3, 1, -4)

    const result = a.add(b)

    const expected = new Odd2C(0, 5, 7, 5, 7, 3, 8, 4)
    expect(result).toBeOdd2C(expected)
  })

  it('sub computes difference', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd2C(-1, 3, 4, 1, 2, -3, 1, -4)

    const result = a.sub(b)

    const expected = new Odd2C(2, -1, -1, 3, 3, 9, 6, 12)
    expect(result).toBeOdd2C(expected)
  })

  it('normalize_o normalizes based on computed o component', () => {
    // let's say we have a point x = (2, 3)
    // x + 1/2(x^2 - 1)p + 1/2(x^2 + 1)m
    // 1x + 3y + 1/2(13 - 1)p + 1/2(13 + 1)m
    // 1x + 3y + 6p + 7m
    // scale this by 2
    // 2x + 6y + 12p + 14m
    // o should be 2 now. 1/2(14 - 12) = 1/2(2) = 1. wut...

    const scaled_vec = new Odd2C(2, 6, 12, 14, 0, 0, 0, 0)

    const result = scaled_vec.normalize_o()

    const expected = new Odd2C(1, 3, 6, 7, 0, 0, 0, 0)
    expect(result).toBeOdd2C(expected)
  })

  it('neg negates all components', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.neg()

    const expected = new Odd2C(-1, -2, -3, -4, -5, -6, -7, -8)
    expect(result).toBeOdd2C(expected)
  })

  it('computes dual', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.dual()

    const expected = new Odd2C(-8, 7, -6, 5, -4, 3, -2, 1)
    expect(result).toBeOdd2C(expected)
  })

  it('antidual is the negative of dual', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)

    const a_dual = a.dual().neg()
    const a_antidual = a.antidual()

    expect(a_dual).toBeOdd2C(a_antidual)
  })

  it('computes reverse', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.reverse()

    const expected = new Odd2C(1, 2, 3, 4, -5, -6, -7, -8)
    expect(result).toBeOdd2C(expected)
  })

  it('gp with even produces correct odd multivector', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.gp(b)

    const expected = new Odd2C(0, 116, -90, -72, 74, 60, -18, 48)
    expect(result).toBeOdd2C(expected)
  })

  it('gp with odd produces correct even multivector', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = a.gp(b)

    const expected = new Even2C(122, -18, -76, -66, -54, -36, 46, 0)
    expect(result).toBeEven2C(expected)
  })

  it('unit sandwich with unit vector and odd multivector returns odd multivector with correct signs', () => {
    const n = new Odd2C(3 / 5, 4 / 5, 0, 0, 0, 0, 0, 0)
    const b = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = n.unit_sandwich(b)

    // odd sandwich odd requires a negative sign
    const expected = new Odd2C(1.64, 1.52, -3.0, -4, 5, 6, 5.72, 8.96).neg()
    expect(result).toBeOdd2C(expected)
  })

  it('unit sandwich with unit vector and even multivector returns correct even result', () => {
    const n = new Odd2C(3 / 5, 4 / 5, 0, 0, 0, 0, 0, 0)
    const b = new Even2C(1, 2, 3, 4, 5, 6, 7, 8)

    const result = n.unit_sandwich(b)

    const expected = new Even2C(1, -2, -3.96, -4.64, -4.28, -5.52, 7, -8)
    expect(result).toBeEven2C(expected)
  })

  it('lerp with t zero returns first point', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Odd2C.lerp(a, b, 0.0)

    expect(result).toBeOdd2C(a)
  })

  it('lerp with t one returns second point', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Odd2C.lerp(a, b, 1.0)

    expect(result).toBeOdd2C(b)
  })

  it('lerp with t in between interpolates', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Odd2C.lerp(a, b, 0.75)

    const expected = new Odd2C(-2, 1.25, -0.75, 2.5, 4.25, 3.75, 0.25, 2.75)
    expect(result).toBeOdd2C(expected)
  })

  it('lerp with t negative extrapolates', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Odd2C.lerp(a, b, -1)

    const expected = new Odd2C(5, 3, 8, 6, 6, 9, 16, 15)
    expect(result).toBeOdd2C(expected)
  })

  it('lerp with t out of bounds extrapolates', () => {
    const a = new Odd2C(1, 2, 3, 4, 5, 6, 7, 8)
    const b = new Odd2C(-3, 1, -2, 2, 4, 3, -2, 1)

    const result = Odd2C.lerp(a, b, 2)

    const expected = new Odd2C(-7, 0, -7, 0, 3, 0, -11, -6)
    expect(result).toBeOdd2C(expected)
  })
})
