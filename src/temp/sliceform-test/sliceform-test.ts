import { ATC_SCREEN } from '../../core/dimensions.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { style } from '../../lib/primitives/shorthand.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'
import { Slicer } from '../../lib/sliceforms/slice_surface.ts'
import { Style } from '../../lib/styling/Style.ts'

function surface(uv: Vec2): number {
  return Math.max(uv.x, uv.y)
}

export function preview_pieces(): Drawable {
  const slicer = new Slicer({
    slice_counts: new Direction2P(3, 3),
    sample_counts: new Direction2P(100, 100),
    slit_thickness: 0.01,
  })

  const polylines = slicer.slice(surface)
  return style(Style.DEFAULT_LINES, polylines[0])
}

export const SKETCHES = {
  sliceform: make_static_sketch(ATC_SCREEN.dimensions, preview_pieces()),
}
