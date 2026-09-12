import { cumsum } from '../../lib/math/cumsum.ts'
import { MeasureNumber } from './MeasureNumber.ts'
import { Meter } from './Meter.ts'

export interface SongMeterOptions {
  pickup_beats?: number
  // (top, bottom, measure_count)
  time_signatures: [number, number, number][]
}

function make_meters(pickup_beats: number, time_signatures: [number, number, number][]): Meter[] {
  let next_start = pickup_beats
  const result = []
  for (const [top, bottom, measure_count] of time_signatures) {
    const meter = new Meter(top, bottom, next_start)
    result.push(meter)

    // Count out the specified number of complete measures away from the start time,
    // this is where the next meter will start
    next_start = meter.offset_to_beats({ measures: measure_count, subdivisions: 0 })
  }
  return result
}

export class SongMeter {
  meters: Meter[]
  measure_starts: number[]
  measure_lengths: number[]
  constructor(options: SongMeterOptions) {
    if (options.time_signatures.length < 1) {
      throw new Error('options.time_signatures must have at least one entry')
    }

    this.meters = make_meters(options.pickup_beats ?? 0, options.time_signatures)
    this.measure_lengths = options.time_signatures.map(([, , measure_count]) => measure_count)
    this.measure_starts = cumsum([0, ...this.measure_lengths.slice(0, -1)])
  }

  /**
   * Get pairs of (meter, measure_count). This is mainly used for rendering
   * in SongMeterPrimitive
   */
  get meter_lengths(): [Meter, number][] {
    return this.meters.map((x, i) => [x, this.measure_lengths[i]])
  }

  pulses_to_measures(pulses: number): MeasureNumber {
    const after_index = this.meters.findIndex((x) => x.start_beat > pulses)

    let meter_index: number
    if (after_index === 0) {
      // pulse is a pickup beat, so use the first meter
      meter_index = 0
    } else if (after_index === -1) {
      // Pulse is after start of last meter, so use that one
      meter_index = this.meters.length - 1
    } else {
      // Otherwise, we want the meter just before the one we found
      meter_index = after_index - 1
    }

    const meter = this.meters[meter_index]
    const start_measure = this.measure_starts[meter_index]

    const { measures, subdivisions } = meter.beats_to_offset(pulses)
    return new MeasureNumber(start_measure + measures, subdivisions)
  }

  measures_to_pulses(measures: MeasureNumber): number {
    const after_index = this.measure_starts.findIndex((x) => x > measures.measures)

    let meter_index: number
    if (after_index === 0) {
      meter_index = 0
    } else if (after_index === -1) {
      meter_index = this.meters.length - 1
    } else {
      meter_index = after_index - 1
    }
    const start_measure = this.measure_starts[meter_index]

    const meter = this.meters[meter_index]
    try {
      return meter.offset_to_beats({
        measures: measures.measures - start_measure,
        subdivisions: measures.beats,
      })
    } catch (e) {
      if (e instanceof Error && e.message.startsWith('invalid measure')) {
        throw new Error(
          `invalid measure ${measures.measure_number} for measure in ${meter.time_signature} time`,
        )
      } else {
        throw e
      }
    }
  }
}
