import { mod } from '../../lib/math/mod.ts'

export interface MeterOffset {
  measures: number
  subdivisions: number
}

export class Meter {
  readonly subdivisions_per_measure: number
  readonly subdivision: number
  readonly start_beat: number
  readonly measure_length_beats: number

  constructor(subdivisions_per_measure: number, subdivision: number, start_beat: number) {
    this.subdivisions_per_measure = subdivisions_per_measure
    this.subdivision = subdivision
    this.measure_length_beats = (4 * subdivisions_per_measure) / subdivision
    this.start_beat = start_beat
  }

  /**
   * Convert beats to offset
   * @param beats Beat number relative to the common 4/4 pulse
   * @returns Offset in (measures, subdivision)
   */
  beats_to_offset(beats: number): MeterOffset {
    const from_start = beats - this.start_beat
    const measures = Math.floor(from_start / this.measure_length_beats)
    const remaining_beats = mod(from_start, this.measure_length_beats)
    // `remaining_beats` is in 4/4 time, but we're in A/B time. The scale factor
    // is B/4
    const subdivisions = (remaining_beats * this.subdivision) / 4

    return { measures, subdivisions }
  }

  /**
   * Convert an offset from the start of the meter to a beat number
   * @param offset (measures, subdivision)
   * @returns The beat number relative to the common 4/4 pulse
   */
  offset_to_beats(offset: MeterOffset): number {
    const { measures, subdivisions } = offset
    const beats = (subdivisions * 4) / this.subdivision
    return this.start_beat + this.measure_length_beats * measures + beats
  }
}
