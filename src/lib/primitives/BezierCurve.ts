import { Point2P } from '../math/pga2d/Point2P.ts'
import type { Equals } from '../types/Equals.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import { Polyline } from './Polyline.ts'
import { VSVec2, type Vec2 } from './Vec2.ts'

export class BezierCurve implements Equals<BezierCurve>, Drawable {
  a: Vec2
  b: Vec2
  c: Vec2
  d: Vec2
  constructor(a: Vec2, b: Vec2, c: Vec2, d: Vec2) {
    this.a = a
    this.b = b
    this.c = c
    this.d = d
  }

  equals(other: BezierCurve): boolean {
    return (
      VSVec2.equals(this.a, other.a) &&
      VSVec2.equals(this.b, other.b) &&
      VSVec2.equals(this.c, other.c) &&
      VSVec2.equals(this.d, other.d)
    )
  }

  /**
   * Convert from a B-spline to a bezier curve. B-splines can be used to
   * smooth out a sharp polygon into a smooth curve.
   * @param {Vec2} b0 First control point
   * @param {Vec2} b1 Second control point
   * @param {Vec2} b2 Third control point
   * @param {Vec2} b3 Fourth control point
   * @returns {BezierPrimitive} The equivalent Bezier curve
   */
  static from_b_spline(b0: Vec2, b1: Vec2, b2: Vec2, b3: Vec2): BezierCurve {
    // See https://en.wikipedia.org/wiki/B-spline#Cubic_B-Splines

    // To avoid a lot of temporary allocations, the polynomials are
    // computed explicitly
    const { x: x0, y: y0 } = b0
    const { x: x1, y: y1 } = b1
    const { x: x2, y: y2 } = b2
    const { x: x3, y: y3 } = b3

    // p0 = 1/6(b0 + 4 b1 + b2)
    const sixth = 1 / 6
    const p0 = new Point2P(sixth * (x0 + 4 * x1 + x2), sixth * (y0 + 4 * y1 + y2))

    // p1 and p2 are just 1/3 and 2/3 of the way across the line segment
    // between the middle points
    const point_b1 = Point2P.from_vec2(b1)
    const point_b2 = Point2P.from_vec2(b2)
    const p1 = Point2P.lerp(point_b1, point_b2, 1 / 3)
    const p2 = Point2P.lerp(point_b1, point_b2, 2 / 3)

    const p3 = new Point2P(sixth * (x1 + 4 * x2 + x3), sixth * (y1 + 4 * y2 + y3))

    return new BezierCurve(p0, p1, p2, p3)
  }

  draw(lib: DrawingLibrary): void {
    const { a, b, c, d } = this
    lib.bezier(a, b, c, d)
  }

  /**
   * Alias for the first point
   */
  get start(): Vec2 {
    return this.a
  }

  /**
   * Alias for the last point
   */
  get end(): Vec2 {
    return this.b
  }

  /**
   * Get a polyline through the 4 control points
   */
  get control_polyline(): Polyline {
    return new Polyline({ vertices: [this.a, this.b, this.c, this.d], closed: false })
  }
}
