import type { Animated } from '../../lib/animation/Animated.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import type { Pointlike } from '../../lib/primitives/Pointlike.ts'

export class TimelineCursor implements Animated, Drawable {
  // Start position for the cursor
  start_position: Pointlike
  // current animation position
  position: Pointlike
  /** Half the height of the cursor above and below the current position */
  radius: number
  /** How fast the cursor moves in pixels/unit time */
  speed: number

  constructor(start_position: Pointlike, radius: number, speed: number) {
    this.start_position = start_position
    this.position = start_position
    this.radius = radius
    this.speed = speed
  }

  update(t: number): void {
    const { x, y } = this.start_position
    this.position = {
      x: x + t * this.speed,
      y,
    }
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.position
    const r = this.radius

    // TODO: Once I have transformations, this could be done with a constant
    // `LineSegment` + a transform node
    lib.segment(x, y - r, x, y + r)
  }
}
