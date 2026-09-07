import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import { Gridlines } from '../../lib/primitives/Gridlines.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import type { Meter } from './Meter.ts'

export class MeterPrimitive implements Drawable {
  meter: Meter
  bounds: Rect
  measure_count: number
  measure_lines: Gridlines
  beat_lines: Gridlines

  constructor(meter: Meter, bounds: Rect, measure_count: number) {
    this.meter = meter
    this.bounds = bounds
    this.measure_count = measure_count

    const pixels_per_measure = bounds.dimensions.width / this.measure_count

    this.measure_lines = new Gridlines({
      bounds,
      x_axis: { spacing: pixels_per_measure, phase: 0 },
    })
    this.beat_lines = new Gridlines({
      // This could be expressed as `bounds.align({width, height/2}, 'left')` when that's available
      bounds: new Rect(
        {
          x: bounds.position.x,
          y: bounds.position.y + 0.25 * bounds.dimensions.height,
        },
        { width: bounds.dimensions.width, height: 0.5 * bounds.dimensions.height },
      ),
      x_axis: { spacing: pixels_per_measure / 4, phase: 0 },
    })
  }

  draw(lib: DrawingLibrary): void {
    this.beat_lines.draw(lib)
    this.measure_lines.draw(lib)
  }
}
