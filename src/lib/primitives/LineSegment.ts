import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Vec2 } from './Vec2.ts'

export class LineSegment implements Drawable {
  start: Vec2
  end: Vec2

  constructor(start: Vec2, end: Vec2) {
    this.start = start
    this.end = end
  }

  draw(lib: DrawingLibrary): void {
    const { x: x1, y: y1 } = this.start
    const { x: x2, y: y2 } = this.end
    lib.segment(x1, y1, x2, y2)
  }
}
