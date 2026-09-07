import type { ClockSource } from './Clock.ts'

/**
 * For unit testing, StubClockSource allows you to deterministically
 * determine the times
 * @private
 * @example
 * const clock_source = new StubClockSource([0, 16, 32]);
 * clock_source.now() // returns 0
 * clock_source.now() // returns 16
 * clock_source.now() // returns 32
 */
export class StubClockSource implements ClockSource {
  private times: number[]
  private cursor: number

  /**
   * Constructor
   * @param times_ms Times to provide to the clock in order
   */
  constructor(times_ms: number[]) {
    this.times = times_ms
    this.cursor = 0
  }

  now(): number {
    const val = this.times[this.cursor]
    this.cursor++

    if (val === undefined) {
      throw new Error('not enough time values provided')
    }
    return val
  }
}
