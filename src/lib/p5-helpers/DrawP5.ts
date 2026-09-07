import type p5 from 'p5'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { Style } from '../styling/Style.ts'
import { is_nearly } from '../math/is_nearly.ts'

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

  segment(x1: number, y1: number, x2: number, y2: number): void {
    this.p.line(x1, y1, x2, y2)
  }

  rect(x: number, y: number, width: number, height: number): void {
    this.p.rect(x, y, width, height)
  }

  text(value: string, x: number, y: number): void {
    this.p.text(value, x, y)
  }

  apply_style(style: Style): void {
    const p = this.p
    if (style.stroke && !is_nearly(style.stroke.a, 0)) {
      const { r, g, b, a } = style.stroke
      p.stroke(r, g, b, a)
    } else {
      p.noStroke()
    }

    p.strokeWeight(style.stroke_width)

    if (style.fill && !is_nearly(style.fill.a, 0)) {
      const { r, g, b, a } = style.fill
      p.fill(r, g, b, a)
    } else {
      p.noFill()
    }
  }
}
