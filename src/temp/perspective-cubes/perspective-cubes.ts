import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { ATC_SCREEN } from '../../core/dimensions.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'

import { Style } from '../../lib/styling/Style.ts'
import { Line2P } from '../../lib/math/pga2d/Line2P.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import { Color } from '../../lib/styling/Color.ts'
import { vec3, VSVec3 } from '../../lib/math/vector/Vec3.ts'

import { Wave } from '../../lib/animation/Wave.ts'
import type { Group } from '../../lib/primitives/Group.ts'
import { Clock } from '../../lib/animation/Clock.ts'
import { Trajectory } from '../../lib/primitives/Trajectory.ts'
import { range } from '../../lib/math/iteration/range.ts'
import { OnePointPerspective } from './OnePointPerspective.ts'

const CLOCK = new Clock()

export class PerspectiveCubes implements SceneP5 {
  primitive: Drawable
  basis: OnePointPerspective
  axes: Group
  ref_lines: Group
  trajectories: Trajectory[]

  x_wave: Wave
  y_wave: Wave
  z_wave: Wave

  constructor() {
    this.x_wave = Wave.sine({
      freq: 1 / 4,
      amp: 1.5,
    })
    this.y_wave = Wave.sine({
      freq: 1 / 8,
      amp: 4,
    })
    this.z_wave = Wave.sine({
      freq: 1 / 4,
      phase: 0.25,
      amp: 1.5,
    })

    // Set up one-point perspective
    const vanishing_point = new Point2P(250, 200)
    const origin = new Point2P(240, 275)
    this.basis = OnePointPerspective.from_measurements(vanishing_point, origin, 50, 50, 50)

    // draw a horizontal line for the horizon
    const line_horizon = this.basis.vanishing_line()
    const line_left = new Line2P(1, 0, 0)
    const line_right = new Line2P(1, 0, ATC_SCREEN.dimensions.width)
    const horizon_segment = new LineSegment(
      line_horizon.meet(line_left),
      line_horizon.meet(line_right),
    )

    this.axes = group()
    this.ref_lines = group()

    this.trajectories = range(4)
      .map((x) => new Trajectory(100))
      .toArray()

    this.primitive = group(
      style(Style.lines(Color.RED, 2), ...this.trajectories),
      style(Style.lines(Color.WHITE, 4), horizon_segment, this.axes, ...this.basis.axes()),
    )
  }

  update(p: p5): void {
    const t = CLOCK.elapsed_time
    const x = this.x_wave.bipolar(t)
    const y = this.y_wave.bipolar(t)
    const z = this.z_wave.bipolar(t)

    const coords = [vec3(x, y, z), vec3(-z, y, x), vec3(-x, y, -z), vec3(z, y, -x)]

    this.ref_lines.regroup(
      ...coords.map((x, i) => {
        const point = this.basis.get_point(VSVec3.add(x, vec3(0.5, 0.5, 0.5)))
        this.trajectories[i].add_point(point)
        return new LineSegment(this.basis.origin, point)
      }),
    )

    const line_segments = coords.flatMap((x) => this.basis.move_to(x).unit_cube())
    this.axes.regroup(...line_segments)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  template: make_sketch(ATC_SCREEN.dimensions, new PerspectiveCubes()),
}
