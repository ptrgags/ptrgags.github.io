import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { ATC_SCREEN, SWATCH } from '../../core/dimensions.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Line2P } from '../../lib/math/pga2d/Line2P.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'

export function perspective_cubes(): Drawable {
  // one point perspective
  const vp_x = Direction2P.DIR_X
  const vp_y = Direction2P.DIR_Y.neg()
  const vp_z = new Point2P(250, 200)

  // draw a horizontal line for the horizon
  const line_horizon = vp_z.join(vp_x)
  const line_left = new Line2P(1, 0, 0)
  const line_right = new Line2P(1, 0, ATC_SCREEN.dimensions.width)
  const horizon_segment = new LineSegment(
    line_horizon.meet(line_left),
    line_horizon.meet(line_right),
  )

  // set up 3 reference points that determine the scale of 1 unit in all
  // three directions relative to this origin point
  const origin = new Point2P(100, 400)
  // x1 as in "1 unit in the x direction" and so on
  const x1 = new Point2P(100 + 100, 400)
  const y1 = new Point2P(100, 400 - 100)
  const dir_z = origin.sub(vp_z).normalize()
  const z1 = origin.add(dir_z.scale(100))

  const leg_x = new LineSegment(origin, x1)
  const leg_y = new LineSegment(origin, y1)
  const leg_z = new LineSegment(origin, z1)

  return group(style(Style.DEFAULT_LINES, horizon_segment, leg_x, leg_y, leg_z))
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, perspective_cubes()),
}
