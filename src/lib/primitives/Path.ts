import type { BezierCurve } from './BezierCurve.ts'
import { CircularArc } from './CircularArc.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { LineSegment } from './LineSegment.ts'

export interface PathOptions {
  parts: (LineSegment | BezierCurve | CircularArc)[]
  closed: boolean
}

export class Path implements Drawable {
  parts: (LineSegment | BezierCurve)[]
  closed: boolean

  constructor(options: PathOptions) {
    this.parts = options.parts.flatMap((x) => {
      if (x instanceof CircularArc) {
        return x.to_bezier_curves()
      }

      return x
    })
    this.closed = options.closed
  }

  draw(lib: DrawingLibrary): void {
    lib.path(this.parts, this.closed)
  }
}
