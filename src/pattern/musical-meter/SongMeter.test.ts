import { describe, it, expect } from 'vitest'
import { SongMeter } from './SongMeter.ts'
import { MeasureNumber } from './MeasureNumber.ts'

function make_meter(): SongMeter {
  return new SongMeter({
    pickup_beats: 2,
    // Start times in measures from start
    // 4/4: 0
    // 3/4: 4 = 0 + 4
    // 6/8: 10 = 4 + 6
    // 5/4: 14 = 10 + 4
    // Start times in pulses
    // 4/4: 2 (because of pickup pulses)
    // 3/4: 18 = 2 + 4(4)
    // 6/8: 36 = 18 + 6(3/4*4)
    // 5/4: 48 = 36 + 4(6/8*4)
    time_signatures: [
      [4, 4, 4],
      [3, 4, 6],
      [6, 8, 4],
      [5, 4, 8],
    ],
  })
}

describe('SongMeter', () => {
  it('with no time signatures throws error', () => {
    expect(() => {
      return new SongMeter({ time_signatures: [] })
    }).toThrow('options.time_signatures must have at least one entry')
  })

  describe('pulses_to_measures', () => {
    it('with pulse before start returns pickup measure', () => {
      const meter = make_meter()

      const result = meter.pulses_to_measures(1)

      // 1 beat before the start, which is beat 3 of a 4/4 pickup measure
      const expected = new MeasureNumber(-1, 3)
      expect(result).toEqual(expected)
    })

    it('with beat in first measure returns correct measure number', () => {
      const meter = make_meter()

      const result = meter.pulses_to_measures(5)

      const expected = new MeasureNumber(0, 3)
      expect(result).toEqual(expected)
    })

    it('with beat after time signature change returns correct measure number', () => {
      const meter = make_meter()

      const result = meter.pulses_to_measures(25)

      const expected = new MeasureNumber(6, 1)
      expect(result).toEqual(expected)
    })

    it('with beat in 6/8 measure returns correct measure number', () => {
      const meter = make_meter()

      const result = meter.pulses_to_measures(40)

      // the 6/8 section is labeled measure 10, and starts at pulse 36
      // pulse 40 is 4 quarter notes later, or 8 eighth notes later.
      // this is 1 measure and 2 eighth notes into the 6/8 section
      const expected = new MeasureNumber(11, 2)
      expect(result).toEqual(expected)
    })

    it('with beat after end returns correct measure number relative to last time signature', () => {
      const meter = make_meter()

      const result = meter.pulses_to_measures(90)

      // the last section stats with measure 14 at pulse 48
      // 90-48 = 42 pulses later
      // in 5/4 that's 8 measures and 2 beats
      // so (14 + 8, 2) = (22, 2)
      const expected = new MeasureNumber(22, 2)
      expect(result).toEqual(expected)
    })
  })

  describe('measures_to_pulses', () => {
    it('with invalid 3/4 measure number throws error', () => {
      const meter = make_meter()

      expect(() => {
        // The selected measure is in 3/4 time so it can't have a beat 4!
        return meter.measures_to_pulses(new MeasureNumber(6, 3))
      }).toThrow('invalid measure 7.4 for measure in 3/4 time')
    })

    it('with pickup measure returns correct beat number', () => {
      const meter = make_meter()

      const result = meter.measures_to_pulses(new MeasureNumber(-1, 3))

      const expected = 1
      expect(result).toEqual(expected)
    })

    it('with beat in first measure returns correct beat number', () => {
      const meter = make_meter()

      const result = meter.measures_to_pulses(new MeasureNumber(0, 3))

      const expected = 5
      expect(result).toEqual(expected)
    })

    it('with beat after time signature change returns correct beat number', () => {
      const meter = make_meter()

      const result = meter.measures_to_pulses(new MeasureNumber(6, 1))

      const expected = 25
      expect(result).toEqual(expected)
    })

    it('with beat in 6/8 measure returns correct measure number', () => {
      const meter = make_meter()

      const result = meter.measures_to_pulses(new MeasureNumber(11, 2))

      const expected = 40
      expect(result).toEqual(expected)
    })

    it('with measure after end returns correct beat number', () => {
      const meter = make_meter()

      const result = meter.measures_to_pulses(new MeasureNumber(22, 2))

      const expected = 90
      expect(result).toEqual(expected)
    })
  })
})
