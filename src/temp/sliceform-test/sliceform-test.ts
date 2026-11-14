import { ATC_SCREEN } from '../../core/dimensions.ts'
import { Tween } from '../../lib/animation/Tween.ts'
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

const BACKWARDS_GRADIENT = Tween.scalar(1, 0, 0.25, 0.5)

// based on glsl step function, see https://registry.khronos.org/OpenGL-Refpages/gl4/html/step.xhtml
function step(edge: number, x: number): number {
  return x < edge ? 0 : 1
}

function gradient_within_gradient(uv: Vec2): number {
  const background = uv.x
  // for coordinates in [0.25, 0.75], map to
  const foreground = BACKWARDS_GRADIENT.get_value(uv.x)

  const rect_mask =
    step(0.25, uv.x) * (1.0 - step(0.75, uv.x)) * step(0.25, uv.y) * (1.0 - step(0.75, uv.y))

  return rect_mask ? foreground : background
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
  const SLICE_COUNTS = new Direction2P(5, 9)
  const TOTAL_SLICES = SLICE_COUNTS.x + SLICE_COUNTS.y

  const THICKNESS_MM = 2 ////0.5
  const MM_PER_INCHES = 25.4
  const THICKNESS_PX = (THICKNESS_MM / MM_PER_INCHES) * pixels_per_inch

  const slicer = new Slicer({
    slice_counts: SLICE_COUNTS,
    samples_between: new Direction2P(5, 5),
    slice_dimensions: new Direction2P(200, 100),
    base_depth: 50,
    slit_thickness: THICKNESS_PX,
  })

  const STRIDE = slicer.full_slice_dimensions.add(new Direction2P(20, 20))
  const slices = slicer.slice(gradient_within_gradient)

  const STYLE_U = Style.lines(Color.RED, 1)
  const STYLE_V = Style.lines(Color.BLACK, 1)

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

export function sliceform_3d_print(pixels_per_inch: number): {
  primitive: Drawable
  dimensions: Direction2P
} {
  const SLICE_COUNTS = new Direction2P(4, 5)
  const TOTAL_SLICES = SLICE_COUNTS.x + SLICE_COUNTS.y

  const THICKNESS_MM = 2
  const MM_PER_INCHES = 25.4
  const THICKNESS_PX = (THICKNESS_MM / MM_PER_INCHES) * pixels_per_inch

  const slicer = new Slicer({
    slice_counts: SLICE_COUNTS,
    samples_between: new Direction2P(5, 5),
    slice_dimensions: new Direction2P(200, 100),
    base_depth: 50,
    slit_thickness: THICKNESS_PX,
  })

  const STRIDE = slicer.full_slice_dimensions.add(new Direction2P(20, 20))
  const slices = slicer.slice(surface)

  const STYLE_U = Style.lines(Color.RED, 1)
  const STYLE_V = Style.lines(Color.BLACK, 1)

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
