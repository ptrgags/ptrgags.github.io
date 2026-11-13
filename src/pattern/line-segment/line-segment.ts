import type p5 from 'p5'
import { make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Dots } from '../../lib/primitives/Dots.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'

function thumbnail(): Drawable {
  const a = new Point2P(64, 196)
  const b = new Point2P(196, 64)
  const end_points = new Dots([a, b], 8)
  const segment = new LineSegment(a, b)

  return group(
    style(Style.lines(Color.RED, 4), segment),
    style(Style.flat(Color.WHITE), end_points),
  )
}

export const SKETCHES = {
  thumbnail: make_static_sketch(SWATCH.dimensions, thumbnail()),
}
