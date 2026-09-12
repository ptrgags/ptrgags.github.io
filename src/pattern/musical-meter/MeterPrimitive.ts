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
import { Oklch } from '../../lib/styling/Oklch.ts'

const STYLE_PICKUP = Style.lines(Oklch.grey(0.5), 2)

export interface MeterPrimitiveOptions {
  meter: Meter
  position: Pointlike
  radius: number
  measure_count: number
  beat_spacing: number
  show_time_signature?: boolean
  show_pickup_beats?: boolean
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
    const beat_spacing = options.beat_spacing
    const r = options.radius
    const position = options.position
    const measure_count = options.measure_count
    const show_pickup_beats = options.show_pickup_beats ?? false
    const show_time_signature = options.show_time_signature ?? true

    const measure_pulses = this.meter.measure_length_pulses

    const total_pulses = measure_count * measure_pulses
    const dimensions = { width: total_pulses * beat_spacing, height: 2 * r }

    const pickup_offset = this.meter.start_pulse * beat_spacing

    const { x, y } = position
    const bounds = new Rect(
      {
        x: x + pickup_offset,
        y: y - r,
      },
      dimensions,
    )

    const subdivision_scale = 4 / this.meter.bottom

    const measure_lines = new Gridlines({
      bounds,
      x_spacing: measure_pulses * beat_spacing,
    })

    const beat_lines = new Gridlines({
      bounds: bounds.align(
        { width: dimensions.width, height: 0.5 * dimensions.height },
        'left',
        'center',
      ),
      x_spacing: beat_spacing * subdivision_scale,
    })

    const lines = style(Style.DEFAULT_LINES, beat_lines, measure_lines)

    const group_pickup_lines = group()
    if (show_pickup_beats) {
      const pickup_beats = this.meter.start_pulse
      const width = beat_spacing * pickup_beats

      const pickup_lines = new Gridlines({
        bounds: new Rect({ x, y: y - 0.5 * r }, { width, height: 0.5 * dimensions.height }),
        x_spacing: beat_spacing * subdivision_scale,
      })

      group_pickup_lines.regroup(style(STYLE_PICKUP, pickup_lines))
    }

    const group_time_signature = group()
    if (show_time_signature) {
      const time_sig = make_time_signature(
        { x: x + pickup_offset, y },
        r,
        this.meter.top,
        this.meter.bottom,
      )
      group_time_signature.regroup(time_sig)
    }

    this.primitive = group(group_pickup_lines, lines, group_time_signature)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
