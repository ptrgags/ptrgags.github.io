import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import { Gridlines } from '../../lib/primitives/Gridlines.ts'
import type { Pointlike } from '../../lib/primitives/Pointlike.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import type { Meter } from './Meter.ts'

export interface MeterPrimitiveOptions {
  meter: Meter
  position: Pointlike
  radius: number
  measure_count: number
  beat_spacing: number
}

export class MeterPrimitive implements Drawable {
  meter: Meter
  measure_lines: Gridlines
  beat_lines: Gridlines

  constructor(options: MeterPrimitiveOptions) {
    this.meter = options.meter

    const measure_beats = this.meter.measure_length_beats

    const total_beats = options.measure_count * measure_beats
    const dimensions = { width: total_beats * options.beat_spacing, height: options.radius }

    const { x, y } = options.position
    const bounds = new Rect(
      {
        x: x,
        y: y - options.radius,
      },
      dimensions,
    )

    this.measure_lines = new Gridlines({
      bounds,
      x_spacing: measure_beats * options.beat_spacing,
    })

    this.beat_lines = new Gridlines({
      // This could be expressed as `bounds.align({width, height/2}, 'left')` when that's available
      bounds: bounds.align(
        { width: dimensions.width, height: 0.5 * dimensions.height },
        'left',
        'center',
      ),
      x_spacing: options.beat_spacing,
    })
  }

  draw(lib: DrawingLibrary): void {
    this.beat_lines.draw(lib)
    this.measure_lines.draw(lib)
  }
}
