import { describe, it, expect } from 'vitest'
import { Meter } from './Meter.ts'

describe('Meter', () => {
  describe('beats_to_offset', () => {
    it('with 4/4 and start beats returns zero offset', () => {
      const start_beat = 5
      const meter = new Meter(4, 4, start_beat)

      const result = meter.beats_to_offset(start_beat)

      const expected = {
        measures: 0,
        beats: 0,
      }
      expect(result).toEqual(expected)
    })

    it('with 4/4 and beat after start time returns correct offset', () => {
      const meter = new Meter(4, 4, 5)

      const result = meter.beats_to_offset(20)

      const expected = {
        measures: 3,
        beats: 3,
      }
      expect(result).toEqual(expected)
    })

    it('with 4/4 and beat before start time returns correct negative offset', () => {
      const meter = new Meter(4, 4, 5)

      const result = meter.beats_to_offset(2)

      // Beat 2 is 3 beats before beat 5, so it should be an offset of
      // -1 measure, +1 beat
      const expected = {
        measures: -1,
        beats: 1,
      }
      expect(result).toEqual(expected)
    })

    it('with 3/4 computes the correct offset', () => {
      const meter = new Meter(3, 4, 5)

      const result = meter.beats_to_offset(20)

      const expected = {
        measures: 5,
        beats: 0,
      }
      expect(result).toEqual(expected)
    })

    it('with 7/8 time computes correct offset', () => {
      const meter = new Meter(7, 8, 5)

      const result = meter.beats_to_offset(10.5)

      // 10.5 is +5.5 beats relative to the start of the meter
      // 5.5 quarter notes is 11 eighth notes
      // 11 // 7 = 1
      // 11 % 7 = 4
      const expected = {
        measures: 1,
        beats: 4,
      }
      expect(result).toEqual(expected)
    })
  })

  describe('offset_to_beats', () => {})
})
