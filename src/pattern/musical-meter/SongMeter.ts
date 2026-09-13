import { MeasureNumber } from './MeasureNumber.ts'
import { Meter } from './Meter.ts'

export interface SongMeterOptions {
  pickup_pulses?: number
  // (top, bottom, measure_count) where measure_count is how many measures
  // the time signature will be used for.
  time_signatures: [number, number, number][]
}

function make_meters(
  pickup_pulses: number,
  time_signatures: [number, number, number][],
): [Meter, number, number][] {
  let start_pulses = pickup_pulses
  let start_measure = 0
  const result: [Meter, number, number][] = []
  for (const [top, bottom, measure_count] of time_signatures) {
    const meter = new Meter(top, bottom, start_pulses)
    result.push([meter, measure_count, start_measure])

    // Count out the specified number of complete measures away from the start time,
    // this is where the next meter will start
    start_pulses = meter.measures_to_pulses(new MeasureNumber(measure_count, 0))
    start_measure += measure_count
  }
  return result
}

function find_meter_by_start_pulse(
  meters: [Meter, number, number][],
  pulses: number,
): [Meter, number] {
  const after_index = meters.findIndex(([meter]) => meter.start_pulse > pulses)

  let meter_index: number
  if (after_index === 0) {
    // pulse is a pickup beat, so use the first meter
    meter_index = 0
  } else if (after_index === -1) {
    // Pulse is after start of last meter, so use that one
    meter_index = meters.length - 1
  } else {
    // Otherwise, we want the meter just before the one we found
    meter_index = after_index - 1
  }

  const [meter, , start_measure] = meters[meter_index]
  return [meter, start_measure]
}

function find_meter_by_start_measure(
  meters: [Meter, number, number][],
  measure: number,
): [Meter, number] {
  const after_index = meters.findIndex(([, , meter_start]) => meter_start > measure)

  let meter_index: number
  if (after_index === 0) {
    meter_index = 0
  } else if (after_index === -1) {
    meter_index = meters.length - 1
  } else {
    meter_index = after_index - 1
  }
  const [meter, , start_measure] = meters[meter_index]
  return [meter, start_measure]
}

export class SongMeter {
  // pairs of (meter, measure_length, start_measure)
  meters: [Meter, number, number][]
  constructor(options: SongMeterOptions) {
    if (options.time_signatures.length < 1) {
      throw new Error('options.time_signatures must have at least one entry')
    }

    this.meters = make_meters(options.pickup_pulses ?? 0, options.time_signatures)
  }

  /**
   * Get pairs of (meter, measure_count). This is mainly used for rendering
   * in SongMeterPrimitive
   */
  get meter_lengths(): [Meter, number][] {
    return this.meters.map(([meter, meter_length]) => [meter, meter_length])
  }

  pulses_to_measures(pulses: number): MeasureNumber {
    const [meter, start_measure] = find_meter_by_start_pulse(this.meters, pulses)
    const { measures, beats } = meter.pulses_to_measures(pulses)
    return new MeasureNumber(start_measure + measures, beats)
  }

  measures_to_pulses(measure_number: MeasureNumber): number {
    const [meter, start_measure] = find_meter_by_start_measure(this.meters, measure_number.measures)

    const local_measures = new MeasureNumber(
      measure_number.measures - start_measure,
      measure_number.beats,
    )

    try {
      return meter.measures_to_pulses(local_measures)
    } catch (e) {
      if (e instanceof Error && e.message.startsWith('invalid measure')) {
        throw new Error(
          `invalid measure ${measure_number.measure_number} for measure in ${meter.time_signature} time`,
        )
      } else {
        throw e
      }
    }
  }
}
