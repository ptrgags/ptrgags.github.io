import { describe, it, expect } from 'vitest'
import { Circle } from './Circle.ts'
import { BezierCurve } from './BezierCurve.ts'
import { QUARTER_CIRCLE_TANGENT_LENGTH } from './arc_to_bezier.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import { expect_arrays } from '../test-helpers/expect_arrays.ts'

describe('Circle', () => {
  describe('to_bezier_curves', () => {
    it('with unit circle gives correct bezier curves', () => {
      const result = Circle.UNIT_CIRCLE.to_bezier_curves()

      const expected = [
        new BezierCurve(
          new Point2P(1, 0),
          new Point2P(1, QUARTER_CIRCLE_TANGENT_LENGTH),
          new Point2P(QUARTER_CIRCLE_TANGENT_LENGTH, 1),
          new Point2P(0, 1),
        ),
        new BezierCurve(
          new Point2P(0, 1),
          new Point2P(-QUARTER_CIRCLE_TANGENT_LENGTH, 1),
          new Point2P(-1, QUARTER_CIRCLE_TANGENT_LENGTH),
          new Point2P(-1, 0),
        ),
        new BezierCurve(
          new Point2P(-1, 0),
          new Point2P(-1, -QUARTER_CIRCLE_TANGENT_LENGTH),
          new Point2P(-QUARTER_CIRCLE_TANGENT_LENGTH, -1),
          new Point2P(0, -1),
        ),
        new BezierCurve(
          new Point2P(0, -1),
          new Point2P(QUARTER_CIRCLE_TANGENT_LENGTH, -1),
          new Point2P(1, -QUARTER_CIRCLE_TANGENT_LENGTH),
          new Point2P(1, 0),
        ),
      ]
      expect_arrays(result, expected, (result, expected) => {
        expect(result).toBeBezier(expected)
      })
    })
  })
})
