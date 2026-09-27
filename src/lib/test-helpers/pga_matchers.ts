import type { Matcher, MatcherResult, MatcherState } from 'vitest'
import { Even2P } from '../math/pga2d/Even2P.ts'
import { Odd2P } from '../math/pga2d/Odd2P.ts'
import { diff_float_property, format_diff } from './diff_properties.ts'
import { objects_equal } from './matchermaking.ts'

export function diff_even(diffs: string[], received: unknown, expected: unknown) {
  if (!(received instanceof Even2P)) {
    diffs.push(`received is not an Even object: ${received}`)
    return diffs
  }

  diff_float_property(diffs, received, expected, 'scalar', 'scalar')
  diff_float_property(diffs, received, expected, 'yo', 'yo')
  diff_float_property(diffs, received, expected, 'xo', 'xo')
  diff_float_property(diffs, received, expected, 'xy', 'xy')

  return diffs
}

export function diff_odd(diffs: string[], received: unknown, expected: unknown) {
  if (!(received instanceof Odd2P)) {
    diffs.push(`received is not an Odd object: ${received}`)
    return diffs
  }

  diff_float_property(diffs, received, expected, 'x', 'x')
  diff_float_property(diffs, received, expected, 'y', 'y')
  diff_float_property(diffs, received, expected, 'o', 'o')
  diff_float_property(diffs, received, expected, 'xyo', 'xyo')

  return diffs
}

export const PGA_MATCHERS = {
  toBeEven2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return {
      pass: objects_equal(Even2P, received, expected),
      message: () => format_diff(diff_even([], received, expected)),
    }
  },
  toBeOdd2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return {
      pass: objects_equal(Odd2P, received, expected),
      message: () => format_diff(diff_odd([], received, expected)),
    }
  },
}
