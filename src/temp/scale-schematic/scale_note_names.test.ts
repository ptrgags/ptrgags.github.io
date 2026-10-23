import { describe, it, expect } from 'vitest'
import { HARMONIC_MINOR_SCALE, MAJOR_SCALE, NATURAL_MINOR_SCALE } from '../../lib/music/scales.ts'
import { A, Ab, C, FS, Gb } from '../../lib/music/pitches.ts'
import { scale_to_note_names } from './scale_note_names.ts'

describe('scale_note_names', () => {
  it('with C major uses only white keys and no accidentals', () => {
    const scale = MAJOR_SCALE.to_symbol(C)

    const result = scale_to_note_names(scale)

    const expected = [
      ['C', false],
      ['D', false],
      ['E', false],
      ['F', false],
      ['G', false],
      ['A', false],
      ['B', false],
    ]
    expect(result).toEqual(expected)
  })

  it('with Ab major uses correct names', () => {
    const scale = MAJOR_SCALE.to_symbol(Ab)

    const result = scale_to_note_names(scale)

    const expected = [
      ['A𝄬', true],
      ['B𝄬', true],
      ['C', false],
      ['D𝄬', true],
      ['E𝄬', true],
      ['F', false],
      ['G', false],
    ]
    expect(result).toEqual(expected)
  })

  it('With A major uses correct sharps', () => {
    const scale = MAJOR_SCALE.to_symbol(A)

    const result = scale_to_note_names(scale)

    const expected = [
      ['A', false],
      ['B', false],
      ['C♯', true],
      ['D', false],
      ['E', false],
      ['F♯', true],
      ['G♯', true],
    ]
    expect(result).toEqual(expected)
  })

  it('with Gb major returns scale with flats', () => {
    const scale = MAJOR_SCALE.to_symbol(Gb)

    const result = scale_to_note_names(scale)

    const expected = [
      ['G𝄬', true],
      ['A𝄬', true],
      ['B𝄬', true],
      ['C𝄬', false], // false because Cb = B!
      ['D𝄬', true],
      ['E𝄬', true],
      ['F', false],
    ]
    expect(result).toEqual(expected)
  })

  it('with F# major returns Gb names instead', () => {
    // This is the one ambiguity that the implementation has.
    const scale = MAJOR_SCALE.to_symbol(FS)

    const result = scale_to_note_names(scale)

    const expected = [
      ['G𝄬', true],
      ['A𝄬', true],
      ['B𝄬', true],
      ['C𝄬', false],
      ['D𝄬', true],
      ['E𝄬', true],
      ['F', false],
    ]
    expect(result).toEqual(expected)
  })

  it('with A minor returns the alphabet', () => {
    const scale = NATURAL_MINOR_SCALE.to_symbol(A)

    const result = scale_to_note_names(scale)

    const expected = [
      ['A', false],
      ['B', false],
      ['C', false],
      ['D', false],
      ['E', false],
      ['F', false],
      ['G', false],
    ]
    expect(result).toEqual(expected)
  })

  it('with A harmonic major includes G#', () => {
    const scale = HARMONIC_MINOR_SCALE.to_symbol(A)

    const result = scale_to_note_names(scale)

    const expected = [
      ['A', false],
      ['B', false],
      ['C', false],
      ['D', false],
      ['E', false],
      ['F', false],
      ['G♯', true],
    ]
    expect(result).toEqual(expected)
  })
})
