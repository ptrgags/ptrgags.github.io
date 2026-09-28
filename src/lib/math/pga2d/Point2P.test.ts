import { describe, it, expect } from 'vitest'
import { Point2P } from './Point2P.ts'
import { Direction2P } from './Direction2P.ts'
import { Line2P } from './Line2P.ts'

describe('Point2P', () => {
  it('converts to direction', () => {
    const a = new Point2P(2, -5)

    const result = a.to_direction()

    const expected = new Direction2P(2, -5)
    expect(result).toBeDirection2P(expected)
  })

  it('gets the underlying x and y components', () => {
    const a = new Point2P(2, -5)

    expect(a.x).toBe(2)
    expect(a.y).toBe(-5)
  })

  it('adding a direction returns the correct point', () => {
    const a = new Point2P(1, 2)
    const dir = new Direction2P(3, 4)

    const result = a.add(dir)

    const expected = new Point2P(4, 6)
    expect(result).toBePoint2P(expected)
  })

  it('subtracting points produces the correct direction', () => {
    const a = new Point2P(1, 4)
    const b = new Point2P(3, 2)

    const result = a.sub(b)

    const expected = new Direction2P(-2, 2)
    expect(result).toBeDirection2P(expected)
  })

  it('joining two points gives the line through them', () => {
    const a = new Point2P(0, 1)
    const b = new Point2P(1, 0)

    const result = a.join(b)

    const expected = new Line2P(1, 1, 1)
    expect(result).toBeLine2P(expected)
  })

  it("swapping join arguments reverses the line's orientation", () => {
    const a = new Point2P(0, 1)
    const b = new Point2P(1, 0)

    const result_forward = a.join(b)
    const result_backward = b.join(a)

    const expected_forward = new Line2P(1, 1, 1)
    const expected_backward = new Line2P(-1, -1, -1)
    expect(result_forward).toBeLine2P(expected_forward)
    expect(result_backward).toBeLine2P(expected_backward)
  })

  it('lerp interpolates two points', () => {
    const a = new Point2P(1, 2)
    const b = new Point2P(-2, -8)

    const result = Point2P.lerp(a, b, 0.25)

    // 3/4 * 1 + 1/4 * -2 = 1/4(3 -2) = 1/4
    // 3/4 * 2 + 1/4 * -8 = 1/4(6 - 8) = -2/4 = -1/2
    const expected = new Point2P(0.25, -0.5)
    expect(result).toBePoint2P(expected)
  })

  it('toString formats as point', () => {
    const a = new Point2P(0.00012345, 2.98763)

    const result = a.toString()

    const expected = 'Point2P(0.000123, 2.99)'
    expect(result).toBe(expected)
  })

  it('flip_y flips y coordinate of points', () => {
    const point = new Point2P(3, 4)

    const result = point.flip_y()

    const expected = new Point2P(3, -4)
    expect(result).toBePoint2P(expected)
  })

  it('dist_sqr returns euclidean distance squared between two points', () => {
    const a = new Point2P(-1, 2)
    const b = new Point2P(3, -4)

    const result = a.dist_sqr(b)

    // (3 + 1)^2 + (-4 - 2)^2
    // 4^2 + 6^2 = 52
    const expected = 52
    expect(result).toBe(expected)
  })

  it('dist returns euclidean distance between two points', () => {
    const a = new Point2P(-1, 2)
    const b = new Point2P(3, -4)

    const result = a.dist(b)

    // sqrt((3 + 1)^2 + (-4 - 2)^2)
    // sqrt(4^2 + 6^2) = sqrt(52)
    const expected = Math.sqrt(52)
    expect(result).toBe(expected)
  })
})
