import { Direction2P } from '../math/pga2d/Direction2P.ts'
import type { BezierCurve } from '../primitives/BezierCurve.ts'
import { Circle } from '../primitives/Circle.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { LineSegment } from '../primitives/LineSegment.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import { Color } from '../styling/Color.ts'
import { Style } from '../styling/Style.ts'
import {
  TextStyle,
  type HorizontalTextAlign,
  type VerticalTextAlign,
} from '../styling/TextStyle.ts'
import {
  appendBezierCurve,
  closePath,
  fill,
  fillAndStroke,
  lineTo,
  moveTo,
  PDFFont,
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

function get_x_align(
  text: string,
  h_align: HorizontalTextAlign,
  font: PDFFont,
  font_size_points: number,
): number {
  if (h_align === 'left') {
    // text is aligned left by default in PDF
    return 0
  }

  // Compute the size of the text at the given font size
  const width_points = font.widthOfTextAtSize(text, font_size_points)

  if (h_align === 'right') {
    // To align right, we need to shift left by the entire string's width
    return -width_points
  }

  // Center is halfway between the two options above
  return -0.5 * width_points
}

function get_y_align(v_align: VerticalTextAlign, font: PDFFont, font_size_points: number): number {
  // See https://discourse.mcneel.com/t/proper-font-sizes-in-rhino/142515 for a diagram
  // of font terminology

  if (v_align === 'baseline') {
    // fonts render from the baseline by default, so no offset is needed
    return 0
  }

  // pdf-lib is a bit limited in terms of font measurements.
  const full_height = font.heightAtSize(font_size_points, { descender: true })
  const without_descender = font.heightAtSize(font_size_points, { descender: false })
  // this is the length from the descender line to the baseline. This is how
  // we know where we are within the whole bounding box of the text.
  const descender_height = full_height - without_descender

  if (v_align === 'bottom') {
    // the baseline is above the bottom, so we need to shift the box
    // up by the part that hangs down (descender)
    return descender_height
  }

  if (v_align === 'top') {
    // we're already at the baseline, so to align top we only need to
    // shift down the rest of the way
    return -without_descender
  }

  // for center, align 'bottom' then shift the box down by half of the
  // full height
  return descender_height - 0.5 * full_height
}

function align_text(
  text: string,
  h_align: HorizontalTextAlign,
  v_align: VerticalTextAlign,
  font: PDFFont,
  font_size_points: number,
): Direction2P {
  return new Direction2P(
    get_x_align(text, h_align, font, font_size_points),
    get_y_align(v_align, font, font_size_points),
  )
}

const OBNOXIOUSLY_PINK = new Style({
  fill: Color.MAGENTA,
  stroke: Color.GREEN,
})

const POINTS_PER_INCH = 72

export class DrawPDF implements DrawingLibrary {
  page: PDFPage
  font: PDFFont
  points_per_pixel: number
  pixels_per_point: number
  style_stack: Style[]
  text_style_stack: TextStyle[]

  constructor(page: PDFPage, pixels_per_inch: number, font: PDFFont) {
    this.page = page
    this.font = font

    // translate to top left corner and flip y so the coordinate system
    // becomes like a screen
    const height_points = page.getHeight()

    // we're currently at 1 unit = 1 pt = 1/72 inch
    // we want to produce a coordinate system in pixels
    // so 1 unit = 1 px = 1/ppi inches
    // so the scale factor is (1/ppi)/(1/72) = 72/pxpi
    const points_per_pixel = POINTS_PER_INCH / pixels_per_inch
    this.page.pushOperators(translate(0, height_points), scale(points_per_pixel, -points_per_pixel))

    this.points_per_pixel = points_per_pixel
    this.pixels_per_point = 1 / points_per_pixel
    this.style_stack = []
    this.text_style_stack = []
  }

  circle(circ: Circle): void {
    // PDF doesn't have a dedicated circle command! So convert to bezier curves
    // and render those as a closed path.
    this.path(circ.to_bezier_curves(), true)
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
    const text_style = this.text_style_stack.at(-1) ?? TextStyle.DEFAULT
    const { size: size_px, h_align, v_align } = text_style
    const size_points = size_px * this.points_per_pixel

    // Using the font, compute the offset where the first character's left baseline
    // should go. This will be done in units of points, so we have to convert
    // to our local coordinate system's units (pixels)
    //
    // NOTE: pdf-lib produces slightly different bounds than p5.js so results
    // may vary slightly
    const offset_points = align_text(value, h_align, v_align, this.font, size_points)
    const offset_px = offset_points.scale(this.pixels_per_point)

    // PDF text renders +y up, but we flipped y in the constructor to get a
    // screen-like coordinate system. So we flip the text again, but at the
    // local origin, not the page origin. So we apply some temporary
    // transformations here
    this.page.pushOperators(pushGraphicsState(), translate(x, y), scale(1, -1))

    // draw the text. units are in _pixels_ here.
    this.page.drawText(value, {
      x: offset_px.x,
      y: offset_px.y,
      font: this.font,
      size: size_px,
    })

    this.page.pushOperators(popGraphicsState())
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
    // unfortunately, pdf-lib doesn't have an easy way to set text alignment
    // so I need to manually compute it for every string. See text()
    this.text_style_stack.push(text_style)
  }

  end_text_style(): void {
    this.text_style_stack.pop()
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
