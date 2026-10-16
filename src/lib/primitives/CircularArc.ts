import { divmod } from '../math/divmod.ts'
import { is_nearly } from '../math/is_nearly.ts'
import { quarter_circle_bezier, small_arc_bezier } from './arc_to_bezier.ts'
import { AngleOrientation, type ArcAngles } from './ArcAngles.ts'
import { BezierCurve } from './BezierCurve.ts'
import type { Circle } from './Circle.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'

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

    const flip = false //this.angles.orientation === AngleOrientation.NEGATIVE

    const result = []
    for (let i = 0; i < quarters; i++) {
      const curve = quarter_circle_bezier(
        this.circle,
        this.angles.start_angle + (i * Math.PI) / 2,
        flip,
      )
      result.push(curve)
    }

    if (!is_nearly(remaining, 0)) {
      const curve = small_arc_bezier(
        this.circle,
        // subtended angle
        remaining,
        // phase
        this.angles.start_angle + (quarters * Math.PI) / 2,
        flip,
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
