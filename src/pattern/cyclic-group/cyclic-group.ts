import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { Wave } from '../../lib/animation/Wave.ts'
import { Clock } from '../../lib/animation/Clock.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import { TextStyle } from '../../lib/styling/TextStyle.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { mod } from '../../lib/math/mod.ts'
import { RepeatCyclic } from './RepeatCyclic.ts'
import { AroundCircle } from './AroundCircle.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'

const CLOCK = new Clock()
const SCREEN_CENTER = new Direction2P(128, 128)
const TRANSLATE_CENTER = Rigid.translation(SCREEN_CENTER)

class CyclicGroupAnimation implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  rect: Rect
  wave: Wave
  primitive: Drawable

  constructor(n: number) {
    this.rect = new Rect(new Point2P(32, 0), new Direction2P(32, 32))

    this.wave = Wave.sine({ amp: 64, freq: 0.25, bias: 32 })

    this.primitive = xform(
      TRANSLATE_CENTER,
      style(Style.flat(Color.CYAN), new RepeatCyclic({ order: n, children: this.rect })),
    )
  }

  update(p: p5): void {
    const t = CLOCK.elapsed_time

    // for now, make the points move in a lissajous curve
    this.rect.position = new Point2P(this.wave.bipolar(t), this.wave.bipolar(2 * t))
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class ThreeDifferentShapes implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  primitive: Drawable

  constructor() {
    const three_shapes = new RepeatCyclic({
      order: 3,
      children: [
        new Rect(new Point2P(16, -16), new Direction2P(80, 32)),
        new Circle(new Point2P(32, 0), 16),
        new LineSegment(new Point2P(16, 32), new Point2P(48, -32)),
      ],
    })
    this.primitive = xform(
      Rigid.translation(SCREEN_CENTER),
      style(Style.flat(Color.YELLOW), three_shapes),
    )
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class ColorWheel implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  primitive: Drawable

  constructor() {
    const rects = group(
      new Rect(new Point2P(8, -4), new Direction2P(128, 8)),
      new Rect(new Point2P(32, -16), new Direction2P(8, 32)),
      new Rect(new Point2P(64, -32), new Direction2P(8, 64)),
      new Rect(new Point2P(96, -16), new Direction2P(8, 32)),
    )
    const color_wheel = new RepeatCyclic({
      order: 6,
      children: (slot) => {
        return style(Style.flat(new Oklch(0.7, 0.3, (slot.angle * 180) / Math.PI)), rects)
      },
    })
    this.primitive = xform(TRANSLATE_CENTER, color_wheel)
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

const TICK_MARK = new LineSegment(new Point2P(64, 0), new Point2P(80, 0))
const STYLE_LABEL = { text_style: new TextStyle(24, 'center', 'center'), style: Style.DEFAULT_FLAT }

class ClockDial implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  wave: Wave
  primitive: Drawable

  constructor() {
    const tick_marks = new RepeatCyclic({ order: 12, children: TICK_MARK })
    const labels = new AroundCircle({
      circle: new Circle(new Point2P(128, 128), 96),
      order: 12,
      children: (slot) => {
        const numeral = mod(slot.i + 3, 12)
        const fix_twelve = numeral === 0 ? 12 : numeral
        return new Text(`${fix_twelve}`, Point2P.ORIGIN)
      },
    })

    this.wave = Wave.sine({ amp: 64, freq: 0.25, bias: 32 })

    this.primitive = group(
      xform(Rigid.translation(SCREEN_CENTER), style(Style.DEFAULT_LINES, tick_marks)),
      style(STYLE_LABEL, labels),
    )
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  c3: make_sketch(new CyclicGroupAnimation(3)),
  c5: make_sketch(new CyclicGroupAnimation(5)),
  c6: make_sketch(new CyclicGroupAnimation(6)),
  c12: make_sketch(new CyclicGroupAnimation(12)),

  three_shapes: make_static_sketch(new ThreeDifferentShapes()),
  color_wheel: make_static_sketch(new ColorWheel()),

  clock: make_static_sketch(new ClockDial()),
}
