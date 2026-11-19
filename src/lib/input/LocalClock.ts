import { ObserverSignal, type AnalogSignal } from './Signal.js'

const HOURS_PER_HALF_DAY = 12
const MIN_PER_HOUR = 60
const SEC_PER_MIN = 60

export class LocalClock {
  fixed_date?: Date
  continuous_hour: number = 0
  continuous_minute: number = 0
  continuous_sec: number = 0

  constructor(fixed_date?: Date) {
    this.fixed_date = fixed_date
  }

  update() {
    const date = this.fixed_date ?? new Date()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()

    this.continuous_hour = hour + min / MIN_PER_HOUR + sec / SEC_PER_MIN / MIN_PER_HOUR
    this.continuous_minute = min + sec / SEC_PER_MIN
    this.continuous_sec = sec

    this.continuous_hour %= HOURS_PER_HALF_DAY
    this.continuous_minute %= MIN_PER_HOUR
    this.continuous_sec %= SEC_PER_MIN
  }

  /**
   * Get an analog signal for the hour hand.
   * @returns A signal for the (clockwise) hour hand position, normalized to [0, 1]
   */
  get hour_hand(): AnalogSignal {
    return new ObserverSignal(() => {
      return this.continuous_hour / HOURS_PER_HALF_DAY
    })
  }

  /**
   * Get an an analog signal for the minute hand
   * @returns A signal for the (clockwise) minute hand position, normalized to [0, 1]
   */
  get minute_hand(): AnalogSignal {
    return new ObserverSignal(() => {
      return this.continuous_minute / MIN_PER_HOUR
    })
  }

  /**
   * Get an an analog signal for the second hand
   * @returns A signal for the (clockwise) second hand position, normalized to [0, 1]
   */
  get second_hand(): AnalogSignal {
    return new ObserverSignal(() => {
      return this.continuous_sec / SEC_PER_MIN
    })
  }
}
