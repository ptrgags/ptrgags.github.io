import { SWATCH, SWATCH_WIDE } from '../../core/dimensions.ts'
import { CRS12 } from '../../lib/math/CRS12.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import {
  bone2,
  candy_corn,
  CANDY_CORN_STYLES,
  CHOCO_STYLES,
  chocolate_bar,
  ghost,
  GHOST_BLUE,
  ghost_styles,
  peppermint,
  PEPPERMINT_STYLES,
  witch_hat,
  WITCH_HAT_STYLES,
} from '../../lib/motifs/halloween.ts'
import { skull, SKULL_STYLES } from '../../lib/motifs/skull.ts'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { StyleLayers, type LayeredDrawable } from '../../lib/primitives/StyleLayers.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Style } from '../../lib/styling/Style.ts'
import { FriezeP1, FriezeP11G, FriezeP11M, FriezeP2 } from '../../lib/symmetry/frieze_groups.ts'
import { RepeatCyclic } from '../../lib/symmetry/RepeatCyclic.ts'
import { ArcConvention, NumberLineArcs } from '../../pattern/number-line-arcs/NumberLineArcs.ts'

function p1_witch_hats(): Drawable {
  const unit_circle = new Circle(new Point2P(64, 0), 64)
  const hat = witch_hat(unit_circle)

  return new FriezeP1({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(128, 0)),
    x_range: [0, 4],
    children: new StyleLayers(WITCH_HAT_STYLES, hat),
  })
}

function p1m1_skull_and_bones(): Drawable {
  const unit_circle = new Circle(Point2P.ORIGIN, 32)
  const head = new StyleLayers(SKULL_STYLES, skull(unit_circle))
  const bone_prim = xform(
    new Rigid({
      translation: new Direction2P(64, 0),
      rotation: Math.PI / 2,
    }),
    style(Style.flat(Color.WHITE), bone2(64, 8)),
  )

  return new FriezeP1({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(128, 0)),
    x_range: [0, 4],
    children: group(head, bone_prim),
  })
}

function p11m_candy(): Drawable {
  const corn_prim = new StyleLayers(
    CANDY_CORN_STYLES,
    candy_corn(new Circle(new Point2P(0, 32), 24)),
  )
  const peppermint_prim = new StyleLayers(
    PEPPERMINT_STYLES,
    peppermint(new Circle(new Point2P(52, 32), 20)),
  )
  const chocolate_prim = new StyleLayers(
    CHOCO_STYLES,
    chocolate_bar(new Circle(new Point2P(128, 32), 20)),
  )

  return new FriezeP11M({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(192, 0)),
    x_range: [0, 2],
    children: group(corn_prim, peppermint_prim, chocolate_prim),
  })
}

function p11g_braided_bones(): Drawable {
  const length = 48
  const bone_prim = bone2(length, 4)

  const bone_slash = xform(
    new Rigid({
      translation: new Direction2P(32, 32),
      rotation: -Math.PI / 4,
    }),
    bone_prim,
  )

  const bone_backslash = xform(
    new Rigid({
      translation: new Direction2P(32, 32),
      rotation: Math.PI / 4,
    }),
    bone_prim,
  )

  const joint = new Circle(Point2P.ORIGIN, 8)

  const crossing = group(
    style(Style.flat(Color.WHITE), bone_backslash),
    style(Style.lines(Color.BLACK, 4), bone_slash),
    style(Style.flat(Color.WHITE), bone_slash, joint),
  )

  return new FriezeP11G({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(128, 0)),
    x_range: [0, 4],
    children: crossing,
  })
}

const GHOST_SWIRL_STYLES = [Style.flat(GHOST_BLUE), Style.flat(Color.BLACK)]
function ghost_swirl(): LayeredDrawable {
  const arcs = new NumberLineArcs({
    origin: Point2P.ORIGIN,
    spacing: 4,
    arc_convention: ArcConvention.PATH_START_NEG_Y,
  })
  const body = arcs.make_path([1, 11, -14, 16, 15, -13, 1], true)

  const left_eye = arcs.make_path([3, 5, 3], true)
  const right_eye = arcs.make_path([7, 9, 7], true)
  return {
    layers: [body, group(left_eye, right_eye)],
  }
}

function p2_intertwined_ghosts(): Drawable {
  const swirl = new StyleLayers(GHOST_SWIRL_STYLES, ghost_swirl())

  return new FriezeP2({
    // adjust the spacing so the tails of the ghosts exactly overlap
    crs: new CRS12(SWATCH_WIDE.center, new Direction2P(128 - 4, 0)),
    x_range: [-2, 2],
    children: swirl,
  })
}

function ghost_swatch(): Drawable {
  return xform(Rigid.translation(SWATCH.center), new StyleLayers(GHOST_SWIRL_STYLES, ghost_swirl()))
}

function p2mg_ghosts(): Drawable {
  const motif = new StyleLayers(ghost_styles(), ghost(new Circle(new Point2P(16, -32), 16)))

  return new FriezeP2({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(64, 0)),
    x_range: [0, 8],
    children: motif,
  })
}

function p2mm_hex_candy(): Drawable {
  const candy = new StyleLayers(CANDY_CORN_STYLES, candy_corn(new Circle(new Point2P(-40, 0), 32)))
  const motif = new RepeatCyclic({
    order: 6,
    children: candy,
  })

  return new FriezeP2({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(128, 0)),
    x_range: [0, 8],
    children: motif,
  })
}

export const SKETCHES = {
  p1: make_static_sketch(SWATCH_WIDE.dimensions, p1_witch_hats()),
  p1m1: make_static_sketch(SWATCH_WIDE.dimensions, p1m1_skull_and_bones()),
  p11m: make_static_sketch(SWATCH_WIDE.dimensions, p11m_candy()),
  p11g: make_static_sketch(SWATCH_WIDE.dimensions, p11g_braided_bones()),
  p2: make_static_sketch(SWATCH_WIDE.dimensions, p2_intertwined_ghosts()),
  p2mg: make_static_sketch(SWATCH_WIDE.dimensions, p2mg_ghosts()),
  p2mm: make_static_sketch(SWATCH_WIDE.dimensions, p2mm_hex_candy()),
  swirl_motif: make_static_sketch(SWATCH.dimensions, ghost_swatch()),
}
