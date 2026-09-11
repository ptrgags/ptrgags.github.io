import type { MeasureNumber } from './MeasureNumber.ts'
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
  constructor(options: SongMeterOptions) {
    this.meters = make_meters(options.pickup_beats ?? 0, options.time_signatures)
  }

  beats_to_measures(beats: number): MeasureNumber {
    throw new Error('not implemented')
  }

  measures_to_beats(measures: MeasureNumber): number {
    throw new Error('not implemented')
  }
}
