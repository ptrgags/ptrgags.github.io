import { SWATCH_WIDE } from '../../core/dimensions.ts'
import { CRS12 } from '../../lib/math/CRS12.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import {
  bone2,
  ghost,
  ghost_styles,
  witch_hat,
  WITCH_HAT_STYLES,
} from '../../lib/motifs/halloween.ts'
import { skull, SKULL_STYLES } from '../../lib/motifs/skull.ts'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { StyleLayers } from '../../lib/primitives/StyleLayers.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Style } from '../../lib/styling/Style.ts'
import { FriezeP1, FriezeP11G, FriezeP2 } from '../../lib/symmetry/frieze_groups.ts'

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

function p2mg_ghosts(): Drawable {
  const motif = new StyleLayers(ghost_styles(), ghost(new Circle(new Point2P(16, -32), 16)))

  return new FriezeP2({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(64, 0)),
    x_range: [0, 8],
    children: motif,
  })
}

export const SKETCHES = {
  p1: make_static_sketch(SWATCH_WIDE.dimensions, p1_witch_hats()),
  p1m1: make_static_sketch(SWATCH_WIDE.dimensions, p1m1_skull_and_bones()),
  p11g: make_static_sketch(SWATCH_WIDE.dimensions, p11g_braided_bones()),
  p2mg: make_static_sketch(SWATCH_WIDE.dimensions, p2mg_ghosts()),
}
