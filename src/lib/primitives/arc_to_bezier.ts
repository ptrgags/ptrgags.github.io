import { Complex } from '../math/complex/Complex.ts'
import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { BezierCurve } from './BezierCurve.ts'
import type { Circle } from './Circle.ts'
import type { Vec2 } from './Vec2.ts'

// exposed to help unit tests
export const QUARTER_CIRCLE_TANGENT_LENGTH = (4 * (Math.SQRT2 - 1)) / 3
const QUARTER_UNIT_CIRCLE_POINTS = [
  new Complex(1, 0),
  new Complex(1, QUARTER_CIRCLE_TANGENT_LENGTH),
  new Complex(QUARTER_CIRCLE_TANGENT_LENGTH, 1),
  new Complex(0, 1),
]

// How long are the bezier tangents to give a good approximation for the arc?
// TODO: Need to write out the derivation of this in an article, see notebooks
export function tangent_length(subtended_angle: number) {
  const half_angle = 0.5 * subtended_angle
  // Originally I had the formula 4/3 * (1-cos(half_angle))/sin(half_angle)
  // but when I graphed it, I realized that there's a relevant tangent identity
  // tan(theta/2) = (1 - cos(theta))/sin(theta)
  // see https://en.wikipedia.org/wiki/Tangent_half-angle_formula#Geometric_proofs
  return (4 * Math.tan(half_angle / 2)) / 3
}

function transform_points(points: Vec2[], circle: Circle, phase: number, flip: boolean): Complex[] {
  const translation = Complex.from_vec2(circle.center)
  const spiral = Complex.from_polar(circle.radius, phase)

  return points.map((p) => {
    const p_complex = Complex.from_vec2(p)
    const flipped = flip ? p_complex.conj : p_complex

    return spiral.mul(flipped).add(translation)
  })
}

export function quarter_circle_bezier(circle: Circle, phase: number, flip: boolean): BezierCurve {
  const [a, b, c, d] = transform_points(QUARTER_UNIT_CIRCLE_POINTS, circle, phase, flip)
  return new BezierCurve(a, b, c, d)
}

export function small_arc_bezier(
  circle: Circle,
  subtended_angle: number,
  phase: number,
  flip: boolean,
): BezierCurve {
  // Create an arc from [0, subtended_angle) in the positive direction on
  // the unit circle. We'll transform this at the end to get the desired arc

  // c = 1
  const unit_a = Complex.ONE
  // a = tangent_length * i
  const unit_b = new Complex(1, tangent_length(subtended_angle))
  // (skip c, it's easier to compute d first)
  // d = exp(i * subtended_angle)
  const unit_d = Complex.from_polar(1, subtended_angle)
  // c is a flipped and rotated copy of b. d here is reinterpreted as
  // a rotation
  const unit_c = unit_d.mul(unit_b.conj)

  const [a, b, c, d] = transform_points([unit_a, unit_b, unit_c, unit_d], circle, phase, flip)
  return new BezierCurve(a, b, c, d)
}
