import type p5 from 'p5'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import { ATC_SCREEN } from '../../core/dimensions.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { PianoScaleSchematic } from './PianoScaleSchematic.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { MAJOR_SCALE } from '../../lib/music/scales.ts'
import { Bb, type PitchClass } from '../../lib/music/pitches.ts'
import { scale_to_note_names } from './scale_note_names.ts'
import { FriezeP1, type FriezeP1Slot } from '../../lib/symmetry/frieze_groups.ts'
import { CRS12 } from '../../lib/math/CRS12.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { group } from '../../lib/primitives/shorthand.ts'

const SCALE_SPACING = new Direction2P(0, 32)

const NOTE_SPACING = new Direction2P(32, 16)

const MAJOR_SCALES_LEFT = new FriezeP1({
  crs: new CRS12(new Point2P(32, 32), SCALE_SPACING),
  x_range: [0, 5],
  children: (slot) => {
    const scale_degree = slot.i as PitchClass
    const scale = MAJOR_SCALE.to_symbol(scale_degree)

    return new PianoScaleSchematic({
      spacing: NOTE_SPACING,
      origin: new Point2P(0, 64 * slot.i),
      notes: scale_to_note_names(scale),
    })
  },
})

const MAJOR_SCALES_RIGHT = new FriezeP1({
  crs: new CRS12(new Point2P(250 + 32, 32), SCALE_SPACING),
  x_range: [0, 5],
  children: (slot) => {
    const scale_degree = (slot.i + 6) as PitchClass
    const scale = MAJOR_SCALE.to_symbol(scale_degree)

    return new PianoScaleSchematic({
      spacing: NOTE_SPACING,
      origin: new Point2P(0, 64 * slot.i),
      notes: scale_to_note_names(scale),
    })
  },
})

const ALL_SCALES = group(MAJOR_SCALES_LEFT, MAJOR_SCALES_RIGHT)

export const SKETCHES = {
  scale_schematic: make_static_sketch(ATC_SCREEN.dimensions, ALL_SCALES),
}
