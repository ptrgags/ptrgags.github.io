const MS_PER_SEC = 1000

/**
 * Source of elapsed time in milliseconds, usually performance is used, but
 * unit tests will do something different
 */
export interface ClockSource {
  now(): number
}

/**
 * Elapsed time clock.
 */
export class Clock {
  private clock_source: ClockSource
  private start_time: number

  /**
   * Constructor
   * @param clock_source a source of time in milliseconds. Usually performance is used, but for unit tests StubClockSource can be used
   */
  constructor(clock_source: ClockSource = performance) {
    this.clock_source = clock_source
    this.start_time = clock_source.now()
  }

  /**
   * Reset the clock with the current time
   */
  reset() {
    this.start_time = this.clock_source.now()
  }

  /**
   * Get the elapsed time since construction or last reset in seconds
   */
  get elapsed_time(): number {
    const now = this.clock_source.now()
    const time_ms = now - this.start_time

    return time_ms / MS_PER_SEC
  }
}
