import { mod } from '../../lib/math/mod.ts'
import { MeasureNumber } from './MeasureNumber.ts'

export class Meter {
  /**
   * Top number: how many subdivisions are grouped into a measure
   */
  readonly top: number
  /**
   * Bottom number: what note duration is considered the "beat". E.g. 4 means quarter notes, 8 means eighth notes
   */
  readonly bottom: number
  /**
   * What quarter note pulse is the start time for this meter
   */
  readonly start_pulse: number
  /**
   * How long is 1 measure in quarter note pulses
   */
  readonly measure_length_pulses: number

  constructor(top: number, bottom: number, start_pulse: number) {
    this.top = top
    this.bottom = bottom
    this.measure_length_pulses = (4 * top) / bottom
    this.start_pulse = start_pulse
  }

  /**
   * @returns top/bottom
   */
  get time_signature(): string {
    return `${this.top}/${this.bottom}`
  }

  /**
   * Convert quarter notes pulses to measure number
   * @param pulses Beat number relative to the common 4/4 pulse
   * @returns Offset as a measure number object
   */
  pulses_to_measures(pulses: number): MeasureNumber {
    const from_start = pulses - this.start_pulse
    const measures = Math.floor(from_start / this.measure_length_pulses)
    const remaining_pulses = mod(from_start, this.measure_length_pulses)
    // `remaining_pulses` is in 4/4 time, but we're in A/B time. The scale factor
    // is B/4
    const beats = (remaining_pulses * this.bottom) / 4

    return new MeasureNumber(measures, beats)
  }

  /**
   * Convert an offset from the start of the meter to a beat number.
   *
   * @param offset (measures, subdivision)
   * @returns The number of quarter note pulses corresponding to the measure number
   * @throws if offset is invalid for this meter's time signature
   */
  measures_to_pulses(offset: MeasureNumber): number {
    if (offset.beats >= this.top) {
      throw new Error(
        `invalid measure ${offset.measures + 1}.${Math.floor(offset.beats) + 1} for meter in ${this.time_signature} time`,
      )
    }

    const { measures, beats } = offset
    const remaining_pulses = (beats * 4) / this.bottom
    const from_start = this.measure_length_pulses * measures + remaining_pulses
    return this.start_pulse + from_start
  }
}
