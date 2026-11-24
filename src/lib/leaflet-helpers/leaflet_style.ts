import type { PathOptions } from 'leaflet'
import type { Style } from '../styling/Style.ts'

export function leaflet_style(style: Style): PathOptions {
  return {
    stroke: style.stroke !== undefined,
    color: style.stroke ? style.stroke.to_hex_code() : undefined,
    weight: style.stroke ? style.stroke_width : undefined,

    fill: style.fill !== undefined,
    fillColor: style.fill ? style.fill.to_hex_code() : undefined,

    // even though I prefer evenodd, this is more consistent with p5.js
    fillRule: 'nonzero',
  }
}
