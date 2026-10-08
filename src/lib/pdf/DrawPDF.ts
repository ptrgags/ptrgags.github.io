import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import { Color } from '../styling/Color.ts'
import { Style } from '../styling/Style.ts'
import type { TextStyle } from '../styling/TextStyle.ts'
import {
  fill,
  fillAndStroke,
  PDFOperator,
  PDFPage,
  popGraphicsState,
  pushGraphicsState,
  rectangle,
  setFillingRgbColor,
  setLineWidth,
  setStrokingRgbColor,
  stroke,
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
    this.style_stack = []
  }

  circle(cx: number, cy: number, radius: number): void {
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
    throw new Error('Method not implemented.')
  }

  segment(x1: number, y1: number, x2: number, y2: number): void {
    throw new Error('Method not implemented.')
  }

  polyline(points: Vec2[]): void {
    throw new Error('Method not implemented.')
  }

  rect(x: number, y: number, width: number, height: number): void {
    this.page.pushOperators(rectangle(x, y, width, height), this.current_draw_command)
  }

  text(value: string, x: number, y: number): void {
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

  end_style(style: Style): void {
    this.style_stack.pop()
  }

  apply_text_style(text_style: TextStyle): void {
    throw new Error('Method not implemented.')
  }

  apply_rigid(
    translation_x: number,
    translation_y: number,
    rotation: number,
    flip_y: boolean,
  ): void {
    throw new Error('Method not implemented.')
  }

  push(): void {
    this.page.pushOperators(pushGraphicsState())
  }

  pop(): void {
    this.page.pushOperators(popGraphicsState())
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
