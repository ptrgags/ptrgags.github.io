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
import { Color } from '../../lib/styling/Color.ts'
import type { Vec3 } from '../../lib/math/vector/Vec3.ts'

class OnePointBasis {
  vp_x: Direction2P = Direction2P.DIR_X
  vp_y: Direction2P = Direction2P.DIR_Y.neg()
  vp_z: Point2P
  origin: Point2P
  // points 1 unit along each axis
  x: Point2P
  y: Point2P
  z: Point2P

  constructor(
    vp_z: Point2P,
    origin: Point2P,
    x_length: number,
    y_length: number,
    z_length: number,
  ) {
    this.vp_z = vp_z
    this.origin = origin
    this.x = origin.add(this.vp_x.scale(x_length))
    this.y = origin.add(this.vp_y.scale(y_length))
    const dir_z = origin.sub(vp_z).normalize()
    this.z = origin.add(dir_z.scale(z_length))
  }

  vanishing_line(): Line2P {
    return this.vp_z.join(Direction2P.DIR_X)
  }

  axes(): LineSegment[] {
    const x = new LineSegment(this.origin, this.x)
    const y = new LineSegment(this.origin, this.y)
    const z = new LineSegment(this.origin, this.z)
    return [x, y, z]
  }
}

export function perspective_cubes(): Drawable {
  // Set up one-point perspective
  const vanishing_point = new Point2P(250, 200)
  const origin = new Point2P(100, 400)
  const basis = new OnePointBasis(vanishing_point, origin, 100, 100, 150)

  // draw a horizontal line for the horizon
  const line_horizon = basis.vanishing_line()
  const line_left = new Line2P(1, 0, 0)
  const line_right = new Line2P(1, 0, ATC_SCREEN.dimensions.width)
  const horizon_segment = new LineSegment(
    line_horizon.meet(line_left),
    line_horizon.meet(line_right),
  )

  return group(
    style(
      Style.lines(Color.RED, 1),
      new LineSegment(basis.vp_z, origin),
      new LineSegment(basis.vp_z, basis.y),
    ),
    style(Style.lines(Color.WHITE, 4), horizon_segment, ...basis.axes()),
  )
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, perspective_cubes()),
}
