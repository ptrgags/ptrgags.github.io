import type { MatcherResult, MatcherState } from 'vitest'
import { custom_equality_matcher } from './matchermaking'
import { Complex } from '../math/complex/Complex'
import { diff_float_property } from './diff_properties'

function diff_complex(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Complex)) {
    diffs.push(`received is not a Complex object: ${received}`)
    return diffs
  }

  diffs.push(`${received} | ${expected}`)

  diff_float_property(diffs, received, expected, 'real')
  diff_float_property(diffs, received, expected, 'imag')

  return diffs
}

export const COMPLEX_MATCHERS = {
  toBeComplex(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Complex, diff_complex, received, expected)
  },
}
