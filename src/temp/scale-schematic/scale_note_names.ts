import { range } from '../../lib/math/iteration/range.ts'
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
} from '../../lib/music/pitches.ts'
import type { ScaleSymbol } from '../../lib/music/Scale.ts'

const SHARP = '♯'
const DOUBLESHARP = '𝄪'
const NATURAL = ''
const DOUBLEFLAT = '𝄫'
const FLAT = '𝄬'

// Access as ACCIDENTALS[pitch_class][letter]
type AccidentalEntry = { [letter: string]: string }

// All possible accidentals up to double sharps and double flats
const ACCIDENTALS: Record<PitchClass, AccidentalEntry> = {
  [A]: { G: DOUBLESHARP, A: NATURAL, B: DOUBLEFLAT },
  [AS]: { A: SHARP, B: FLAT, C: DOUBLEFLAT },
  [B]: { A: DOUBLESHARP, B: NATURAL, C: FLAT },
  [C]: { B: SHARP, C: NATURAL, D: DOUBLEFLAT },
  [CS]: { B: DOUBLESHARP, C: SHARP, D: FLAT },
  [D]: { C: DOUBLESHARP, D: NATURAL, E: DOUBLEFLAT },
  [DS]: { D: SHARP, E: FLAT, F: DOUBLEFLAT },
  [E]: { D: DOUBLESHARP, E: NATURAL, F: FLAT },
  [F]: { E: SHARP, F: NATURAL, G: DOUBLEFLAT },
  [FS]: { E: DOUBLESHARP, F: SHARP, G: FLAT },
  [G]: { F: DOUBLESHARP, G: NATURAL, A: DOUBLEFLAT },
  // G#/Ab is unusual that it's the only key where only 2 names are used
  // instead of 3
  [GS]: { G: SHARP, A: FLAT },
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

function get_note_name(pitch_class: PitchClass, letter: string): string {
  const accidental = ACCIDENTALS[pitch_class][letter]
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

export function scale_to_note_names(scale: ScaleSymbol): [string, boolean][] {
  const start_letter = STARTING_LETTER[scale.tonic]

  return range(7)
    .map((degree) => {
      const letter_index = (start_letter + degree) % 7
      const letter = NOTE_LETTERS[letter_index]

      const pitch_class = scale.value(degree)

      const note_name = get_note_name(pitch_class, letter)
      const upper_row = is_black_key(pitch_class)
      return [note_name, upper_row] as [string, boolean]
    })
    .toArray()
}
