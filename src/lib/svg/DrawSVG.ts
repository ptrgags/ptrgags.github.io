import type { BezierCurve } from '../primitives/BezierCurve.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { LineSegment } from '../primitives/LineSegment.ts'
import type { Rect } from '../primitives/Rect.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import type { Style } from '../styling/Style.ts'
import type { TextStyle } from '../styling/TextStyle.ts'
import { svg_tag } from './svg_tag.ts'
import { SVGCommand } from './SVGCommand.ts'

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

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

export interface DrawSVGOptions {
  // Bounding box to view in pixels
  view_box: Rect
}

export class DrawSVG implements DrawingLibrary {
  root: SVGSVGElement
  stack: SVGElement[]

  constructor(options: DrawSVGOptions) {
    const svg = document.createElementNS(SVG_NAMESPACE, 'svg')

    const { x, y } = options.view_box.position
    const { width, height } = options.view_box.dimensions
    svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`)
    svg.setAttribute('width', width.toString())
    svg.setAttribute('height', height.toString())

    this.root = svg
    this.stack = [svg]
  }

  private add_child(element: SVGElement) {
    const last = this.stack.at(-1)
    if (!last) {
      throw new Error('stack empty!')
    }

    last.appendChild(element)
  }

  private begin_group(element: SVGGElement) {
    this.stack.push(element)
  }

  private end_group() {
    const last = this.stack.pop()

    if (!(last instanceof SVGGElement)) {
      throw new Error("Last element wasn't a <g> tag!")
    }

    this.add_child(last)
  }

  circle(cx: number, cy: number, radius: number): void {
    const tag = svg_tag('circle', { cx: cx.toString(), cy: cy.toString(), r: radius.toString() })

    this.add_child(tag)
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

  polyline(points: Vec2[], closed: boolean): void {
    const vertices = points.map((vertex) => `${vertex.x},${vertex.y}`).join(' ')
    const tag_name = closed ? 'polygon' : 'polyline'
    const tag = svg_tag(tag_name, { points: vertices })
    this.add_child(tag)
  }

  bezier(a: Vec2, b: Vec2, c: Vec2, d: Vec2): void {
    const commands = [SVGCommand.move_to(a), SVGCommand.bezier_vertex(b, c, d)]

    const tag = svg_tag('path', {
      d: commands.join(' '),
    })
  }

  path(parts: (LineSegment | BezierCurve)[], closed: boolean): void {
    if (parts.length < 1) {
      return
    }

    const commands: string[] = []

    const start = parts[0].start
    commands.push(SVGCommand.move_to(start))
    for (const part of parts) {
      // Since paths are relative to the current point, we skip the
      // start point of each path part
      if (part instanceof LineSegment) {
        commands.push(SVGCommand.line_to(part.end))
      } else {
        const { b, c, d } = part
        commands.push(SVGCommand.bezier_vertex(b, c, d))
      }
    }

    if (closed) {
      commands.push(SVGCommand.CLOSE_PATH)
    }

    const path = svg_tag('path', {
      d: commands.join(' '),
    })
    this.add_child(path)
  }

  rect(x: number, y: number, width: number, height: number): void {
    throw new Error('Method not implemented.')
  }
  text(value: string, x: number, y: number): void {
    throw new Error('Method not implemented.')
  }

  begin_style(style: Style): void {
    const attributes = {}
    apply_svg_style(attributes, style)
    const g = svg_tag('g', attributes)
    this.begin_group(g as SVGGElement)
  }

  end_style(): void {
    this.end_group()
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
