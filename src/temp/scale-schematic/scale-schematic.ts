import type p5 from 'p5'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { TextStyle } from '../../lib/styling/TextStyle.ts'

const Y_UPPER = 128 - 16
const Y_LOWER = 128 + 16
const X_START = 16
const X_SPACING = 32
const RADIUS = 12
const STYLE_BLACK_KEYS = new Style({
  stroke: Oklch.grey(0.5),
  fill: Color.BLACK,
})
const STYLE_WHITE_KEYS = Style.flat(Color.WHITE)

function make_schematic(notes: [string, boolean][]): Drawable {
  const circles = []
  const upper_labels: Text[] = []
  const lower_labels: Text[] = []
  const vertices_left: Point2P[] = []
  const vertices_right: Point2P[] = []

  for (let i = 0; i < 7; i++) {
    const [note_name, upper] = notes[i]
    const x = X_START + i * X_SPACING
    const y = upper ? Y_UPPER : Y_LOWER
    const position = new Point2P(x, y)
    const key_style = upper ? STYLE_BLACK_KEYS : STYLE_WHITE_KEYS
    const circle = style(key_style, new Circle(position, RADIUS))
    const text = new Text(note_name, position)

    // divide scale into two parts. the left is 1-2-3, the right is 4-5-6-7
    const vertices = i < 3 ? vertices_left : vertices_right
    const labels = upper ? upper_labels : lower_labels

    vertices.push(position)
    circles.push(circle)
    labels.push(text)
  }

  return group(
    style(
      Style.DEFAULT_LINES,
      new Polyline({ vertices: vertices_left, closed: false }),
      new Polyline({ vertices: vertices_right, closed: false }),
    ),
    ...circles,
    style(
      {
        style: Style.flat(Color.WHITE),
        text_style: new TextStyle(12, 'center', 'center'),
      },
      ...upper_labels,
    ),
    style(
      {
        style: Style.flat(Color.BLACK),
        text_style: new TextStyle(12, 'center', 'center'),
      },
      ...lower_labels,
    ),
  )
}

const SCHEMATIC_E_FLAT = make_schematic([
  ['Eb', true],
  ['F', false],
  ['G', false],
  ['Ab', true],
  ['Bb', true],
  ['C', false],
  ['D', false],
])

export const SKETCHES = {
  scale_schematic: make_static_sketch(SWATCH.dimensions, SCHEMATIC_E_FLAT),
}
