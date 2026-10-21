import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import type { Dimensionlike } from '../../lib/primitives/Dimensionlike.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Text } from '../../lib/primitives/Text.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Style } from '../../lib/styling/Style.ts'
import { TextStyle } from '../../lib/styling/TextStyle.ts'

const STYLE_BLACK_KEYS = new Style({
  stroke: Oklch.grey(0.5),
  fill: Color.BLACK,
})
const STYLE_WHITE_KEYS = Style.flat(Color.WHITE)

export interface PianoScaleSchematicOptions {
  spacing: Dimensionlike
  origin: Vec2
  notes: [string, boolean][]
}

export class PianoScaleSchematic implements Drawable {
  primitive: Drawable

  constructor(options: PianoScaleSchematicOptions) {
    const origin = options.origin
    const spacing = options.spacing
    const notes = options.notes

    const upper_circles: Circle[] = []
    const lower_circles: Circle[] = []
    const upper_labels: Text[] = []
    const lower_labels: Text[] = []
    const vertices_left: Point2P[] = []
    const vertices_right: Point2P[] = []

    const y_upper = origin.y - spacing.height
    const y_lower = origin.y + spacing.height
    const radius = (7 / 16) * spacing.width
    const text_style = new TextStyle(radius, 'center', 'center')

    for (let i = 0; i < 7; i++) {
      const [note_name, upper] = notes[i]
      const x = origin.x + i * spacing.width
      const y = upper ? y_upper : y_lower
      const position = new Point2P(x, y)
      const circle = new Circle(position, radius)
      const text = new Text(note_name, position)

      // divide scale into two parts. the left is 1-2-3, the right is 4-5-6-7
      const vertices = i < 3 ? vertices_left : vertices_right

      // The labels and circles are either on the upper row (black keys)
      // or the lower row (white keys)
      const circles = upper ? upper_circles : lower_circles
      const labels = upper ? upper_labels : lower_labels

      vertices.push(position)
      circles.push(circle)
      labels.push(text)
    }

    this.primitive = group(
      style(
        Style.DEFAULT_LINES,
        new Polyline({ vertices: vertices_left, closed: false }),
        new Polyline({ vertices: vertices_right, closed: false }),
      ),
      style(STYLE_BLACK_KEYS, ...upper_circles),
      style(STYLE_WHITE_KEYS, ...lower_circles),
      style(
        {
          style: Style.flat(Color.WHITE),
          text_style,
        },
        ...upper_labels,
      ),
      style(
        {
          style: Style.flat(Color.BLACK),
          text_style,
        },
        ...lower_labels,
      ),
    )
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
