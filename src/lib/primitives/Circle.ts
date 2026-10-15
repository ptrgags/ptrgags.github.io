import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import { quarter_circle_bezier } from './arc_to_bezier.ts'
import type { BezierCurve } from './BezierCurve.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Vec2 } from './Vec2.ts'

export class Circle implements Drawable {
  center: Point2P
  radius: number

  constructor(center: Vec2, radius: number) {
    this.center = Point2P.from_vec2(center)
    this.radius = radius
  }

  position(angle: number): Point2P {
    const r = this.radius
    const { x, y } = this.center
    return new Point2P(x + r * Math.cos(angle), y + r * Math.sin(angle))
  }

  unit_normal(angle: number): Direction2P {
    return Direction2P.from_angle(angle)
  }

  unit_tangent(angle: number): Direction2P {
    return new Direction2P(-Math.sin(angle), Math.cos(angle))
  }

  to_bezier_curves(): BezierCurve[] {
    return [
      quarter_circle_bezier(this, 0),
      quarter_circle_bezier(this, Math.PI / 2),
      quarter_circle_bezier(this, Math.PI),
      quarter_circle_bezier(this, (3 * Math.PI) / 4),
    ]
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.center
    const r = this.radius
    lib.circle(x, y, r)
  }

  static readonly UNIT_CIRCLE = new Circle(Point2P.ORIGIN, 1)
}
