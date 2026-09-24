import { Circle } from './Circle.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Pointlike } from './Pointlike.ts'

export interface AngleAnnotationOptions {
  center: Pointlike
  /**
   * Radius where an arc is drawn to indicate the angle measurement
   */
  radius_arc: number
  /**
   * Length of the radial lines drawn to mark the boundaries
   */
  radius_tip: number
  /**
   * Angle to display
   */
  angle: number
  /**
   * reference angle, usually 0 (to the right)
   */
  angle_ref?: number
}

export class AngleAnnotation implements Drawable {
  tip_circle: Circle
  center: Pointlike
  radius_arc: number
  angle: number
  angle_ref: number

  constructor(options: AngleAnnotationOptions) {
    this.center = options.center
    this.radius_arc = options.radius_arc
    this.tip_circle = new Circle(this.center, options.radius_tip)
    this.angle = options.angle
    this.angle_ref = options.angle ?? 0
  }

  draw(lib: DrawingLibrary): void {
    const { x: cx, y: cy } = this.center
    const orientation = this.angle > 0 ? 1 : -1

    const start_angle = this.angle_ref
    const end_angle = this.angle_ref + this.angle

    const start_tip = this.tip_circle.position(start_angle)
    const end_tip = this.tip_circle.position(end_angle)

    lib.arc(cx, cy, this.radius_arc, start_angle, end_angle, orientation)
    lib.segment(cx, cy, start_tip.x, start_tip.y)
    lib.segment(cx, cy, end_tip.x, end_tip.y)
  }
}
