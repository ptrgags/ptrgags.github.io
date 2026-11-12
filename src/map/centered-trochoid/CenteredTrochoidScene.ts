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
import { ParametricCurve } from '../../lib/primitives/ParametricCurve.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Trajectory } from '../../lib/primitives/Trajectory.ts'
import { Color } from '../../lib/styling/Color.ts'

const RADIUS_BIG = 64
const CENTER = { x: 256, y: 128 }
const FREQ_CIRCLE = 0.25
const PEN_RADIUS = 4
const MAX_CURVE_TIME = 40
const TRAJECTORY_LENGTH = 50

const CLOCK = new Clock()

const BIG_CIRCLE = new Circle(CENTER, RADIUS_BIG)

export class CenteredTrochoidScene implements SceneP5 {
  r: number
  p: number
  anim_circle: CircularMotion
  anim_pen: CircularMotion
  start_time: number

  curve: ParametricCurve
  trajectory: Trajectory

  circles: Group

  primitive: Drawable

  constructor() {
    this.r = -0.75 * RADIUS_BIG
    this.p = 0.8 * this.r

    this.anim_circle = new CircularMotion(new Circle(CENTER, RADIUS_BIG + this.r), -FREQ_CIRCLE, 0)
    this.anim_pen = new CircularMotion(
      new Circle({ x: 0, y: 0 }, this.p),
      -(RADIUS_BIG / this.r - 1) * FREQ_CIRCLE,
      0,
    )

    this.curve = new ParametricCurve(1000, (t: number) => {
      const circle_center = Direction2P.from_vec2(this.anim_circle.position(MAX_CURVE_TIME * t))
      const pen_offset = Direction2P.from_vec2(this.anim_pen.position(MAX_CURVE_TIME * t))
      return circle_center.add(pen_offset)
    })
    this.trajectory = new Trajectory(TRAJECTORY_LENGTH)

    this.start_time = 0

    const small_circle = new Circle({ x: CENTER.x + RADIUS_BIG + this.r, y: CENTER.y }, this.r)
    const pen = new Circle({ x: CENTER.x + RADIUS_BIG + this.r + this.p, y: CENTER.y }, PEN_RADIUS)
    this.circles = group(small_circle, pen)
    this.primitive = group(
      style(Style.lines(Oklch.grey(0.5), 2), BIG_CIRCLE, this.circles, this.curve),
      style(Style.lines(Color.YELLOW, 2), this.trajectory),
    )
  }

  set_params(params: CenteredTrochoidParams) {
    // Parameters are expressed as percents of the big circle's radius
    this.r = params.radius_small_circle * RADIUS_BIG
    this.p = params.radius_pen * this.r

    this.start_time = CLOCK.elapsed_time
    this.anim_circle = new CircularMotion(new Circle(CENTER, RADIUS_BIG + this.r), -FREQ_CIRCLE)

    // The smaller circle turns against the large one without slipping, like two
    // meshed gears. So `theta2 = R/r * theta1` when measured from the stationary frame.
    // Here `r` is positive for epitrochoids (outside the big circle) and negative
    // inside the big circle.
    //
    // However, we want to measure this relative to the angle of the circle's
    // position. So we want
    //
    // `theta2 - theta1 = (R/r - 1) * theta1`
    //
    // Angular frequency follows the same relationships, so
    //
    // `f2 - f1 = (R/r - 1) * f1`
    const freq_pen = (RADIUS_BIG / this.r - 1) * FREQ_CIRCLE

    // The frequency doesn't seem right…
    this.anim_pen = new CircularMotion(new Circle({ x: 0, y: 0 }, this.p), -freq_pen)

    this.curve.refresh()
    this.trajectory.clear()
  }

  update(p: p5): void {
    const t = CLOCK.elapsed_time - this.start_time
    const center = Point2P.from_vec2(this.anim_circle.position(t))
    const pen_offset = Direction2P.from_vec2(this.anim_pen.position(t))

    const small_circle = new Circle(center, this.r)

    const pen_position = center.add(pen_offset)

    const pen = new Circle(pen_position, PEN_RADIUS)
    this.circles.regroup(small_circle, pen)

    this.trajectory.add_point(pen_position)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}
