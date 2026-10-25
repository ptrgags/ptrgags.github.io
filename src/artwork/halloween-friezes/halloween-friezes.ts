import { ATC_SCREEN, SWATCH_WIDE } from '../../core/dimensions.ts'
import { CRS12 } from '../../lib/math/CRS12.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { bone, bone2 } from '../../lib/motifs/halloween.ts'
import { BONE_STYLE, skull, SKULL_STYLES } from '../../lib/motifs/skull.ts'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { StyleLayers } from '../../lib/primitives/StyleLayers.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Style } from '../../lib/styling/Style.ts'
import { FriezeP1 } from '../../lib/symmetry/frieze_groups.ts'

function p11m_skull_and_bones(): Drawable {
  const unit_circle = new Circle(Point2P.ORIGIN, 32)
  const head = new StyleLayers(SKULL_STYLES, skull(unit_circle))
  const bone_prim = xform(
    new Rigid({
      translation: new Direction2P(64, -32),
      rotation: Math.PI / 2,
    }),
    style(Style.flat(Color.WHITE), bone2(64, 8)),
  )

  const frieze = new FriezeP1({
    crs: new CRS12(new Point2P(0, 64), new Direction2P(128, 0)),
    x_range: [0, 4],
    children: group(head, bone_prim),
  })
  return frieze
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, new Circle(ATC_SCREEN.center, 100)),
  p11m: make_static_sketch(SWATCH_WIDE.dimensions, p11m_skull_and_bones()),
}
