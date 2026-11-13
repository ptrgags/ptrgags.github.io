import type p5 from 'p5'
import { make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Dots } from '../../lib/primitives/Dots.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { BezierCurve } from '../../lib/primitives/BezierCurve.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'

function thumbnail(): Drawable {
  const a = new Point2P(64, 64)
  const b = new Point2P(64, 192)
  const c = new Point2P(192, 64)
  const d = new Point2P(192, 192)
  const bezier = new BezierCurve(a, b, c, d)
  const polyline = new Polyline({ vertices: [a, b, c, d], closed: false })
  const points = new Dots([a, b, c, d], 8)

  return group(
    style(Style.lines(Oklch.grey(0.5), 4), polyline),
    style(Style.lines(Color.RED, 8), bezier),
    style(Style.flat(Color.WHITE), points),
  )
}

export const SKETCHES = {
  thumbnail: make_static_sketch(SWATCH.dimensions, thumbnail()),
}
