import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Style } from '../../lib/styling/Style.ts'
import { BezierCurve } from '../../lib/primitives/BezierCurve.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Path } from '../../lib/primitives/Path.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'

class PathTest implements SceneP5 {
  primitive: Drawable

  constructor() {
    const bezier = new BezierCurve(
      new Point2P(0, 0),
      new Point2P(128, 64),
      new Point2P(128, 192),
      new Point2P(0, 256),
    )

    const polygon = new Polyline({
      vertices: Point2P.from_pairs([
        [128, 0],
        [192, 64],
        [256, 0],
        [256, 128],
        [192, 192],
        [128, 128],
      ]),
      closed: true,
    })

    const path = new Path({
      parts: [
        new LineSegment(new Point2P(256, 128), new Point2P(256, 256)),
        new BezierCurve(
          new Point2P(256, 256),
          new Point2P(192, 256 + 64),
          new Point2P(192, 256 - 64),
          new Point2P(128, 256),
        ),
        new LineSegment(new Point2P(128, 256), new Point2P(128, 128)),
        new BezierCurve(
          new Point2P(128, 128),
          new Point2P(192, 128 - 64),
          new Point2P(192, 128 + 64),
          new Point2P(256, 128),
        ),
      ],
      closed: true,
    })

    this.primitive = group(
      style(Style.lines(Color.CYAN), bezier.control_polyline),
      style(Style.DEFAULT_LINES, bezier),
      style(Style.flat(Color.YELLOW), polygon),
      style(Style.flat(Color.RED), xform(Rigid.translation(new Direction2P(-64, 0)), path)),
    )
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  template: make_sketch(SWATCH.dimensions, new PathTest()),
}
