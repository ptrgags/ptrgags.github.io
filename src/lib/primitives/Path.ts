import type { BezierCurve } from './BezierCurve.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { LineSegment } from './LineSegment.ts'

export interface PathOptions {
  parts: (LineSegment | BezierCurve)[]
  closed: boolean
}

export class Path implements Drawable {
  parts: (LineSegment | BezierCurve)[]
  closed: boolean

  constructor(options: PathOptions) {
    this.parts = options.parts
    this.closed = options.closed
  }

  draw(lib: DrawingLibrary): void {
    lib.path(this.parts, this.closed)
  }
}
