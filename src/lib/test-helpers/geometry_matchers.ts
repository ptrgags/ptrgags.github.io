import type { MatcherResult, MatcherState } from 'vitest'
import { custom_equality_matcher } from './matchermaking.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { diff_float_property } from './diff_properties.ts'

export function diff_rigid(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Rigid)) {
    diffs.push(`expected Rigid, got ${received}`)
    return diffs
  }

  diff_float_property(diffs, received, expected, 'rotation')
  diff_property(diffs, received, expected, 'flip')
  diff_dir(diffs, received.translation, (expected as Rigid).translation)

  return diffs
}

export const GEOMETRY_MATCHERS = {
  toBeRigid(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Rigid, diff_rigid, received, expected)
  },
}
