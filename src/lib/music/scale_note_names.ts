import { range } from '../math/iteration/range.ts'
import {
  A,
  Ab,
  AS,
  B,
  Bb,
  C,
  CS,
  D,
  Db,
  DS,
  E,
  Eb,
  F,
  FS,
  G,
  Gb,
  GS,
  type PitchClass,
} from './pitches.ts'
import type { ScaleSymbol } from './Scale.ts'

const ASCII_SHARP = '#'
const ASCII_DOUBLESHARP = 'x'
const ASCII_NATURAL = ''
const ASCII_DOUBLEFLAT = 'bb'
const ASCII_FLAT = 'b'

const UNICODE_SHARP = '♯'
const UNICODE_DOUBLESHARP = '𝄪'
const UNICODE_NATURAL = ''
const UNICODE_DOUBLEFLAT = '𝄫'
const UNICODE_FLAT = '𝄬'

// Access as ACCIDENTALS[pitch_class][letter]
type AccidentalEntry = { [letter: string]: string }

// All possible accidentals up to double sharps and double flats
const ASCII_ACCIDENTALS: Record<PitchClass, AccidentalEntry> = {
  [A]: { G: ASCII_DOUBLESHARP, A: ASCII_NATURAL, B: ASCII_DOUBLEFLAT },
  [AS]: { A: ASCII_SHARP, B: ASCII_FLAT, C: ASCII_DOUBLEFLAT },
  [B]: { A: ASCII_DOUBLESHARP, B: ASCII_NATURAL, C: ASCII_FLAT },
  [C]: { B: ASCII_SHARP, C: ASCII_NATURAL, D: ASCII_DOUBLEFLAT },
  [CS]: { B: ASCII_DOUBLESHARP, C: ASCII_SHARP, D: ASCII_FLAT },
  [D]: { C: ASCII_DOUBLESHARP, D: ASCII_NATURAL, E: ASCII_DOUBLEFLAT },
  [DS]: { D: ASCII_SHARP, E: ASCII_FLAT, F: ASCII_DOUBLEFLAT },
  [E]: { D: ASCII_DOUBLESHARP, E: ASCII_NATURAL, F: ASCII_FLAT },
  [F]: { E: ASCII_SHARP, F: ASCII_NATURAL, G: ASCII_DOUBLEFLAT },
  [FS]: { E: ASCII_DOUBLESHARP, F: ASCII_SHARP, G: ASCII_FLAT },
  [G]: { F: ASCII_DOUBLESHARP, G: ASCII_NATURAL, A: ASCII_DOUBLEFLAT },
  // G#/Ab is unusual that it's the only key where only 2 names are used
  // instead of 3
  [GS]: { G: ASCII_SHARP, A: ASCII_FLAT },
}

// All possible accidentals up to double sharps and double flats
const UNICODE_ACCIDENTALS: Record<PitchClass, AccidentalEntry> = {
  [A]: { G: UNICODE_DOUBLESHARP, A: UNICODE_NATURAL, B: UNICODE_DOUBLEFLAT },
  [AS]: { A: UNICODE_SHARP, B: UNICODE_FLAT, C: UNICODE_DOUBLEFLAT },
  [B]: { A: UNICODE_DOUBLESHARP, B: UNICODE_NATURAL, C: UNICODE_FLAT },
  [C]: { B: UNICODE_SHARP, C: UNICODE_NATURAL, D: UNICODE_DOUBLEFLAT },
  [CS]: { B: UNICODE_DOUBLESHARP, C: UNICODE_SHARP, D: UNICODE_FLAT },
  [D]: { C: UNICODE_DOUBLESHARP, D: UNICODE_NATURAL, E: UNICODE_DOUBLEFLAT },
  [DS]: { D: UNICODE_SHARP, E: UNICODE_FLAT, F: UNICODE_DOUBLEFLAT },
  [E]: { D: UNICODE_DOUBLESHARP, E: UNICODE_NATURAL, F: UNICODE_FLAT },
  [F]: { E: UNICODE_SHARP, F: UNICODE_NATURAL, G: UNICODE_DOUBLEFLAT },
  [FS]: { E: UNICODE_DOUBLESHARP, F: UNICODE_SHARP, G: UNICODE_FLAT },
  [G]: { F: UNICODE_DOUBLESHARP, G: UNICODE_NATURAL, A: UNICODE_DOUBLEFLAT },
  // G#/Ab is unusual that it's the only key where only 2 names are used
  // instead of 3
  [GS]: { G: UNICODE_SHARP, A: UNICODE_FLAT },
}

export enum AccidentalEncoding {
  ASCII,
  UNICODE,
}

function is_black_key(pitch_class: PitchClass): boolean {
  switch (pitch_class) {
    case A:
    case B:
    case C:
    case D:
    case E:
    case F:
    case G:
      return false
    case AS:
    case CS:
    case DS:
    case FS:
    case GS:
      return true
  }
}

export function get_note_name(
  pitch_class: PitchClass,
  letter: string,
  accidental_encoding: AccidentalEncoding,
): string {
  const lut =
    accidental_encoding === AccidentalEncoding.UNICODE ? UNICODE_ACCIDENTALS : ASCII_ACCIDENTALS
  const accidental = lut[pitch_class][letter]
  return `${letter}${accidental}`
}

const NOTE_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

const STARTING_LETTER: Record<PitchClass, number> = {
  [A]: 0,
  [B]: 1,
  [C]: 2,
  [D]: 3,
  [E]: 4,
  [F]: 5,
  [G]: 6,
  // Keys are usually named for a note without accidental or with a flat.
  // One exception is F# major, but that can be written Gb major
  [Ab]: 0,
  [Bb]: 1,
  [Db]: 3,
  [Eb]: 4,
  [Gb]: 6,
}

export function scale_to_note_names(
  scale: ScaleSymbol,
  accidental_encoding: AccidentalEncoding,
): [string, boolean][] {
  const start_letter = STARTING_LETTER[scale.tonic]

  return range(7)
    .map((degree) => {
      const letter_index = (start_letter + degree) % 7
      const letter = NOTE_LETTERS[letter_index]

      const pitch_class = scale.value(degree)

      const note_name = get_note_name(pitch_class, letter, accidental_encoding)
      const upper_row = is_black_key(pitch_class)
      return [note_name, upper_row] as [string, boolean]
    })
    .toArray()
}
