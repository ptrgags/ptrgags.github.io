import type { Matcher, MatcherResult, MatcherState } from 'vitest'
import { Even2P } from '../math/pga2d/Even2P.ts'
import { Odd2P } from '../math/pga2d/Odd2P.ts'
import { diff_float_property, diff_property } from './diff_properties.ts'
import { custom_equality_matcher } from './matchermaking.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { Line2P } from '../math/pga2d/Line2P.ts'

function diff_even(diffs: string[], received: unknown, expected: unknown): string[] {
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

function diff_odd(diffs: string[], received: unknown, expected: unknown): string[] {
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

function diff_point(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Point2P)) {
    diffs.push(`recieved is not a Point object: ${received}`)
    return diffs
  }

  diff_property(diffs, received, expected, 'is_direction')
  const r_bivec = received.bivec
  const e_bivec = (expected as Point2P).bivec
  diff_float_property(diffs, r_bivec, e_bivec, 'yo', 'x')
  diff_float_property(diffs, r_bivec, e_bivec, 'xo', '-y')
  diff_float_property(diffs, r_bivec, e_bivec, 'xy', 'weight')

  return diffs
}

function diff_dir(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Direction2P)) {
    diffs.push(`recieved is not a Direction object: ${received}`)
    return diffs
  }

  diff_property(diffs, received, expected, 'is_direction')
  const r_bivec = received.bivec
  const e_bivec = (expected as Direction2P).bivec
  diff_float_property(diffs, r_bivec, e_bivec, 'yo', 'x')
  diff_float_property(diffs, r_bivec, e_bivec, 'xo', '-y')
  diff_float_property(diffs, r_bivec, e_bivec, 'xy', 'weight')

  return diffs
}

function diff_line(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Line2P)) {
    diffs.push(`recieved is not a Line object: ${received}`)
    return diffs
  }

  diff_property(diffs, received, expected, 'is_infinite')
  const r_vec = received.vec
  const e_vec = (expected as Line2P).vec
  diff_float_property(diffs, r_vec, e_vec, 'x')
  diff_float_property(diffs, r_vec, e_vec, 'y')
  diff_float_property(diffs, r_vec, e_vec, 'o')

  return diffs
}

export const PGA_MATCHERS = {
  toBeEven2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Even2P, diff_even, received, expected)
  },
  toBeOdd2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Odd2P, diff_odd, received, expected)
  },

  toBePoint2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Point2P, diff_point, received, expected)
  },
  toBeDirection2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Direction2P, diff_dir, received, expected)
  },
  toBeLine2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Line2P, diff_line, received, expected)
  },
}
