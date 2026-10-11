import { divmod } from '../math/divmod.ts'
import { is_nearly } from '../math/is_nearly.ts'
import type { ArcAngles } from './ArcAngles.ts'
import { BezierCurve } from './BezierCurve.ts'
import type { Circle } from './Circle.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'

// TODO: The control points for the arc could be hard coded, then all we'd have to do is transform them
function quarter_circle_bezier(circle: Circle, phase: number): BezierCurve {
  const a = circle.position(phase)
  const tangent_a = circle.unit_tangent(phase)
  const d = circle.position(phase + Math.PI / 2)
  const tangent_d = circle.unit_tangent(phase + Math.PI / 2)

  // TODO: Need to revisit the derivation
  const x = (circle.radius * (4 * (Math.SQRT2 - 1))) / 3

  const b = a.add(tangent_a.scale(x))
  const c = d.add(tangent_d.scale(x).neg())

  return new BezierCurve(a, b, c, d)
}

/**
 * More general arc to bezier curve for an arc that subtends at most a quarter circle
 * @param circle
 * @param phase Start angle for the curve
 * @param subtended_angle Angle of the arc
 * @returns
 */
function small_arc_bezier(circle: Circle, phase: number, subtended_angle: number): BezierCurve {
  const a = circle.position(phase)
  const tangent_a = circle.unit_tangent(phase)
  const d = circle.position(phase + subtended_angle)
  const tangent_d = circle.unit_tangent(phase + subtended_angle)

  const mid = circle.position(phase + 0.5 * subtended_angle)

  // TODO: Need to figure out this derivation
  const x = (circle.radius * (4 * (Math.SQRT2 - 1))) / 3

  const b = a.add(tangent_a.scale(x))
  const c = d.add(tangent_d.scale(x).neg())

  return new BezierCurve(a, b, c, d)
}

export class CircularArc implements Drawable {
  circle: Circle
  angles: ArcAngles

  constructor(circle: Circle, angles: ArcAngles) {
    this.circle = circle
    this.angles = angles
  }

  complement(): CircularArc {
    return new CircularArc(this.circle, this.angles.swap())
  }

  other_arc(): CircularArc {
    return new CircularArc(this.circle, this.angles.reverse_orientation())
  }

  reverse(): CircularArc {
    return new CircularArc(this.circle, this.angles.reverse_orientation().swap())
  }

  flip_y(): CircularArc {
    return new CircularArc(this.circle, this.angles.reverse_angles())
  }

  to_bezier_curves(): BezierCurve[] {
    const angle = this.angles.subtended_angle

    if (is_nearly(angle, 0)) {
      return []
    }

    // How many quarter circles is this arc?
    const [quarters, remaining] = divmod(angle, Math.PI / 2)

    const result = []
    for (let i = 0; i < quarters; i++) {
      const curve = quarter_circle_bezier(this.circle, this.angles.start_angle)
      result.push(curve)
    }

    if (!is_nearly(remaining, 0)) {
      const curve = small_arc_bezier(
        this.circle,
        this.angles.start_angle + (quarters * Math.PI) / 2,
        remaining,
      )
      result.push(curve)
    }

    return result
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.circle.center
    const r = this.circle.radius
    const { start_angle, end_angle, orientation } = this.angles
    lib.arc(x, y, r, start_angle, end_angle, orientation)
  }
}
