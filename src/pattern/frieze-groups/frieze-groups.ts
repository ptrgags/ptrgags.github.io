import type p5 from 'p5'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Repeat1D } from '../../lib/symmetry/Repeat1D.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { CRS12 } from '../../lib/math/CRS12.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Polygon } from '../../lib/primitives/Polygon.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { lerp } from '../../lib/math/lerp.ts'
import { SWATCH_WIDE } from '../../core/dimensions.ts'
import {
  FriezeP1,
  FriezeP11G,
  FriezeP11M,
  FriezeP1M1,
  FriezeP2,
  FriezeP2MG,
  FriezeP2MM,
} from '../../lib/symmetry/frieze_groups.ts'

const BOOKMARK_MOTIF = group(
  style(
    new Style({
      fill: Color.RED,
      stroke: Color.BLACK,
      width: 2,
    }),
    new Polygon([Point2P.ORIGIN, new Point2P(0, 32), new Point2P(32, 0)]),
  ),
  style(
    new Style({
      fill: Color.GREEN,
      stroke: Color.BLACK,
      width: 2,
    }),
    new Polygon(
      Point2P.from_pairs([
        [0, 32],
        [0, 64],
        [16, 48],
        [32, 64],
        [32, 0],
      ]),
    ),
  ),
)

function repeat_test(): Drawable {
  return new Repeat1D({
    crs: new CRS12(new Point2P(0, 32), new Direction2P(32, 0)),
    x_range: [0, 15],
    children: BOOKMARK_MOTIF,
  })
}

function diagonal(): Drawable {
  return new Repeat1D({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(32, -4)),
    x_range: [0, 15],
    children: BOOKMARK_MOTIF,
  })
}

function animation_frames(): Drawable {
  const SPACING = 32
  const N = 16
  const COLOR_A = new Oklch(0.7, 0.2, 30)
  const COLOR_B = new Oklch(0.7, 0.2, 200)

  return new Repeat1D({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(SPACING, 0)),
    x_range: [0, N - 1],
    children: (slot) => {
      const t = slot.i / (N - 1)
      const color = Oklch.lerp(COLOR_A, COLOR_B, t)
      const y = lerp(-64, 32, t)
      return style(Style.flat(color), new Rect(new Point2P(0, y), new Direction2P(SPACING, 32)))
    },
  })
}

function p1(): Drawable {
  return new FriezeP1({
    crs: new CRS12(SWATCH_WIDE.center.add(Direction2P.DIR_Y.scale(-32)), new Direction2P(32, 0)),
    x_range: [-9, 7],
    children: BOOKMARK_MOTIF,
  })
}

function p11m(): Drawable {
  return new FriezeP11M({
    crs: new CRS12(SWATCH_WIDE.center, new Direction2P(32, 0)),
    x_range: [-9, 7],
    children: BOOKMARK_MOTIF,
  })
}

function p1m1(): Drawable {
  return new FriezeP1M1({
    crs: new CRS12(SWATCH_WIDE.center.add(Direction2P.DIR_Y.scale(-32)), new Direction2P(64, 0)),
    x_range: [-9, 7],
    children: BOOKMARK_MOTIF,
  })
}

function p11g(): Drawable {
  return new FriezeP11G({
    crs: new CRS12(SWATCH_WIDE.center, new Direction2P(32, 0)),
    x_range: [-9, 7],
    children: BOOKMARK_MOTIF,
  })
}

function p2(): Drawable {
  return new FriezeP2({
    crs: new CRS12(SWATCH_WIDE.center, new Direction2P(32, 0)),
    x_range: [-9, 8],
    children: BOOKMARK_MOTIF,
  })
}

function p2mg(): Drawable {
  return new FriezeP2MG({
    crs: new CRS12(SWATCH_WIDE.center, new Direction2P(64, 0)),
    x_range: [-4, 4],
    children: BOOKMARK_MOTIF,
  })
}

function p2mm(): Drawable {
  return new FriezeP2MM({
    crs: new CRS12(SWATCH_WIDE.center, new Direction2P(64, 0)),
    x_range: [-4, 4],
    children: BOOKMARK_MOTIF,
  })
}

export const SKETCHES = {
  p1: make_static_sketch(SWATCH_WIDE.dimensions, p1()),
  p11m: make_static_sketch(SWATCH_WIDE.dimensions, p11m()),
  p1m1: make_static_sketch(SWATCH_WIDE.dimensions, p1m1()),
  p11g: make_static_sketch(SWATCH_WIDE.dimensions, p11g()),
  p2: make_static_sketch(SWATCH_WIDE.dimensions, p2()),
  p2mg: make_static_sketch(SWATCH_WIDE.dimensions, p2mg()),
  p2mm: make_static_sketch(SWATCH_WIDE.dimensions, p2mm()),

  diagonal: make_static_sketch(SWATCH_WIDE.dimensions, diagonal()),
  animation_frames: make_static_sketch(SWATCH_WIDE.dimensions, animation_frames()),
}
