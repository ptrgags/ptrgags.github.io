import type { ArcAngles } from './ArcAngles.ts'
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
    return new CircularArc(this.circle, this.angles.complement())
  }

  other_arc(): CircularArc {
    return new CircularArc(this.circle, this.angles.other_arc())
  }

  reverse(): CircularArc {
    return new CircularArc(this.circle, this.angles.reverse())
  }

  flip_y(): CircularArc {
    return new CircularArc(this.circle, this.angles.flip_y())
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.circle.center
    const r = this.circle.radius
    const { start_angle, end_angle, orientation } = this.angles
    lib.arc(x, y, r, start_angle, end_angle, orientation)
  }
}
