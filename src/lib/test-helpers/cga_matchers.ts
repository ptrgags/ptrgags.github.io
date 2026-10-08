import type { MatcherResult, MatcherState } from 'vitest'
import { Even2C } from '../math/cga2d/Even2C.ts'
import { Odd2C } from '../math/cga2d/Odd2C.ts'
import { custom_equality_matcher } from './matchermaking.ts'
import { diff_float_property } from './diff_properties.ts'

const EVEN_PROPERTIES = ['scalar', 'xy', 'xp', 'xm', 'yp', 'ym', 'pm', 'xypm']
function diff_even(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Even2C)) {
    diffs.push(`expected CEven, got${received}`)
    return diffs
  }

  for (const property_name of EVEN_PROPERTIES) {
    diff_float_property(diffs, received, expected, property_name)
  }

  return diffs
}

const ODD_PROPERTIES = ['x', 'y', 'p', 'm', 'xyp', 'xym', 'xpm', 'ypm']

function diff_odd(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Odd2C)) {
    diffs.push(`expected COdd, got ${received}`)
    return diffs
  }

  for (const property_name of ODD_PROPERTIES) {
    diff_float_property(diffs, received, expected, property_name)
  }

  return diffs
}

export const CGA_MATCHERS = {
  toBeEven2C(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Even2C, diff_even, received, expected)
  },
  toBeOdd2C(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Odd2C, diff_odd, received, expected)
  },
}
