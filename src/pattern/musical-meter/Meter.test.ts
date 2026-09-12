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
        subdivisions: 0,
      }
      expect(result).toEqual(expected)
    })

    it('with 4/4 and beat after start time returns correct offset', () => {
      const meter = new Meter(4, 4, 5)

      const result = meter.beats_to_offset(20)

      const expected = {
        measures: 3,
        subdivisions: 3,
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
        subdivisions: 1,
      }
      expect(result).toEqual(expected)
    })

    it('with 3/4 computes the correct offset', () => {
      const meter = new Meter(3, 4, 5)

      const result = meter.beats_to_offset(20)

      const expected = {
        measures: 5,
        subdivisions: 0,
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
        subdivisions: 4,
      }
      expect(result).toEqual(expected)
    })
  })

  describe('offset_to_beats', () => {
    it('with invalid measure number  throws error', () => {
      const meter = new Meter(3, 4, 5)

      expect(() => {
        return meter.offset_to_beats({ measures: 1, subdivisions: 3 })
      }).toThrow('invalid measure 2.4 for meter in 3/4 time')
    })

    it('with 4/4 and 0 offset returns start beat', () => {
      const start_beat = 5
      const meter = new Meter(4, 4, start_beat)

      const result = meter.offset_to_beats({ measures: 0, subdivisions: 0 })

      const expected = start_beat
      expect(result).toEqual(expected)
    })

    it('with 4/4 and offset after start time returns correct beat', () => {
      const meter = new Meter(4, 4, 5)

      const result = meter.offset_to_beats({ measures: 3, subdivisions: 3 })

      const expected = 20
      expect(result).toEqual(expected)
    })

    it('with 4/4 and offset before start returns correct beat', () => {
      const meter = new Meter(4, 4, 5)

      const result = meter.offset_to_beats({ measures: -1, subdivisions: 1 })

      const expected = 2
      expect(result).toEqual(expected)
    })

    it('with 3/4 time computes correct beat', () => {
      const meter = new Meter(3, 4, 5)

      const result = meter.offset_to_beats({ measures: 5, subdivisions: 0 })

      const expected = 20
      expect(result).toEqual(expected)
    })

    it('with 7/8 time computes correct beat', () => {
      const meter = new Meter(7, 8, 5)

      const result = meter.offset_to_beats({ measures: 1, subdivisions: 4 })

      const expected = 10.5
      expect(result).toEqual(expected)
    })
  })
})
