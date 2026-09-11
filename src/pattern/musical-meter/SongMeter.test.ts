import { describe, it, expect } from 'vitest'
import { SongMeter } from './SongMeter.ts'
import { MeasureNumber } from './MeasureNumber.ts'

function make_meter(): SongMeter {
  return new SongMeter({
    pickup_beats: 2,
    time_signatures: [
      // measures 1-4 = pulses 2-18
      //    index 0-3          1-17
      [4, 4, 4],
      // measures 5-10 = pulses 19-36
      //    index 4-9           18-35
      [3, 4, 6],
      // measures 11-14 = pulses 37-48
      //          10-13          36-47
      [6, 8, 4],
      // measures 15-22 = pulses 49-88
      //          14-21          48-87
      [5, 4, 8],
    ],
  })
}

describe('SongMeter', () => {
  describe('beats_to_measures', () => {
    it('with beat before start returns pickup measure', () => {
      const meter = make_meter()

      const result = meter.beats_to_measures(1)

      // 1 beat before the start, which is beat 3 of a 4/4 pickup measure
      const expected = new MeasureNumber(-1, 3)
      expect(result).toEqual(expected)
    })

    it('with beat in first measure returns correct measure number', () => {
      const meter = make_meter()

      const result = meter.beats_to_measures(5)

      const expected = new MeasureNumber(1, 3)
      expect(result).toEqual(expected)
    })

    it('with beat after time signature change returns correct measure number', () => {
      const meter = make_meter()

      const result = meter.beats_to_measures(25)

      const expected = new MeasureNumber(4, 3)
      expect(result).toEqual(expected)
    })

    it('with beat in 6/8 measure returns correct measure number', () => {
      const meter = make_meter()

      const result = meter.beats_to_measures(40)

      const expected = new MeasureNumber(12, 0)
      expect(result).toEqual(expected)
    })

    it('with beat after end returns correct measure number relative to last time signature', () => {
      const meter = make_meter()

      const result = meter.beats_to_measures(90)

      // the last time signature was 5/4
      const expected = new MeasureNumber(22, 3)
      expect(result).toEqual(expected)
    })
  })
  describe('measures_to_beats', () => {
    it('with invalid 3/4 measure number throws error', () => {
      const meter = make_meter()

      expect(() => {
        // The selected measure is in 3/4 time so it can't have a beat 4!
        return meter.measures_to_beats(new MeasureNumber(6, 3))
      }).toThrow('invalid measure number 7.4')
    })

    it('with pickup measure returns correct beat number', () => {
      const meter = make_meter()

      const result = meter.measures_to_beats(new MeasureNumber(-1, 3))

      const expected = 1
      expect(result).toEqual(expected)
    })

    it('with beat in first measure returns correct beat number', () => {
      const meter = make_meter()

      const result = meter.measures_to_beats(new MeasureNumber(1, 3))

      const expected = 5
      expect(result).toEqual(expected)
    })

    it('with beat after time signature change returns correct beat number', () => {
      const meter = make_meter()

      const result = meter.measures_to_beats(new MeasureNumber(4, 3))

      const expected = 25
      expect(result).toEqual(expected)
    })

    it('with beat in 6/8 measure returns correct measure number', () => {
      const meter = make_meter()

      const result = meter.measures_to_beats(new MeasureNumber(12, 0))

      const expected = 40
      expect(result).toEqual(expected)
    })

    it('with measure after end returns correct beat number', () => {
      const meter = make_meter()

      const result = meter.measures_to_beats(new MeasureNumber(22, 3))

      const expected = 90
      expect(result).toEqual(expected)
    })
  })
})
