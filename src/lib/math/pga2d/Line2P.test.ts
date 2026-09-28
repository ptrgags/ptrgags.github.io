import { describe, it, expect } from 'vitest'
import { Line2P } from './Line2P'
import { Point2P } from './Point2P.ts'

describe('Line2P', () => {
  it('constructor normalizes Euclidean line', () => {
    const line = new Line2P(3, 4, 5)

    expect(line.is_infinite).toBe(false)
    expect(line.nx).toBe(3 / 5)
    expect(line.ny).toBe(4 / 5)
    expect(line.d).toBe(1)
  })

  it("constructor doesn't modify line at infinity", () => {
    const line = new Line2P(0, 0, 42)

    expect(line.is_infinite).toBe(true)
    expect(line.nx).toBe(0)
    expect(line.ny).toBe(0)
    expect(line.d).toBe(42)
  })

  it('meet of axes returns origin', () => {
    const a = Line2P.X_AXIS
    const b = Line2P.Y_AXIS

    const result = a.meet(b)

    expect(result).toBePoint2P(Point2P.ORIGIN)
  })

  it('meet of two lines returns their intersection', () => {
    const a = new Line2P(1, 1, 1)
    const b = new Line2P(1, -1, 2)

    const result = a.meet(b)

    const expected = new Point2P(1.5, -0.5)
    expect(result).toBePoint2P(expected)
  })

  /*
  describe.skip('from_segment', () => {
    it('with start = end throws', () => {
      const point = new Point2P(3, -4)
      const segment = new LineSegment(point, point)

      expect(() => {
        return Line2P.from_segment(segment)
      }).toThrowError('line segment must have two different end points')
    })

    it('computes line with normal 90 degrees in the positive direction of the tangent', () => {
      const a = new Point2P(-1, 1)
      const b = new Point2P(1, -1)
      const segment = new LineSegment(a, b)

      const result = Line2P.from_segment(segment)

      const expected = new Line2P(1, 1, 0)
      expect(result).toBeLine2P(expected)
    })
  })
    */
})
