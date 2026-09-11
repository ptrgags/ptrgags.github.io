import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import type { Pointlike } from '../../lib/primitives/Pointlike.ts'
import { group } from '../../lib/primitives/shorthand.ts'
import { MeterPrimitive } from './MeterPrimitive.ts'
import type { SongMeter } from './SongMeter.ts'

export interface SongMeterPrimitiveOptions {
  meter: SongMeter
  position: Pointlike
  radius: number
  pulse_spacing: number
  show_time_signature?: boolean
}

export class SongMeterPrimitive implements Drawable {
  meter: SongMeter
  primitive: Drawable
  constructor(options: SongMeterPrimitiveOptions) {
    this.meter = options.meter
    const meters = options.meter.meter_lengths.map(([meter, measure_count]) => {
      return new MeterPrimitive({
        meter: meter,
        // Since each `MeterPrimitive` handles its start beat, we pass
        // the overall song meter position to every meter
        position: options.position,
        radius: options.radius,
        measure_count,
        beat_spacing: options.pulse_spacing,
        show_time_signature: options.show_time_signature,
      })
    })

    this.primitive = group(...meters)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
