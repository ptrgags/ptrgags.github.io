import type p5 from 'p5'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'

export class DrawP5 implements DrawingLibrary {
  /**
   * p5 instance
   */
  private p: p5

  constructor(p: p5) {
    this.p = p
  }

  circle(cx: number, cy: number, r: number): void {
    // p5 defines a circle in terms of diameter for some reason
    this.p.circle(cx, cy, 2 * r)
  }

  segment(x1: number, x2: number, y1: number, y2: number): void {
    this.p.line(x1, y1, x2, y2)
  }
}
