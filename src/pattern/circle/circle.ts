import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Dots } from '../../lib/primitives/Dots.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'

function thumbnail(): Drawable {
  const radius = 96
  const center = new Dots([SWATCH.center])
  const radius_line = new LineSegment(
    SWATCH.center,
    SWATCH.center.add(Direction2P.from_angle(-Math.PI / 4).scale(radius)),
  )

  return group(
    style(Style.lines(Color.WHITE, 2), new Circle(SWATCH.center, radius), radius_line),
    style(Style.flat(Color.WHITE), center),
  )
}

export const SKETCHES = {
  thumbnail: make_static_sketch(SWATCH.dimensions, thumbnail()),
}
