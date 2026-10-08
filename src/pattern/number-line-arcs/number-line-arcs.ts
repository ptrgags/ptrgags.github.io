import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { ArcConvention, NumberLineArcs } from './NumberLineArcs.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'

class NumberLineArcTest implements SceneP5 {
  canvas_size = new Direction2P(512, 128)
  primitive: Drawable

  constructor() {
    this.primitive = style(
      Style.DEFAULT_LINES,
      new NumberLineArcs({
        origin: new Point2P(0, 64),
        spacing: 32,
        arc_convention: ArcConvention.PATH_START_BELOW,
        points: [7, 6, 5, 4, 10, 11, 12, 13],
      }),
    )
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  template: make_sketch(new NumberLineArcTest()),
}
