import { Point2P } from '../math/pga2d/Point2P.js'
import type { Drawable } from './Drawable.js'
import type { DrawingLibrary } from './DrawingLibrary.js'
import type { Vec2 } from './Vec2.js'

/**
 * Cubic Bezier curve
 */
export class BezierCurve implements Drawable {
  a: Vec2
  b: Vec2
  c: Vec2
  d: Vec2
  /**
   * Constructor
   * @param {Vec2} a Start point
   * @param {Vec2} b First tangent point
   * @param {Vec2} c Second tangent point
   * @param {Vec2} d End point
   */
  constructor(a: Vec2, b: Vec2, c: Vec2, d: Vec2) {
    this.a = a
    this.b = b
    this.c = c
    this.d = d
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
    const p1 = Point2P.lerp(b1, b2, 1 / 3)
    const p2 = Point2P.lerp(b1, b2, 2 / 3)

    const p3 = new Point2P(sixth * (x1 + 4 * x2 + x3), sixth * (y1 + 4 * y2 + y3))

    return new BezierCurve(p0, p1, p2, p3)
  }

  draw(lib: DrawingLibrary): void {
    const { a, b, c, d } = this
    lib.bezier(a, b, c, d)
  }
}
