import type { MatcherResult } from 'vitest'
import type { Constructor } from '../types/Constructor.ts'
import type { Equals } from '../types/Equals.ts'
import { format_diff } from './diff_properties.ts'

export function objects_equal<T extends Equals<T>>(
  Type: Constructor<T>,
  received: unknown,
  expected: unknown,
): boolean {
  return received instanceof Type && expected instanceof Type && received.equals(expected)
}

export function make_matcher_result<T extends Equals<T>>(
  Type: Constructor<T>,
  diff_func: (diffs: string[], received: unknown, expected: unknown) => string[],
  received: unknown,
  expected: unknown,
): MatcherResult {
  return {
    pass: objects_equal(Type, received, expected),
    message: () => format_diff(diff_func([], received, expected)),
  }
}
