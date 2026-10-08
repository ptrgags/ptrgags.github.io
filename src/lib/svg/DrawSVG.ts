import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import type { Style } from '../styling/Style.ts'
import type { TextStyle } from '../styling/TextStyle.ts'
import { svg_tag } from './svg_tag.ts'

/**
 * Apply a Style as SVG attributes
 * @param {{[key: string]: string}} attributes
 * @param {Style} style
 */
function apply_svg_style(attributes: { [key: string]: string }, style: Style) {
  if (style.stroke) {
    attributes.stroke = style.stroke.to_hex_code()
  }

  if (style.fill) {
    attributes.fill = style.fill.to_hex_code()
  }

  if (style.stroke_width) {
    attributes['stroke-width'] = style.stroke_width.toString()
  }
}

export class DrawSVG implements DrawingLibrary {
  constructor() {}

  add_tag() {
    throw new Error('not implemented')
  }

  circle(cx: number, cy: number, radius: number): void {
    const tag = svg_tag('circle', { cx: cx.toString(), cy: cy.toString(), r: radius.toString() })

    this.add_tag(tag)
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
    const vertices = points.map((vertex) => `${vertex.x},${vertex.y}`).join(' ')
    const tag = svg_tag('polyline', { points: vertices })
    this.add_tag(tag)
  }

  polygon(points: Vec2[]): void {
    const vertices = points.map((vertex) => `${vertex.x},${vertex.y}`).join(' ')
    const tag = svg_tag('polygon', { points: vertices })
    this.add_tag(tag)
  }

  rect(x: number, y: number, width: number, height: number): void {
    throw new Error('Method not implemented.')
  }
  text(value: string, x: number, y: number): void {
    throw new Error('Method not implemented.')
  }

  apply_style(style: Style): void {
    const attributes = {}
    apply_svg_style(attributes, style)
    const g = svg_tag('g', attributes)

    this.push_tag(g)
  }

  end_style(): void {
    this.pop_tag()
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
    throw new Error('Method not implemented.')
  }
  pop(): void {
    throw new Error('Method not implemented.')
  }
}
