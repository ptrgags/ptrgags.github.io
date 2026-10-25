import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { ArcConvention, NumberLineArcs } from './NumberLineArcs.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Group } from '../../lib/primitives/Group.ts'

/*
new NumberLineArcs({
    ...crs,
    arc_convention: arc_convention,
    points: [0, 1, 2, 5, 3, 4, 0],
  })
    */

class NumberLineArcTest implements SceneP5 {
  canvas_size = new Direction2P(512, 128)
  primitive: Drawable

  constructor(arc_convention: ArcConvention) {
    const arcs = new NumberLineArcs({
      origin: new Point2P(0, 128),
      spacing: 48,
      arc_convention,
    })
    //points: [0, 1, 2, 5, 3, 4, 0],

    this.primitive = style(Style.DEFAULT_LINES, arcs.make_arc(0, 1) ?? Group.EMPTY)
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  above: make_static_sketch(SWATCH.dimensions, new NumberLineArcTest(ArcConvention.ABOVE)),
  below: make_static_sketch(SWATCH.dimensions, new NumberLineArcTest(ArcConvention.BELOW)),
  path_above: make_static_sketch(
    SWATCH.dimensions,
    new NumberLineArcTest(ArcConvention.PATH_START_ABOVE),
  ),
  path_below: make_static_sketch(
    SWATCH.dimensions,
    new NumberLineArcTest(ArcConvention.PATH_START_BELOW),
  ),
  positive: make_static_sketch(SWATCH.dimensions, new NumberLineArcTest(ArcConvention.POSITIVE)),
  negative: make_static_sketch(SWATCH.dimensions, new NumberLineArcTest(ArcConvention.NEGATIVE)),
}
