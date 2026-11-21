import type { Matcher, MatcherResult, MatcherState } from 'vitest'
import { Even2P } from '../math/pga2d/Even2P.ts'
import { Odd2P } from '../math/pga2d/Odd2P.ts'
import { diff_float_property, diff_property } from './diff_properties.ts'
import { custom_equality_matcher } from './matchermaking.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { Line2P } from '../math/pga2d/Line2P.ts'
import { Odd3P } from '../math/pga3d/Odd3P.ts'
import { Even3P } from '../math/pga3d/Even3P.ts'

function diff_even_2p(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Even2P)) {
    diffs.push(`received is not an Even object: ${received}`)
    return diffs
  }

  diff_float_property(diffs, received, expected, 'scalar')
  diff_float_property(diffs, received, expected, 'yo')
  diff_float_property(diffs, received, expected, 'xo')
  diff_float_property(diffs, received, expected, 'xy')

  return diffs
}

function diff_even_3p(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Even3P)) {
    diffs.push(`received is not an Even object: ${received}`)
    return diffs
  }

  diff_float_property(diffs, received, expected, 'scalar')
  diff_float_property(diffs, received, expected, 'xy')
  diff_float_property(diffs, received, expected, 'xz')
  diff_float_property(diffs, received, expected, 'xo')
  diff_float_property(diffs, received, expected, 'yz')
  diff_float_property(diffs, received, expected, 'yo')
  diff_float_property(diffs, received, expected, 'zo')
  diff_float_property(diffs, received, expected, 'xyzo')

  return diffs
}

function diff_odd_2p(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Odd2P)) {
    diffs.push(`received is not an Odd object: ${received}`)
    return diffs
  }

  diff_float_property(diffs, received, expected, 'x')
  diff_float_property(diffs, received, expected, 'y')
  diff_float_property(diffs, received, expected, 'o')
  diff_float_property(diffs, received, expected, 'xyo')

  return diffs
}

function diff_odd_3p(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Odd3P)) {
    diffs.push(`received is not an Odd object: ${received}`)
    return diffs
  }

  diff_float_property(diffs, received, expected, 'x')
  diff_float_property(diffs, received, expected, 'y')
  diff_float_property(diffs, received, expected, 'z')
  diff_float_property(diffs, received, expected, 'o')
  diff_float_property(diffs, received, expected, 'xyz')
  diff_float_property(diffs, received, expected, 'xyo')
  diff_float_property(diffs, received, expected, 'xzo')
  diff_float_property(diffs, received, expected, 'yzo')

  return diffs
}

function diff_point_2p(diffs: string[], received: unknown, expected: unknown): string[] {
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

export function diff_dir_2p(diffs: string[], received: unknown, expected: unknown): string[] {
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

function diff_line_2p(diffs: string[], received: unknown, expected: unknown): string[] {
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
    return custom_equality_matcher(Even2P, diff_even_2p, received, expected)
  },
  toBeOdd2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Odd2P, diff_odd_2p, received, expected)
  },
  toBePoint2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Point2P, diff_point_2p, received, expected)
  },
  toBeDirection2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Direction2P, diff_dir_2p, received, expected)
  },
  toBeLine2P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Line2P, diff_line_2p, received, expected)
  },

  // 3D versions
  toBeEven3P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Even3P, diff_even_3p, received, expected)
  },
  toBeOdd3P(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Odd3P, diff_odd_3p, received, expected)
  },
}
