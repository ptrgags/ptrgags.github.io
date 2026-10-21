import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import type { BezierCurve } from '../primitives/BezierCurve.ts'
import { Circle } from '../primitives/Circle.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { LineSegment } from '../primitives/LineSegment.ts'
import { Rect } from '../primitives/Rect.ts'
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
  beginText,
  closePath,
  drawText,
  endText,
  fill,
  fillAndStroke,
  lineTo,
  moveTo,
  PDFFont,
  PDFHexString,
  PDFOperator,
  PDFPage,
  popGraphicsState,
  pushGraphicsState,
  rectangle,
  rotateRadians,
  scale,
  setFillingRgbColor,
  setFontAndSize,
  setLineWidth,
  setStrokingRgbColor,
  setTextMatrix,
  setTextRenderingMode,
  showText,
  StandardFonts,
  stroke,
  TextRenderingMode,
  translate,
} from 'pdf-lib'

function get_x_align(
  text: string,
  h_align: HorizontalTextAlign,
  font: PDFFont,
  font_size: number,
): number {
  if (h_align === 'left') {
    // text is aligned left by default in PDF
    return 0
  }

  // Compute the size of the text at the given font size
  const width_points = font.widthOfTextAtSize(text, font_size)

  if (h_align === 'right') {
    // To align right, we need to shift left by the entire string's width
    return -width_points
  }

  // Center is halfway between the two options above
  return -0.5 * width_points
}

function get_y_align(v_align: VerticalTextAlign, font: PDFFont, font_size: number): number {
  // See https://discourse.mcneel.com/t/proper-font-sizes-in-rhino/142515 for a diagram
  // of font terminology

  if (v_align === 'baseline') {
    // fonts render from the baseline by default, so no offset is needed
    return 0
  }

  // pdf-lib is a bit limited in terms of font measurements.
  const full_height = font.heightAtSize(font_size, { descender: true })
  const without_descender = font.heightAtSize(font_size, { descender: false })
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
  font_size: number,
): Direction2P {
  return new Direction2P(
    get_x_align(text, h_align, font, font_size),
    get_y_align(v_align, font, font_size),
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
  pixels_per_inch: number
  style_stack: Style[]
  text_style_stack: TextStyle[]

  constructor(page: PDFPage, pixels_per_inch: number, font: PDFFont) {
    this.page = page
    this.pixels_per_inch = pixels_per_inch
    this.font = font

    // translate to top left corner and flip y so the coordinate system
    // becomes like a screen
    //const height = page.getHeight()
    //this.begin_xform_rigid(0, height, 0, true)

    // we're currently at 1 unit = 1 pt = 1/72 inch
    // we want to produce a coordinate system in pixels
    // so 1 unit = 1 px = 1/ppi inches
    // so the scale factor is (1/ppi)/(1/72) = 72/pxpi
    //const points_per_pixel = POINTS_PER_INCH / pixels_per_inch
    //this.page.pushOperators(scale(points_per_pixel, points_per_pixel))

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
    const { size, h_align, v_align } = text_style

    const text_offset = align_text(value, h_align, v_align, this.font, size)

    /*
    const height_points = this.font.heightAtSize(text_size, { descender: true })
    const height_above_baseline = this.font.heightAtSize(text_size, { descender: false })
    // I believe this will be the height of the baseline above the bottom
    const descender_height_points = height_points - height_above_baseline
    // This only works for a single time. If \n is used, then we need to split manually
    // and check line-by-line and also check the spacing between lines... let's avoid this
    // if we can.
    const width_points = this.font.widthOfTextAtSize(value, text_size)

    const pixels_per_point = POINTS_PER_INCH / this.pixels_per_inch
    const text_dimensions_px = new Direction2P(width_points, height_points).scale(pixels_per_point)
    // We're always going to anchor the text at the local origin. Depending on the alignment,
    // this can be anywhere in [-w, w] x [h x h]
    const bounding_box_px = Rect.from_center(Point2P.ORIGIN, text_dimensions_px.scale(2))
    const aligned_bounds_px = bounding_box_px.align(text_dimensions_px, 'left', 'top')

    const descender_height_px = descender_height_points * pixels_per_point
    const baseline_origin_px = aligned_bounds_px.position.add(
      new Direction2P(0, descender_height_px),
    )

    console.log(width_points, height_points)
    console.log(descender_height_points)
    */

    // wait... I'm going to need to do this in pixels... I need to think about this
    // but getting closer
    /*
    const origin = new Direction2P(x, y)
    const text_dimensions = new Direction2P(width, height)
    const max_bounds = Rect.from_center(origin, text_dimensions.scale(2))
    const aligned_bounds = max_bounds.align(text_dimensions, 'center', 'center')
    const target = origin.add(Direction2P.DIR_Y.scale(descender))
    */

    /*
    this.page.pushOperators(pushGraphicsState(), translate(x, y), scale(1, -1))
    this.page.drawText(value, {
      // center text
      //x: -width_points,
      //y: descender_height_points - height_points,
      // left baseline
      //x: 0,
      //y: 0,
      // right baseline... why do I need this scale factor of 2 for it to look right???
      //x: -2 * width_points,
      //y: 0,
      // left top
      x: 0,
      y: -2 * (height_points - descender_height_points),
      font: this.font,
    })
    this.page.pushOperators(popGraphicsState())
    */
    this.page.drawText(value, { x: x + text_offset.x, y: y + text_offset.y, font: this.font, size })
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
