import type { MatcherResult } from 'vitest'
import { is_vec2 } from '../primitives/Vec2.ts'
import { diff_float_property } from './diff_properties.ts'

export function diff_vec2(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!is_vec2(received)) {
    diffs.push(`expected Vec2, got ${received}`)
    return diffs
  }

  diffs.push(`${received} | ${expected}`)

  diff_float_property(diffs, received, expected, 'x')
  diff_float_property(diffs, received, expected, 'y')

  return diffs
}
