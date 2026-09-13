import { describe, it, expect } from 'vitest'
import { Tempo } from './Tempo.js'

describe('Tempo', () => {
  it('at 120 BPM, 1 second is 2 beats', () => {
    const result = Tempo.sec_to_beats(1, 120)

    const expected = 2
    expect(result).toEqual(expected)
  })

  it('at 120 BPM, 1 second is half a measure', () => {
    const sec = 1
    const bpm = 120

    const result = Tempo.sec_to_measures(sec, bpm)

    const expected = 0.5
    expect(result).toEqual(expected)
  })

  it('at 240 BPM, 1 second is 4 beats', () => {
    const result = Tempo.sec_to_beats(1, 240)

    const expected = 4
    expect(result).toEqual(expected)
  })

  it('at 240 BPM, 1 second is one measure', () => {
    const sec = 1
    const bpm = 240

    const result = Tempo.sec_to_measures(sec, bpm)

    const expected = 1
    expect(result).toEqual(expected)
  })

  it('at 120 BPM, 4 beats is 2 seconds', () => {
    const result = Tempo.beats_to_sec(4, 120)

    const expected = 2
    expect(result).toEqual(expected)
  })

  it('at 120 BPM, 1 measure is 2 seconds', () => {
    const measures = 1
    const bpm = 120

    const result = Tempo.measures_to_sec(measures, bpm)

    const expected = 2
    expect(result).toEqual(expected)
  })

  it('at 240 BPM, 4 beats is 1 second', () => {
    const result = Tempo.beats_to_sec(4, 240)

    const expected = 1
    expect(result).toEqual(expected)
  })

  it('at 240 BPM, 1 measure is 1 second', () => {
    const measures = 1
    const bpm = 240

    const result = Tempo.measures_to_sec(measures, bpm)

    const expected = 1
    expect(result).toEqual(expected)
  })

  it('sec_to_measures and measures_to_sec are inverses', () => {
    const sec = 60
    const measures = 32
    const bpm = 128

    // check both left and right inverses
    const measures_sec = Tempo.sec_to_measures(Tempo.measures_to_sec(measures, bpm), bpm)
    const sec_measures = Tempo.measures_to_sec(Tempo.sec_to_measures(sec, bpm), bpm)

    expect(measures_sec).toBe(measures)
    expect(sec_measures).toBe(sec)
  })

  it('beats_to_sec and sec_to_beats are inverses', () => {
    const bpm = 128
    const sec = 30
    const beats = 8

    const beats_sec = Tempo.sec_to_beats(Tempo.beats_to_sec(beats, bpm), bpm)
    const sec_beats = Tempo.beats_to_sec(Tempo.sec_to_beats(sec, bpm), bpm)

    expect(beats_sec).toBe(beats)
    expect(sec_beats).toBe(sec)
  })
})
