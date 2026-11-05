import { ATC_SCREEN } from '../../core/dimensions.ts'
import { divmod } from '../../lib/math/divmod.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { style, xform } from '../../lib/primitives/shorthand.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'
import { Slicer } from '../../lib/sliceforms/slice_surface.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Style } from '../../lib/styling/Style.ts'

function surface(uv: Vec2): number {
  //return 0.5 + 0.5 * Math.sin(Math.PI * 2 * uv.x) * Math.sin(Math.PI * 2 * uv.y)
  return Math.max(uv.x, uv.y)
}

export function preview_pieces(): Drawable {
  const SLICE_COUNTS = new Direction2P(4, 5)

  const slicer = new Slicer({
    slice_counts: SLICE_COUNTS,
    samples_between: new Direction2P(5, 5),
    slice_dimensions: new Direction2P(200, 50),
    base_depth: 50,
    slit_thickness: 2,
  })

  const STRIDE = slicer.full_slice_dimensions.add(new Direction2P(20, 20))
  const slices = slicer.slice(surface)

  const STYLE_U = Style.lines(Color.RED, 2)
  const STYLE_V = Style.DEFAULT_LINES

  const arranged = slices.map((slice, i) => {
    const [row, col] = divmod(i, 2)
    const colored_lines = i < SLICE_COUNTS.x ? STYLE_U : STYLE_V
    return xform(
      Rigid.translation(new Direction2P(col, row).mul_components(STRIDE)),
      style(colored_lines, slice),
    )
  })

  return style(Style.DEFAULT_LINES, ...arranged)
}

export function printable_sliceform(pixels_per_inch: number): {
  primitive: Drawable
  dimensions: Direction2P
} {
  const SLICE_COUNTS = new Direction2P(5, 6)
  const TOTAL_SLICES = SLICE_COUNTS.x + SLICE_COUNTS.y

  const THICKNESS_MM = 1
  const MM_PER_INCHES = 25.4
  const THICKNESS_PX = (THICKNESS_MM / MM_PER_INCHES) * pixels_per_inch
  console.log(THICKNESS_PX)

  const slicer = new Slicer({
    slice_counts: SLICE_COUNTS,
    samples_between: new Direction2P(5, 5),
    slice_dimensions: new Direction2P(200, 50),
    base_depth: 50,
    slit_thickness: THICKNESS_PX,
  })

  const STRIDE = slicer.full_slice_dimensions.add(new Direction2P(20, 20))
  const slices = slicer.slice(surface)

  const STYLE_U = Style.lines(Color.RED, 2)
  const STYLE_V = Style.lines(Color.BLACK, 2)

  const COLUMNS = 3

  const arranged = slices.map((slice, i) => {
    const [row, col] = divmod(i, COLUMNS)
    const colored_lines = i < SLICE_COUNTS.x ? STYLE_U : STYLE_V
    return xform(
      Rigid.translation(new Direction2P(col, row).mul_components(STRIDE)),
      style(colored_lines, slice),
    )
  })

  return {
    primitive: style(Style.DEFAULT_LINES, ...arranged),
    dimensions: STRIDE.mul_components(new Direction2P(COLUMNS, Math.ceil(TOTAL_SLICES / COLUMNS))),
  }
}

export const SKETCHES = {
  sliceform: make_static_sketch(ATC_SCREEN.dimensions, preview_pieces()),
}
