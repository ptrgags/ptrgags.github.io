import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import { Gridlines } from '../../lib/primitives/Gridlines.ts'
import type { Pointlike } from '../../lib/primitives/Pointlike.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { TextStyle } from '../../lib/styling/TextStyle.ts'
import type { Meter } from './Meter.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { Style } from '../../lib/styling/Style.ts'

export interface MeterPrimitiveOptions {
  meter: Meter
  position: Pointlike
  radius: number
  measure_count: number
  beat_spacing: number
  show_time_signature?: boolean
}

function make_time_signature(
  position: Pointlike,
  radius: number,
  top: number,
  bottom: number,
): Drawable {
  const text_origin = { x: position.x - 2, y: position.y }

  const text_size = 0.75 * radius
  const text_style_top = new TextStyle(text_size, 'right', 'bottom')
  const text_style_bottom = new TextStyle(text_size, 'right', 'top')

  const text_top = new Text(`${top}`, text_origin)
  const text_bottom = new Text(`${bottom}`, text_origin)

  return group(
    style({ text_style: text_style_top, style: Style.DEFAULT_FLAT }, text_top),
    style({ text_style: text_style_bottom, style: Style.DEFAULT_FLAT }, text_bottom),
  )
}

export class MeterPrimitive implements Drawable {
  meter: Meter
  primitive: Drawable

  constructor(options: MeterPrimitiveOptions) {
    this.meter = options.meter

    const measure_pulses = this.meter.measure_length_pulses

    const total_pulses = options.measure_count * measure_pulses
    const dimensions = { width: total_pulses * options.beat_spacing, height: 2 * options.radius }

    const pickup_offset = this.meter.start_pulse * options.beat_spacing

    const { x, y } = options.position
    const bounds = new Rect(
      {
        x: x + pickup_offset,
        y: y - options.radius,
      },
      dimensions,
    )

    const subdivision_scale = 4 / this.meter.bottom

    const measure_lines = new Gridlines({
      bounds,
      x_spacing: measure_pulses * options.beat_spacing,
    })

    const beat_lines = new Gridlines({
      bounds: bounds.align(
        { width: dimensions.width, height: 0.5 * dimensions.height },
        'left',
        'center',
      ),
      x_spacing: options.beat_spacing * subdivision_scale,
    })

    const lines = style(Style.DEFAULT_LINES, beat_lines, measure_lines)

    const show_time_signature = options.show_time_signature ?? true
    if (show_time_signature) {
      const time_sig = make_time_signature(
        { x: x + pickup_offset, y },
        options.radius,
        this.meter.top,
        this.meter.bottom,
      )
      this.primitive = group(lines, time_sig)
    } else {
      this.primitive = lines
    }
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
