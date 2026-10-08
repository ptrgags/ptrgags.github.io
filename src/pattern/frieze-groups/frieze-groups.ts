import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Repeat1D } from '../../lib/symmetry/Repeat1D.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { CRS12 } from '../../lib/math/CRS12.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Polygon } from '../../lib/primitives/Polygon.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { lerp } from '../../lib/math/lerp.ts'

const FRIEZE_SIZE = new Direction2P(512, 128)

const BOOKMARK_MOTIF = group(
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
    new Polygon(
      Point2P.from_pairs([
        [0, 32],
        [0, 64],
        [16, 48],
        [32, 64],
        [32, 0],
      ]),
    ),
  ),
)

class RepeatTest implements SceneP5 {
  canvas_size = FRIEZE_SIZE
  primitive: Drawable

  constructor() {
    const repeat = new Repeat1D({
      crs: new CRS12(new Point2P(0, 32), new Direction2P(32, 0)),
      x_range: [0, 15],
      children: BOOKMARK_MOTIF,
    })

    this.primitive = repeat
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class Diagonal implements SceneP5 {
  canvas_size = FRIEZE_SIZE
  primitive: Drawable

  constructor() {
    const repeat = new Repeat1D({
      crs: new CRS12(new Point2P(0, 64), new Direction2P(32, -4)),
      x_range: [0, 15],
      children: BOOKMARK_MOTIF,
    })

    this.primitive = repeat
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class AnimationFrames implements SceneP5 {
  canvas_size = FRIEZE_SIZE
  primitive: Drawable

  constructor() {
    const SPACING = 32
    const N = 16
    const COLOR_A = new Oklch(0.7, 0.2, 30)
    const COLOR_B = new Oklch(0.7, 0.2, 200)

    this.primitive = new Repeat1D({
      crs: new CRS12(new Point2P(0, 64), new Direction2P(SPACING, 0)),
      x_range: [0, N - 1],
      children: (slot) => {
        const t = slot.i / (N - 1)
        const color = Oklch.lerp(COLOR_A, COLOR_B, t)
        const y = lerp(-64, 32, t)
        return style(Style.flat(color), new Rect(new Point2P(0, y), new Direction2P(SPACING, 32)))
      },
    })
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  p1: make_static_sketch(new RepeatTest()),
  diagonal: make_static_sketch(new Diagonal()),
  animation_frames: make_static_sketch(new AnimationFrames()),
}
