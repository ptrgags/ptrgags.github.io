import { describe, it, expect } from 'vitest'
import { Meter } from './Meter.ts'
import { MeasureNumber } from './MeasureNumber.ts'

describe('Meter', () => {
  describe('beats_to_offset', () => {
    it('with 4/4 and start beats returns zero offset', () => {
      const start_beat = 5
      const meter = new Meter(4, 4, start_beat)

      const result = meter.pulses_to_measures(start_beat)

      const expected = new MeasureNumber(0, 0)
      expect(result).toEqual(expected)
    })

    it('with 4/4 and beat after start time returns correct offset', () => {
      const meter = new Meter(4, 4, 5)

      const result = meter.pulses_to_measures(20)

      const expected = new MeasureNumber(3, 3)
      expect(result).toEqual(expected)
    })

    it('with 4/4 and beat before start time returns correct negative offset', () => {
      const meter = new Meter(4, 4, 5)

      const result = meter.pulses_to_measures(2)

      // Beat 2 is 3 beats before beat 5, so it should be an offset of
      // -1 measure, +1 beat
      const expected = new MeasureNumber(-1, 1)
      expect(result).toEqual(expected)
    })

    it('with 3/4 computes the correct offset', () => {
      const meter = new Meter(3, 4, 5)

      const result = meter.pulses_to_measures(20)

      const expected = new MeasureNumber(5, 0)
      expect(result).toEqual(expected)
    })

    it('with 7/8 time computes correct offset', () => {
      const meter = new Meter(7, 8, 5)

      const result = meter.pulses_to_measures(10.5)

      // 10.5 is +5.5 beats relative to the start of the meter
      // 5.5 quarter notes is 11 eighth notes
      // 11 // 7 = 1
      // 11 % 7 = 4
      const expected = new MeasureNumber(1, 4)
      expect(result).toEqual(expected)
    })
  })

  describe('offset_to_beats', () => {
    it('with invalid measure number  throws error', () => {
      const meter = new Meter(3, 4, 5)

      expect(() => {
        return meter.measures_to_pulses(new MeasureNumber(1, 3))
      }).toThrow('invalid measure 2.4 for meter in 3/4 time')
    })

    it('with 4/4 and 0 offset returns start beat', () => {
      const start_beat = 5
      const meter = new Meter(4, 4, start_beat)

      const result = meter.measures_to_pulses(new MeasureNumber(0, 0))

      const expected = start_beat
      expect(result).toEqual(expected)
    })

    it('with 4/4 and offset after start time returns correct beat', () => {
      const meter = new Meter(4, 4, 5)

      const result = meter.measures_to_pulses(new MeasureNumber(3, 3))

      const expected = 20
      expect(result).toEqual(expected)
    })

    it('with 4/4 and offset before start returns correct beat', () => {
      const meter = new Meter(4, 4, 5)

      const result = meter.measures_to_pulses(new MeasureNumber(-1, 1))

      const expected = 2
      expect(result).toEqual(expected)
    })

    it('with 3/4 time computes correct beat', () => {
      const meter = new Meter(3, 4, 5)

      const result = meter.measures_to_pulses(new MeasureNumber(5, 0))

      const expected = 20
      expect(result).toEqual(expected)
    })

    it('with 7/8 time computes correct beat', () => {
      const meter = new Meter(7, 8, 5)

      const result = meter.measures_to_pulses(new MeasureNumber(1, 4))

      const expected = 10.5
      expect(result).toEqual(expected)
    })
  })
})
