import type p5 from 'p5'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { PianoScaleSchematic } from './PianoScaleSchematic.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'

const ORIGIN = new Point2P(16, 128)
const SPACING = new Direction2P(32, 32)

const SCHEMATIC_E_FLAT = new PianoScaleSchematic({
  spacing: SPACING,
  origin: ORIGIN,
  notes: [
    ['Eb', true],
    ['F', false],
    ['G', false],
    ['Ab', true],
    ['Bb', true],
    ['C', false],
    ['D', false],
  ],
})

export const SKETCHES = {
  scale_schematic: make_static_sketch(SWATCH.dimensions, SCHEMATIC_E_FLAT),
}
