import { describe, it, expect } from 'vitest'
import { ArcConvention, NumberLineArcs } from './NumberLineArcs.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'

const SIMPLE_CRS = { origin: Point2P.ORIGIN, spacing: 1 }

function make_arcs(
  crs: { origin: Vec2; spacing: number },
  arc_convention: ArcConvention,
): NumberLineArcs {
  return new NumberLineArcs({
    ...crs,
    arc_convention: arc_convention,
    points: [0, 1, 2, 5, 3, 4, 0],
  })
}

// ugh... testing for equality will be tricky... maybe let's try a visual test instead.

describe('NumberLineArcs', () => {})
