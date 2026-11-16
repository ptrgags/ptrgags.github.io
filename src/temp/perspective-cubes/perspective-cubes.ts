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
import { vec3, type Vec3 } from '../../lib/math/vector/Vec3.ts'

/**
 * From four points, draw two line segments through them and then compute
 * the point (or ideal point) where they intersect
 * @param a1 start of first line segment
 * @param a2 end of first line segment
 * @param b1 start of second line segment
 * @param b2 end of second line segment
 * @returns
 */
function converge(
  a1: Point2P | Direction2P,
  a2: Point2P | Direction2P,
  b1: Point2P | Direction2P,
  b2: Point2P | Direction2P,
): Point2P | Direction2P {
  const line_a = a1.join(a2)
  const line_b = b1.join(b2)
  return line_a.meet(line_b)
}

class OnePointBasis {
  vp_x: Direction2P = Direction2P.DIR_X
  vp_y: Direction2P = Direction2P.DIR_Y.neg()
  vp_z: Point2P

  // TODO: should these be stored? or maybe they're lazy computations?
  // vectors representing 1 unit along each axis, i.e.
  // x_i - vp_x
  dir_x: Direction2P
  dir_y: Direction2P
  dir_z: Direction2P

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

    this.dir_x = this.x.sub(origin)
    this.dir_y = this.y.sub(origin)
    this.dir_z = this.z.sub(origin)
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

  get_point(coords: Vec3): Point2P {
    const { x, y, z } = coords

    // create new points that establish lengths in the xy plane
    const p_x00 = this.origin.add(this.dir_x.scale(x))
    const p_0y0 = this.origin.add(this.dir_y.scale(y))
    // this is length x along the horizontal, we'll project it onto
    // the z line in a moment
    const p_z00 = this.origin.add(this.dir_x.scale(z))

    // get another vanishing point that marks the diagonal of the xz-face
    // of the unit cube so we can create lines parallel to this
    const line_diag = this.z.join(this.x)
    const vp_diag = this.vanishing_line().meet(line_diag)

    // we want to project (z, 0, 0) along the diagonal to get (0, 0, z)
    const line_z00 = vp_diag.join(p_z00)
    const line_z = this.origin.join(this.z)
    const p_00z = line_z00.meet(line_z)

    // project the length references to the plane through (0, 0, z)
    const p_x0z = converge(this.vp_z, p_x00, p_00z, this.dir_x)
    const p_0yz = converge(this.vp_z, p_0y0, p_00z, this.dir_y)

    // finish the box to get (x, y, z)
    return converge(p_x0z, this.dir_y, p_0yz, this.dir_x) as Point2P
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

  const another_origin = basis.get_point(vec3(2, 0, 1))
  console.log(another_origin.toString())
  const diag = new LineSegment(basis.origin, another_origin)

  return group(
    style(
      Style.lines(Color.RED, 1),
      new LineSegment(basis.vp_z, origin),
      new LineSegment(basis.vp_z, basis.y),
      diag,
    ),
    style(Style.lines(Color.WHITE, 4), horizon_segment, ...basis.axes()),
  )
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, perspective_cubes()),
}
