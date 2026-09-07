import { mod } from '../../lib/math/mod.ts'

export interface MeterOffset {
  measures: number
  beats: number
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

  beats_to_offset(beats: number): MeterOffset {
    const from_start = beats - this.start_beat
    const measures = Math.floor(from_start / this.measure_length_beats)
    const remaining_beats = mod(from_start, this.measure_length_beats)
    return { measures, beats: remaining_beats }
  }

  offset_to_beats(offset: MeterOffset): number {
    const { measures, beats } = offset
    return this.measure_length_beats * measures + beats
  }
}
