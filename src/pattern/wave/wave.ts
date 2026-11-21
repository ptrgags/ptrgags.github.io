import type p5 from 'p5'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { style } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Oscilloscope } from '../../lib/animation/Oscilloscope.ts'
import { Wave } from '../../lib/animation/Wave.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'

function thumbnail(): Drawable {
  const half_dims = SWATCH.dimensions.mul_components(new Direction2P(1, 0.5))

  const sine_osc = new Oscilloscope({
    wave: Wave.sine(),
    bounds: new Rect(Point2P.ORIGIN, half_dims),
    draw_axes: false,
    sample_count: 100,
  })
  const square_osc = new Oscilloscope({
    wave: Wave.square(),
    bounds: new Rect(new Point2P(0, 0.5 * SWATCH.dimensions.y), half_dims),
    draw_axes: false,
    sample_count: 100,
  })
  return style(Style.DEFAULT_LINES, sine_osc, square_osc)
}

export const SKETCHES = {
  thumbnail: make_static_sketch(SWATCH.dimensions, thumbnail()),
}
