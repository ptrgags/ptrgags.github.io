import type p5 from 'p5'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { Style } from '../styling/Style.ts'
import { is_nearly } from '../math/is_nearly.ts'
import type { HorizontalTextAlign, TextStyle, VerticalTextAlign } from '../styling/TextStyle.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import type { BezierCurve } from '../primitives/BezierCurve.ts'
import { LineSegment } from '../primitives/LineSegment.ts'

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

  arc(
    cx: number,
    cy: number,
    radius: number,
    angle1: number,
    angle2: number,
    orientation: 1 | -1,
  ): void {
    if (orientation === -1) {
      ;[angle1, angle2] = [angle2, angle1]
    }

    this.p.arc(cx, cy, radius * 2, radius * 2, angle1, angle2, this.p.OPEN)
  }

  segment(x1: number, y1: number, x2: number, y2: number): void {
    this.p.line(x1, y1, x2, y2)
  }

  bezier(a: Vec2, b: Vec2, c: Vec2, d: Vec2): void {
    this.p.bezier(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y)
  }

  polyline(points: Vec2[], closed: boolean): void {
    this.p.beginShape()
    for (const { x, y } of points) {
      this.p.vertex(x, y)
    }
    const close_flag = closed ? this.p.CLOSE : undefined
    this.p.endShape(close_flag)
  }

  path(parts: (LineSegment | BezierCurve)[], closed: boolean): void {
    if (parts.length < 1) {
      return
    }

    this.p.beginShape()
    const { x: start_x, y: start_y } = parts[0].start
    this.p.vertex(start_x, start_y)
    for (const part of parts) {
      // Since paths are relative to the current point, we skip the
      // start point of each path part
      if (part instanceof LineSegment) {
        const { x, y } = part.end
        this.p.vertex(x, y)
      } else {
        const { b, c, d } = part
        this.p.bezierVertex(b.x, b.y)
        this.p.bezierVertex(c.x, c.y)
        this.p.bezierVertex(d.x, d.y)
      }
    }

    const close_flag = closed ? this.p.CLOSE : undefined
    this.p.endShape(close_flag)
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

  apply_rigid(
    translation_x: number,
    translation_y: number,
    rotation: number,
    flip_y: boolean,
  ): void {
    this.p.translate(translation_x, translation_y)
    this.p.rotate(rotation)
    const scale_y = flip_y ? -1 : 1
    this.p.scale(1, scale_y)
  }

  push(): void {
    this.p.push()
  }

  pop(): void {
    this.p.pop()
  }
}
