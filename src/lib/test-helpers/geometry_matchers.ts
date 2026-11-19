import type { MatcherResult, MatcherState } from 'vitest'
import { custom_equality_matcher } from './matchermaking.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { diff_float_property, diff_property } from './diff_properties.ts'
import { diff_dir } from './pga_matchers.ts'
import { BezierCurve } from '../primitives/BezierCurve.ts'
import { diff_vec2 } from './vec_matchers.ts'

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

export function diff_bezier(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof BezierCurve)) {
    diffs.push(`expected BezierCurve, got ${received}`)
    return diffs
  }

  const expected_vec = expected as BezierCurve

  diff_vec2(diffs, received.a, expected_vec.a)
  diff_vec2(diffs, received.b, expected_vec.b)
  diff_vec2(diffs, received.c, expected_vec.c)
  diff_vec2(diffs, received.d, expected_vec.d)

  return diffs
}

export const GEOMETRY_MATCHERS = {
  toBeRigid(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Rigid, diff_rigid, received, expected)
  },
  toBeBezier(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(BezierCurve, diff_bezier, received, expected)
  },
}
