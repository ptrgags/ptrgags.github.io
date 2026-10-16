import { describe, it, expect } from 'vitest'
import { CircularArc } from './CircularArc.ts'
import { AngleOrientation, ArcAngles } from './ArcAngles.ts'
import { Circle } from './Circle.ts'
import { BezierCurve } from './BezierCurve.ts'
import { Complex } from '../math/complex/Complex.ts'
import { QUARTER_CIRCLE_TANGENT_LENGTH, tangent_length } from './arc_to_bezier.ts'
import { expect_arrays } from '../test-helpers/expect_arrays.ts'

describe('CircularArc', () => {
  describe('to_bezier_curves', () => {
    it('with empty arc returns empty array', () => {
      const arc = new CircularArc(
        Circle.UNIT_CIRCLE,
        new ArcAngles(Math.PI / 4, Math.PI / 4, AngleOrientation.POSITIVE),
      )

      const result = arc.to_bezier_curves()

      const expected: BezierCurve[] = []
      expect(result).toEqual(expected)
    })

    it('with arc smaller than quarter circle returns one partial arc', () => {
      const angles = new ArcAngles(0, Math.PI / 3, AngleOrientation.POSITIVE)
      const arc = new CircularArc(Circle.UNIT_CIRCLE, angles)

      const result = arc.to_bezier_curves()

      const x = tangent_length(Math.PI / 3)
      const rotate = Complex.from_polar(1, Math.PI / 3)
      const tangent2 = rotate.mul(new Complex(1, -x))
      const expected = [new BezierCurve(Complex.ONE, new Complex(1, x), tangent2, rotate)]
      expect_arrays(result, expected, (result, expected) => {
        expect(result).toBeBezier(expected)
      })
    })

    it('with first quadrant returns single bezier curve', () => {
      const arc = new CircularArc(
        Circle.UNIT_CIRCLE,
        new ArcAngles(0, Math.PI / 2, AngleOrientation.POSITIVE),
      )

      const result = arc.to_bezier_curves()

      const expected = [
        new BezierCurve(
          Complex.ONE,
          new Complex(1, QUARTER_CIRCLE_TANGENT_LENGTH),
          new Complex(QUARTER_CIRCLE_TANGENT_LENGTH, 1),
          Complex.I,
        ),
      ]
      expect_arrays(result, expected, (result, expected) => {
        expect(result).toBeBezier(expected)
      })
    })

    it('with larger arc returns quarter circles and partial arcs', () => {
      const arc = new CircularArc(
        Circle.UNIT_CIRCLE,
        new ArcAngles(-Math.PI / 4, Math.PI, AngleOrientation.POSITIVE),
      )

      const result = arc.to_bezier_curves()

      const p0 = Complex.from_polar(1, -Math.PI / 4)
      const p1 = Complex.I.mul(p0)
      const p2 = p0.neg
      const p3 = Complex.ONE.neg

      const quarter_tangent = new Complex(1, QUARTER_CIRCLE_TANGENT_LENGTH)
      const eighth_tangent = new Complex(1, tangent_length(Math.PI / 4))

      const expected = [
        // The first two arcs are 1/4 of a circle
        new BezierCurve(p0, p0.mul(quarter_tangent), p1.mul(quarter_tangent.conj), p1),
        new BezierCurve(p1, p1.mul(quarter_tangent), p2.mul(quarter_tangent.conj), p2),
        // The last part of the arc is half the size, i.e. 1/8 of a circle
        new BezierCurve(p2, p2.mul(eighth_tangent), p1.mul(eighth_tangent.conj), p3),
      ]
      expect_arrays(result, expected, (result, expected) => {
        expect(result).toBeBezier(expected)
      })
    })

    it('with negative arc returns correct curves', () => {
      const arc = new CircularArc(
        Circle.UNIT_CIRCLE,
        new ArcAngles(-Math.PI / 4, Math.PI, AngleOrientation.NEGATIVE),
      )

      const result = arc.to_bezier_curves()

      const p0 = Complex.from_polar(1, -Math.PI / 4)
      const p1 = Complex.I.neg.mul(p0)
      const p2 = Complex.ONE.neg

      const quarter_tangent = new Complex(1, QUARTER_CIRCLE_TANGENT_LENGTH)
      const eighth_tangent = new Complex(1, tangent_length(Math.PI / 4))

      const expected = [
        // now that we're going clockwise, the tangent directions are flipped
        new BezierCurve(p0, p0.mul(quarter_tangent.conj), p1.mul(quarter_tangent), p1),
        new BezierCurve(p1, p1.mul(eighth_tangent.conj), p2.mul(eighth_tangent), p2),
      ]
      expect_arrays(result, expected, (result, expected) => {
        expect(result).toBeBezier(expected)
      })
    })

    it('with arbitrary circle translates and scales results correctly', () => {
      const center = new Complex(3, 4)
      const radius = 5

      const angles = new ArcAngles(0, Math.PI / 3, AngleOrientation.POSITIVE)
      const arc = new CircularArc(new Circle(center, radius), angles)

      const result = arc.to_bezier_curves()

      const x = tangent_length(Math.PI / 3)
      const rotate = Complex.from_polar(1, Math.PI / 3)
      const tangent2 = rotate.mul(new Complex(1, -x))
      const scale = new Complex(radius)
      const expected = [
        new BezierCurve(
          center.add(scale),
          center.add(scale.mul(new Complex(1, x))),
          center.add(scale.mul(tangent2)),
          center.add(scale.mul(rotate)),
        ),
      ]
      expect_arrays(result, expected, (result, expected) => {
        expect(result).toBeBezier(expected)
      })
    })
  })
})
