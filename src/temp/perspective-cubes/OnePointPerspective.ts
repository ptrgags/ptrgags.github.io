import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import SketchP5 from '../../components/SketchP5.vue'
import type { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import type { Line2P } from '../../lib/math/pga2d/Line2P.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
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

export interface OnePointBasisOptions {
  origin: Point2P
  vanishing_point: Point2P
  x: Point2P
  y: Point2P
  z: Point2P
}

export class OnePointPerspective {
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

  constructor(options: OnePointBasisOptions) {
    const origin = options.origin
    this.vp_z = options.vanishing_point
    this.origin = options.origin
    this.x = options.x
    this.y = options.y
    this.z = options.z

    this.dir_x = this.x.sub(origin)
    this.dir_y = this.y.sub(origin)
    this.dir_z = this.z.sub(origin)
  }

  static from_measurements(
    vanishing_point: Point2P,
    origin: Point2P,
    x_length: number,
    y_length: number,
    z_length: number,
  ): OnePointPerspective {
    const x = origin.add(Direction2P.DIR_X.scale(x_length))
    const y = origin.add(Direction2P.DIR_Y.scale(-y_length))
    const dir_z = origin.sub(vanishing_point).normalize()
    const z = origin.add(dir_z.scale(z_length))

    return new OnePointPerspective({
      origin,
      vanishing_point,
      x,
      y,
      z,
    })
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

  unit_cube(): LineSegment[] {
    const p_110 = converge(this.x, this.vp_y, this.y, this.vp_x)
    const p_101 = converge(this.x, this.vp_z, this.z, this.vp_x)
    const p_011 = converge(this.y, this.vp_z, this.z, this.vp_y)
    const p_111 = converge(p_110, this.vp_z, p_011, this.vp_x)

    return [
      // origin to reference points
      new LineSegment(this.origin, this.x),
      new LineSegment(this.origin, this.y),
      new LineSegment(this.origin, this.z),

      // 6 segments zigzagging around the cube
      new LineSegment(this.x, p_110),
      new LineSegment(this.x, p_101),
      new LineSegment(this.y, p_110),
      new LineSegment(this.y, p_011),
      new LineSegment(this.z, p_101),
      new LineSegment(this.z, p_011),

      // corners to far corner
      new LineSegment(p_110, p_111),
      new LineSegment(p_101, p_111),
      new LineSegment(p_011, p_111),
    ]
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

  /**
   * Move the origin of the coordinate system while keeping the
   * length reference constant
   * @param coords
   * @returns A new basis
   */
  move_to(coords: Vec3): OnePointPerspective {
    const { x, y, z } = coords

    return new OnePointPerspective({
      origin: this.get_point(coords),
      vanishing_point: this.vp_z,
      x: this.get_point(vec3(x + 1, y, z)),
      y: this.get_point(vec3(x, y + 1, z)),
      z: this.get_point(vec3(x, y, z + 1)),
    })
  }
}
