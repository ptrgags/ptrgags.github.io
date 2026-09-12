import type p5 from 'p5'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { Style } from '../styling/Style.ts'
import { is_nearly } from '../math/is_nearly.ts'
import type { HorizontalTextAlign, TextStyle, VerticalTextAlign } from '../styling/TextStyle.ts'
import type { Color } from '../styling/Color.ts'

/**
 * Convert string align values to p5.js constants
 * @param p p5.js library
 * @param h_align The horizontal align value
 * @returns the corresponding p5.js constant
 */
function get_horizontal_align(p: p5, h_align: HorizontalTextAlign) {
  switch (h_align) {
    case 'center':
      return p.CENTER
    case 'right':
      return p.RIGHT
    default:
      return p.LEFT
  }
}

/**
 * Convert string align values to p5.js constants
 * @param p p5.js library
 * @param  v_align The vertical align value
 * @returns The corresponding p5.js constant
 */
function get_vertical_align(p: p5, v_align: VerticalTextAlign) {
  switch (v_align) {
    case 'center':
      return p.CENTER
    case 'top':
      return p.TOP
    case 'baseline':
      return p.BASELINE
    default:
      return p.BOTTOM
  }
}

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

  apply_text_style(text_style: TextStyle): void {
    this.p.textSize(text_style.size)

    const h_align = get_horizontal_align(this.p, text_style.h_align)
    const v_align = get_vertical_align(this.p, text_style.v_align)
    this.p.textAlign(h_align, v_align)
  }
}
