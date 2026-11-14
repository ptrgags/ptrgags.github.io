import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { CircularMotion } from '../../lib/animation/CircularMotion.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Clock } from '../../lib/animation/Clock.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'

const CLOCK = new Clock()

const UNIT_CIRCLE = new Circle(SWATCH.center, SWATCH.dimensions.x / 4)

class CircularMotionSwatch implements SceneP5 {
  primitive: Drawable
  motion: CircularMotion
  arm: LineSegment

  constructor() {
    this.motion = new CircularMotion(UNIT_CIRCLE, 1)
    this.arm = new LineSegment(UNIT_CIRCLE.center, UNIT_CIRCLE.position(0))

    this.primitive = group(
      style(Style.DEFAULT_LINES, UNIT_CIRCLE),
      style(Style.lines(Color.RED), this.arm),
    )
  }

  update(p: p5): void {
    const t = CLOCK.elapsed_time
    this.arm.end = this.motion.position(-t)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  template: make_sketch(SWATCH.dimensions, new CircularMotionSwatch()),
}
