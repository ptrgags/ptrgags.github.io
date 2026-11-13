import type p5 from 'p5'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { style } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Gridlines } from '../../lib/primitives/Gridlines.ts'

function thumbnail(): Drawable {
  const lines = new Gridlines({
    bounds: SWATCH,
    x_spacing: 32,
    y_spacing: 32,
    draw_bounds: true,
  })

  return style(Style.lines(Color.WHITE, 2), lines)
}

export const SKETCHES = {
  thumbnail: make_static_sketch(SWATCH.dimensions, thumbnail()),
}
