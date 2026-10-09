import type { BezierCurve } from './BezierCurve.ts'

/**
 * A curved polygon where the edges are Bezier curves. The shape is always
 * closed
 * @implements {Primitive}
 */
export class Beziergon {
  curves: BezierCurve[]
  /**
   * Constructor
   * @param {BezierCurve[]} curves The curves that make up the beziergon
   
   */
  constructor(curves: BezierCurve[]) {
    this.curves = curves
  }

  *[Symbol.iterator]() {
    yield* this.curves
  }

  /**
   * Interpolate a set of points using B-splines, phrased as a beziergon
   * @param {Point[]} points Points
   * @returns {BeziergonPrimitive} A beziergon interpolating the points
   */
  static interpolate_points(points: Point[]): BeziergonPrimitive {
    const bezier_curves = []
    const n = points.length

    for (let i = 0; i < points.length; i++) {
      const a = points[i]
      const b = points[(i + 1) % n]
      const c = points[(i + 2) % n]
      const d = points[(i + 3) % n]
      const curve = BezierPrimitive.from_b_spline(a, b, c, d)
      bezier_curves.push(curve)
    }

    return new BeziergonPrimitive(bezier_curves)
  }
}
