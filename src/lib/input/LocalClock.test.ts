import { describe, it, expect } from 'vitest'
import { LocalClock } from './LocalClock.js'

const TEST_TIME = new Date(2026, 7, 9, 13, 10, 30, 100)

/**
 * Make a clock and call update() on it so we can get straight to testing the signals
 */
function make_clock(): LocalClock {
  const clock = new LocalClock(TEST_TIME)
  clock.update()
  return clock
}

describe('AnalogClock', () => {
  describe('hand signals', () => {
    it('hour_hand computes continuous 12-hour value', () => {
      const clock = make_clock()
      const hour = clock.hour_hand

      const result = hour.value

      // (1 + 10/60 + 30/3600) / 12
      const expected = 0.0979
      expect(result).toBeCloseTo(expected)
    })

    it('minute_hand computes continuous value', () => {
      const clock = make_clock()
      const min = clock.minute_hand

      const result = min.value

      // (10 + 30/60) / 60
      // = (10 + 1/2) / 60
      // = 10/60 + 1/120
      // = 1/6 + 1/120
      // = 21/120
      // = 7/40
      const expected = 0.175
      expect(result).toBe(expected)
    })

    it('second_hand computes continuous value', () => {
      const clock = make_clock()
      const sec = clock.second_hand

      const result = sec.value

      // 30 / 60 = 0.5
      const expected = 0.5
      expect(result).toBe(expected)
    })
  })
})
