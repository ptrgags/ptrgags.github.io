import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import type { SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { CenteredTrochoidParams } from './CenteredTrochoidParams.ts'
import { CircularMotion } from '../../lib/animation/CircularMotion.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Clock } from '../../lib/animation/Clock.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import type { Group } from '../../lib/primitives/Group.ts'

const RADIUS_BIG = 64
const CENTER = { x: 256, y: 128 }
const FREQ_CIRCLE = 0.25
const PEN_RADIUS = 2

const CLOCK = new Clock()

const BIG_CIRCLE = new Circle(CENTER, RADIUS_BIG)

export class CenteredTrochoidScene implements SceneP5 {
  canvas_size = { width: 512, height: 256 }
  r: number
  p: number
  anim_circle: CircularMotion
  anim_pen: CircularMotion
  start_time: number

  circles: Group

  primitive: Drawable

  constructor() {
    this.r = 0.5 * RADIUS_BIG
    this.p = 0.5 * this.r

    this.anim_circle = new CircularMotion(new Circle(CENTER, RADIUS_BIG + this.r), -FREQ_CIRCLE, 0)
    this.anim_pen = new CircularMotion(new Circle({ x: 0, y: 0 }, this.p), RADIUS_BIG / this.r, 0)

    this.start_time = 0

    const small_circle = new Circle({ x: CENTER.x + RADIUS_BIG + this.r, y: CENTER.y }, this.r)
    const pen = new Circle({ x: CENTER.x + RADIUS_BIG + this.r + this.p, y: CENTER.y }, PEN_RADIUS)
    this.circles = group(small_circle, pen)
    this.primitive = group(style(Style.lines(Oklch.grey(0.5), 2), BIG_CIRCLE, this.circles))
  }

  set_params(params: CenteredTrochoidParams) {
    // Parameters are expressed as percents of the big circle's radius
    this.r = params.radius_small_circle * RADIUS_BIG
    this.p = params.radius_pen * this.r

    this.start_time = CLOCK.elapsed_time
    this.anim_circle = new CircularMotion(new Circle(CENTER, RADIUS_BIG + this.r), -FREQ_CIRCLE, 0)
    this.anim_pen = new CircularMotion(new Circle({ x: 0, y: 0 }, this.p), RADIUS_BIG / this.r, 0)
  }

  update(p: p5): void {
    const t = CLOCK.elapsed_time
    const center = this.anim_circle.position(t)
    const { x: px, y: py } = this.anim_pen.position(t)

    const small_circle = new Circle(center, this.r)
    const pen = new Circle(
      { x: small_circle.center.x + px, y: small_circle.center.y + py },
      PEN_RADIUS,
    )

    this.circles.regroup(small_circle, pen)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}
