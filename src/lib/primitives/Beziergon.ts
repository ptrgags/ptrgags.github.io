import { BezierCurve } from './BezierCurve.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Vec2 } from './Vec2.ts'

/**
 * A curved polygon where the edges are Bezier curves. The shape is always
 * closed
 * @implements {Primitive}
 */
export class Beziergon implements Drawable {
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
   * @param  points Points
   * @returns A beziergon interpolating the points
   */
  static interpolate_points(points: Vec2[]): Beziergon {
    const bezier_curves = []
    const n = points.length

    for (let i = 0; i < points.length; i++) {
      const a = points[i]
      const b = points[(i + 1) % n]
      const c = points[(i + 2) % n]
      const d = points[(i + 3) % n]
      const curve = BezierCurve.from_b_spline(a, b, c, d)
      bezier_curves.push(curve)
    }

    return new Beziergon(bezier_curves)
  }

  draw(lib: DrawingLibrary): void {
    lib.path(this.curves, true)
  }
}
