import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Repeat1D } from '../../lib/symmetry/Repeat1D.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { CRS12 } from '../../lib/math/CRS12.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Polygon } from '../../lib/primitives/Polygon.ts'

class RepeatTest implements SceneP5 {
  canvas_size = new Direction2P(512, 128)
  primitive: Drawable

  constructor() {
    const bookmark_motif = group(
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
        new Polygon([
          new Point2P(0, 32),
          new Point2P(0, 64),
          new Point2P(16, 48),
          new Point2P(32, 64),
          new Point2P(32, 0),
        ]),
      ),
    )

    const repeat = new Repeat1D({
      crs: new CRS12(new Point2P(0, 32), new Direction2P(32, 0)),
      x_range: [0, 15],
      children: bookmark_motif,
    })

    this.primitive = repeat
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  template: make_sketch(new RepeatTest()),
}
