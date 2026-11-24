import {
  circle,
  divIcon,
  layerGroup,
  marker,
  polygon,
  Polygon,
  Polyline,
  polyline,
  rectangle,
  type LayerGroup,
  type PathOptions,
} from 'leaflet'
import type { BezierCurve } from '../primitives/BezierCurve.ts'
import type { Circle } from '../primitives/Circle.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { LineSegment } from '../primitives/LineSegment.ts'
import type { Rect } from '../primitives/Rect.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import { Style } from '../styling/Style.ts'
import type { TextStyle } from '../styling/TextStyle.ts'
import { Color } from '../styling/Color.ts'
import { leaflet_style } from './leaflet_style.ts'

const OBNOXIOUSLY_PINK = new Style({
  fill: Color.MAGENTA,
  stroke: Color.GREEN,
})

/**
 * Draw primitives to a Leaflet layer group.
 *
 * Coordinates are specified in pixels, +x to the right, +y down from (lat=0, lon=0). At the top
 * level, map tiles are 256x256 px for reference. This class handles converting
 * to lat-lon coordinates as needed
 */
export class DrawLeaflet implements DrawingLibrary {
  layer: LayerGroup
  style_stack: Style[] = []
  text_style_stack: TextStyle[] = []

  constructor(layer: LayerGroup) {
    this.layer = layer
  }

  circle(circ: Circle): void {
    const lat = -circ.center.y
    const lon = circ.center.x

    const c = circle([lat, lon], { radius: circ.radius, ...this.#current_style })
    this.layer.addLayer(c)
  }

  arc(
    cx: number,
    cy: number,
    radius: number,
    angle1: number,
    angle2: number,
    orientation: 1 | -1,
  ): void {
    throw new Error('Not supported: circular arcs in Leaflet')
  }

  segment(x1: number, y1: number, x2: number, y2: number): void {
    const pl = polyline(
      [
        [-y1, x1],
        [-y2, x2],
      ],
      this.#current_style,
    )
    this.layer.addLayer(pl)
  }

  polyline(vertices: Vec2[], closed: boolean): void {
    const vertices_lat_lon = vertices.map((v) => {
      return [-v.y, v.x] as [number, number]
    })

    const style_options = this.#current_style

    const pl = closed
      ? polygon(vertices_lat_lon, style_options)
      : polyline(vertices_lat_lon, style_options)
    this.layer.addLayer(pl)
  }

  bezier(a: Vec2, b: Vec2, c: Vec2, d: Vec2): void {
    throw new Error('Not supported: Leaflet bezier')
  }

  path(parts: (LineSegment | BezierCurve)[], closed: boolean): void {
    throw new Error('Not supported: Leaflet path (no bezier impl)')
  }

  rect(x: number, y: number, width: number, height: number): void {
    const lat1 = -y
    const lon1 = x
    const lat2 = lat1 - height
    const lon2 = lon1 + width
    const r = rectangle(
      [
        [lat1, lon1],
        [lat2, lon2],
      ],
      this.#current_style,
    )
    this.layer.addLayer(r)
  }

  text(value: string, x: number, y: number): void {
    // TODO: make use of the text style. Need to do this for SVG as well
    // EDIT... this is going to be tricky since it's styled by css class
    const txt = marker([-y, x], {
      icon: divIcon({ html: value, className: 'drawable-text' }),
    })
    this.layer.addLayer(txt)
  }

  begin_style(style: Style): void {
    this.style_stack.push(style)
  }

  end_style(): void {
    this.style_stack.pop()
  }

  begin_text_style(text_style: TextStyle): void {
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
    throw new Error('Not implemented: Leaflet begin_xform_rigid')
  }

  end_xform(): void {
    throw new Error('Not implemented: Leaflet end_xform')
  }

  image(image_id: string, position: Vec2): void {
    throw new Error('Not supported: Leaflet image_frame')
  }

  image_frame(image_id: string, src_rect: Rect, position: Vec2): void {
    throw new Error('Not supported: Leaflet image_frame')
  }

  get #current_style(): PathOptions {
    const style = this.style_stack.at(-1) ?? OBNOXIOUSLY_PINK
    return leaflet_style(style)
  }
}
