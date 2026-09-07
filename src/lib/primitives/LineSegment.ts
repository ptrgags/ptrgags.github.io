import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Pointlike } from './Pointlike.ts'

export class LineSegment implements Drawable {
  start: Pointlike
  end: Pointlike

  constructor(start: Pointlike, end: Pointlike) {
    this.start = start
    this.end = end
  }

  draw(lib: DrawingLibrary): void {
    const { x: x1, y: y1 } = this.start
    const { x: x2, y: y2 } = this.end
    lib.segment(x1, y1, x2, y2)
  }
}
