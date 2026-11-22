import { Rational } from '../math/Rational.ts'
import { PatternGrid } from './PatternGrid.ts'
import { RhythmStep } from './RhythmStep.ts'

/**
 *
 * @param {string} rhythm_str
 * @param {Rational} step_size
 * @returns {PatternGrid<RhythmStep>}
 */
function parse_rhythm(rhythm_str: string, step_size: Rational): PatternGrid<RhythmStep> {
  /**
   * @type {RhythmStep[]}
   */
  const values: RhythmStep[] = []
  for (const c of rhythm_str) {
    if (c === RhythmStep.HIT || c === RhythmStep.REST || c === RhythmStep.SUSTAIN) {
      values.push(c)
    } else if (c === ' ' || c === '|') {
      // treat spaces and | as comments to help make
      // rhythms more readable
      continue
    } else {
      throw new Error(`invalid rhythm, ${rhythm_str}`)
    }
  }
  return new PatternGrid(values, step_size)
}

/**
 * A fancy pattern grid for representing rhythms
 * as strings like
 *
 * x.x.x.x.|xxxxx---
 *
 * if the step-size was 1/8 note, the above represents:
 * Measure 1: 4 eighth notes, one per beat
 * Measure 2: a flurry of 4 eighth notes, plus one half note (4/8 duration)
 */
export class Rhythm {
  pattern: PatternGrid<RhythmStep>

  /**
   * Constructor
   * @param {string | RhythmStep[]} rhythm String of characters from RhythmStep, i.e. x for note onset, - for sustain, . for rest. | and space can be used as separators for readability. It can also be an explicit array of RhythmStep, this is mainly used internally
   * @param {Rational} step_size Duration of each step
   */
  constructor(rhythm: string | RhythmStep[], step_size: Rational) {
    /**
     * @type {PatternGrid<RhythmStep>}
     */
    this.pattern =
      typeof rhythm === 'string'
        ? parse_rhythm(rhythm, step_size)
        : new PatternGrid(rhythm, step_size)
  }

  /**
   * Get the length of the pattern in steps of the underlying pattern grid.
   * @type {number}
   */
  get length_steps() {
    return this.pattern.length
  }

  /**
   * Get the length of the pattern in beats, as in how many note onsets
   * are found in the rhythm.
   * @type {number}
   */
  get length_beats() {
    if (this.pattern.length === 0) {
      return 0
    }

    // Count the number of note onsets - this is the number
    // of beats.
    return this.pattern.values.map((x) => Number(x === RhythmStep.HIT)).reduce((acc, x) => acc + x)
  }

  /**
   * Get the length of the rhythm in time, usually in measures of 4/4
   * @type {Rational}
   */
  get duration() {
    return this.pattern.duration
  }

  get step_size() {
    return this.pattern.step_size
  }

  /**
   * Iterate over a RhythmGrid and return runs of rests/sustained notes.
   * This version returns the durations in steps of the rhythm grid.
   * @returns {Generator<[boolean, number]>} (is_note, duration_steps) pair.
   */
  *beat_iter(): Generator<[boolean, number]> {
    const steps = [...this.pattern]

    if (steps.length === 0) {
      return
    }

    // Scan one run of notes/rests at a time
    let next_index = 0
    do {
      // Notes start with x. a stray sustain at the start is treated
      // as a rest.
      const is_note = steps[next_index] === RhythmStep.HIT
      let length = 1
      for (let j = 1; next_index + j <= steps.length; j++) {
        const lookahead = steps[next_index + j]
        if (
          // The run reaches the end of the array
          lookahead === undefined ||
          // notes continue with sustains, and end at the start
          // of a new note or a rest
          (is_note && lookahead !== RhythmStep.SUSTAIN) ||
          // rests continue through following rests or sustains
          // but end on a new hit
          (!is_note && lookahead === RhythmStep.HIT)
        ) {
          length = j
          break
        }
      }

      yield [is_note, length]

      next_index += length
    } while (next_index < steps.length)
  }

  /**
   * Create an empty rhythm with step size 1 measure
   * @returns {Rhythm}
   */
  static empty(): Rhythm {
    return new Rhythm([], Rational.ONE)
  }

  /**
   * Concatenate several rhythms together
   * @param  {...Rhythm} rhythms Rhythms to concatenate. They must all have the same step size.
   * @returns {Rhythm}
   */
  static concat(...rhythms: Rhythm[]): Rhythm {
    if (rhythms.length === 0) {
      return Rhythm.empty()
    }

    if (rhythms.length === 1) {
      return rhythms[0]
    }

    // step size is checked by PatternGrid.concat
    const pattern = PatternGrid.concat(...rhythms.map((x) => x.pattern))
    return new Rhythm(pattern.values, pattern.step_size)
  }

  static readonly EMPTY = new Rhythm('', Rational.ONE)
}
