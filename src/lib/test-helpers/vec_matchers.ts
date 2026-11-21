import type { MatcherResult, MatcherState } from 'vitest'
import { is_vec2, VSVec2, type Vec2 } from '../primitives/Vec2.ts'
import { diff_float_property, format_diff } from './diff_properties.ts'
import { is_vec3, type Vec3 } from '../math/vector/Vec3.ts'

export function diff_vec2(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!is_vec2(received)) {
    diffs.push(`received is not a vec2: ${received}`)
  }

  diff_float_property(diffs, received, expected, 'x')
  diff_float_property(diffs, received, expected, 'y')

  return diffs
}

export function diff_vec3(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!is_vec3(received)) {
    diffs.push(`received is not a vec3: ${received}`)
    return diffs
  }
  diff_float_property(diffs, received, expected, 'x')
  diff_float_property(diffs, received, expected, 'y')
  diff_float_property(diffs, received, expected, 'z')

  return diffs
}

export const VECTOR_MATCHERS = {
  toBeVec2(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return {
      pass: VSVec2.equals(received as Vec2, expected as Vec2),
      message: () => format_diff(diff_vec2([], received, expected)),
    }
  },
  toBeVec3(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return {
      pass: VSVec2.equals(received as Vec3, expected as Vec3),
      message: () => format_diff(diff_vec3([], received, expected)),
    }
  },
}
