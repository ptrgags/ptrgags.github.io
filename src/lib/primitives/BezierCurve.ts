import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import { Polyline } from './Polyline.ts'
import type { Vec2 } from './Vec2.ts'

export class BezierCurve implements Drawable {
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

  draw(lib: DrawingLibrary): void {
    lib.bezier(this.a, this.b, this.c, this.d)
  }
}
