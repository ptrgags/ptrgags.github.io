const SEC_PER_MIN = 60
const BEATS_PER_MEASURE = 4

export class Tempo {
  /**
   * Convert time in seconds to quarter notes
   * @param sec Time in seconds
   * @param bpm Beats per minute
   * @returns Number of quarter note beats after time 0 at this tempo
   */
  static sec_to_beats(sec: number, bpm: number): number {
    return (sec / SEC_PER_MIN) * bpm
  }

  /**
   * Convert beats from time 0 to elapsed seconds
   * @param beats Number of beats since the start
   * @param bpm Beats per minute
   * @returns Elapsed seconds that correspond to this beat number
   */
  static beats_to_sec(beats: number, bpm: number): number {
    return (beats / bpm) * SEC_PER_MIN
  }

  /**
   * Convert time in seconds to time in measures of 4/4 time
   * @param sec Time in seconds
   * @param bpm beats per minute
   * @returns Time in measures of 4/4 time
   */
  static sec_to_measures(sec: number, bpm: number): number {
    return this.sec_to_beats(sec, bpm) / BEATS_PER_MEASURE
  }

  /**
   * Convert time in measures to time in seconds for a given constant tempo
   * @param measures Measures of 4/4 time
   * @param bpm beats per minute
   * @returns time in seconds
   */
  static measures_to_sec(measures: number, bpm: number): number {
    const time_beats = measures * BEATS_PER_MEASURE
    return this.beats_to_sec(time_beats, bpm)
  }
}
