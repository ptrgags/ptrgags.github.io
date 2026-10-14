import type { BezierCurve } from '../primitives/BezierCurve.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { LineSegment } from '../primitives/LineSegment.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import { Color } from '../styling/Color.ts'
import { Style } from '../styling/Style.ts'
import type { TextStyle } from '../styling/TextStyle.ts'
import {
  appendBezierCurve,
  closePath,
  fill,
  fillAndStroke,
  lineTo,
  moveTo,
  PDFOperator,
  PDFPage,
  popGraphicsState,
  pushGraphicsState,
  rectangle,
  rotateRadians,
  scale,
  setFillingRgbColor,
  setLineWidth,
  setStrokingRgbColor,
  stroke,
  translate,
} from 'pdf-lib'

const OBNOXIOUSLY_PINK = new Style({
  fill: Color.MAGENTA,
  stroke: Color.GREEN,
})

export class DrawPDF implements DrawingLibrary {
  page: PDFPage
  style_stack: Style[]

  constructor(page: PDFPage) {
    this.page = page

    // TODO: Flip coordinates so the page is specified
    // y-down like a screen.
    // TODO: adjust the scale since the primitive is measured in
    // pixels while PDF uses points (1/72 of an inch)
    const height = page.getHeight()
    this.begin_xform_rigid(0, height, 0, true)

    this.style_stack = []
  }

  circle(cx: number, cy: number, radius: number): void {
    // This will require splitting a circle into 4 bezier curves
    throw new Error('Method not implemented.')
  }

  arc(
    cx: number,
    cy: number,
    radius: number,
    angle1: number,
    angle2: number,
    orientation: 1 | -1,
  ): void {
    // This will require splitting a circular arc into bezier curves
    throw new Error('Method not implemented.')
  }

  segment(x1: number, y1: number, x2: number, y2: number): void {
    this.page.pushOperators(moveTo(x1, y1), lineTo(x2, y2), this.current_draw_command)
  }

  polyline(points: Vec2[]): void {
    if (points.length < 2) {
      return
    }

    this.page.pushOperators(moveTo(points[0].x, points[0].y))
    for (let i = 1; i < points.length; i++) {
      const { x, y } = points[i]
      this.page.pushOperators(lineTo(x, y))
    }

    this.page.pushOperators(this.current_draw_command)
  }

  bezier(a: Vec2, b: Vec2, c: Vec2, d: Vec2): void {
    this.page.pushOperators(
      moveTo(a.x, a.y),
      appendBezierCurve(b.x, b.y, c.x, c.y, d.x, d.y),
      this.current_draw_command,
    )
  }

  path(parts: (LineSegment | BezierCurve)[], closed: boolean): void {
    if (parts.length === 0) {
      return
    }

    const { x: start_x, y: start_y } = parts[0].start
    this.page.pushOperators(moveTo(start_x, start_y))
    for (const part of parts) {
      if (part instanceof LineSegment) {
        const { x, y } = part.end
        this.page.pushOperators(lineTo(x, y))
      } else {
        const { b, c, d } = part
        this.page.pushOperators(appendBezierCurve(b.x, b.y, c.x, c.y, d.x, d.y))
      }
    }

    if (closed) {
      this.page.pushOperators(closePath())
    }
    this.page.pushOperators(this.current_draw_command)
  }

  rect(x: number, y: number, width: number, height: number): void {
    this.page.pushOperators(rectangle(x, y, width, height), this.current_draw_command)
  }

  text(value: string, x: number, y: number): void {
    // This will require some thought
    throw new Error('Method not implemented.')
  }

  begin_style(style: Style): void {
    this.style_stack.push(style)

    if (style.stroke) {
      const { r, g, b } = style.stroke
      this.page.pushOperators(setStrokingRgbColor(r / 255, g / 255, b / 255))
    }

    if (style.stroke_width) {
      this.page.pushOperators(setLineWidth(style.stroke_width))
    }

    if (style.fill) {
      const { r, g, b } = style.fill
      this.page.pushOperators(setFillingRgbColor(r / 255, g / 255, b / 255))
    }
  }

  end_style(): void {
    this.style_stack.pop()
  }

  begin_text_style(text_style: TextStyle): void {
    // This is going to require some thought, I need to align text manually
    throw new Error('Method not implemented.')
  }

  end_text_style(): void {
    // Nothing to do here
  }

  begin_xform_rigid(
    translation_x: number,
    translation_y: number,
    rotation: number,
    flip_y: boolean,
  ): void {
    const scale_y = flip_y ? -1 : 1
    this.page.pushOperators(
      pushGraphicsState(),
      translate(translation_x, translation_y),
      rotateRadians(rotation),
      scale(1, scale_y),
    )
  }

  end_xform(): void {
    this.page.pushOperators(popGraphicsState())
  }

  push(): void {
    this.page.pushOperators()
  }

  get current_draw_command(): PDFOperator {
    const current_style = this.style_stack.at(-1) ?? OBNOXIOUSLY_PINK

    if (current_style.stroke && current_style.fill) {
      return fillAndStroke()
    }

    if (current_style.stroke) {
      return stroke()
    }

    if (current_style.fill) {
      return fill()
    }

    throw new Error('pdf invisible styling')
  }
}
