import { describe, it, expect } from 'vitest'
import { Point2P } from '../math/pga2d/Point2P.ts'
import { BezierCurve } from './BezierCurve.ts'

describe('BezierCurve', () => {
  it('from_b_spline computes correct control points for square', () => {
    const a = new Point2P(0, 0)
    const b = new Point2P(1, 0)
    const c = new Point2P(1, 1)
    const d = new Point2P(0, 1)

    const result = BezierCurve.from_b_spline(a, b, c, d)

    // 1/6((0, 0) + 4(1, 0) + (1, 1)) = 1/6(5, 1) = (5/6, 1/6)
    const expected_a = new Point2P(5 / 6, 1 / 6)
    // Middle points are 1/3 and 2/3 across line from b -> c
    const expected_b = new Point2P(1, 1 / 3)
    const expected_c = new Point2P(1, 2 / 3)
    // 1/6((1, 0) + 4(1, 1) + (0, 1)) = 1/6(5, 5) = (5/6, 5/6)
    const expected_d = new Point2P(5 / 6, 5 / 6)
    expect(result.a).toBePoint2P(expected_a)
    expect(result.b).toBePoint2P(expected_b)
    expect(result.c).toBePoint2P(expected_c)
    expect(result.d).toBePoint2P(expected_d)
  })
})
