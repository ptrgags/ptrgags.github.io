import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import { BezierCurve } from './BezierCurve.ts'
import type { Circle } from './Circle.ts'
import type { Vec2 } from './Vec2.ts'

// exposed to help unit tests
export const QUARTER_CIRCLE_TANGENT_LENGTH = (4 * Math.SQRT2) / 3
const QUARTER_UNIT_CIRCLE_POINTS = [
  new Point2P(1, 0),
  new Point2P(1, QUARTER_CIRCLE_TANGENT_LENGTH),
  new Point2P(QUARTER_CIRCLE_TANGENT_LENGTH, 1),
  new Point2P(0, 1),
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

function transform_points(points: Vec2[], circle: Circle, phase: number): Point2P[] {
  const cos = Math.cos(phase)
  const sin = Math.sin(phase)
  const r = circle.radius
  const center = circle.center

  return points.map((p) => {
    const { x, y } = p

    // matrix transform
    // r * [c, -s][x] + [center.x]
    //     [s,  c][y] + [center.y]
    const rotated_x = cos * x - sin * y
    const rotated_y = sin * x + cos * y
    return new Point2P(r * rotated_x + center.x, r * rotated_y + center.y)
  })
}

export function quarter_circle_bezier(circle: Circle, phase: number): BezierCurve {
  const [a, b, c, d] = transform_points(QUARTER_UNIT_CIRCLE_POINTS, circle, phase)
  return new BezierCurve(a, b, c, d)
}

export function small_arc_bezier(
  circle: Circle,
  subtended_angle: number,
  phase: number,
): BezierCurve {
  const half_angle = 0.5 * subtended_angle
  const cos = Math.cos(half_angle)
  const sin = Math.sin(half_angle)

  const unit_a = new Direction2P(cos, -sin)
  const tangent_a = unit_a.rot90()
  const unit_b = unit_a.add(tangent_a.scale(tangent_length(subtended_angle)))
  const unit_c = unit_b.flip_y()
  const unit_d = unit_a.flip_y()

  const [a, b, c, d] = transform_points(
    [unit_a, unit_b, unit_c, unit_d],
    circle,
    // the unit arc spans [-angle/2, angle/2], but
    // transform_points assumes [0, angle] so we add half_angle
    phase + half_angle,
  )
  return new BezierCurve(a, b, c, d)
}
