import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { ArcConvention, NumberLineArcs } from './NumberLineArcs.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Group } from '../../lib/primitives/Group.ts'
import { Color } from '../../lib/styling/Color.ts'

class NumberLineArcTest implements SceneP5 {
  canvas_size = new Direction2P(512, 128)
  primitive: Drawable

  constructor(arc_convention: ArcConvention) {
    const arcs = new NumberLineArcs({
      origin: new Point2P(8, 128),
      spacing: 40,
      arc_convention,
    })

    const arrow_options = { arrow_radii: new Direction2P(8, 8) }

    const single_arc = arcs.make_arc(0, 1) ?? Group.EMPTY
    const single_arrow = arcs.make_arrow(2, 0, arrow_options) ?? Group.EMPTY
    const path = arcs.make_path([3, 5, 4, 3], true)
    const path_arrows = arcs.make_arrows([3, 5, 4, 3], arrow_options)

    this.primitive = group(
      style(Style.flat(Color.RED), path),
      style(Style.DEFAULT_LINES, single_arc, single_arrow, ...path_arrows),
    )
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  pos_y: make_static_sketch(SWATCH.dimensions, new NumberLineArcTest(ArcConvention.POS_Y)),
  neg_y: make_static_sketch(SWATCH.dimensions, new NumberLineArcTest(ArcConvention.NEG_Y)),
  path_pos_y: make_static_sketch(
    SWATCH.dimensions,
    new NumberLineArcTest(ArcConvention.PATH_START_POS_Y),
  ),
  path_neg_y: make_static_sketch(
    SWATCH.dimensions,
    new NumberLineArcTest(ArcConvention.PATH_START_NEG_Y),
  ),
  pos_angle: make_static_sketch(SWATCH.dimensions, new NumberLineArcTest(ArcConvention.POS_ANGLE)),
  neg_angle: make_static_sketch(SWATCH.dimensions, new NumberLineArcTest(ArcConvention.NEG_ANGLE)),
}
