import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { CyclicRepeat } from './CyclicRepeat.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { Wave } from '../../lib/animation/Wave.ts'
import { Clock } from '../../lib/animation/Clock.ts'

const CLOCK = new Clock()

class CyclicGroup implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  rect: Rect
  wave: Wave
  primitive: Drawable

  constructor(n: number) {
    this.rect = new Rect(new Point2P(32, 0), new Direction2P(32, 32))

    this.wave = Wave.sine({ amp: 64, freq: 0.25, bias: 32 })

    this.primitive = xform(
      Rigid.translation(new Direction2P(128, 128)),
      style(Style.flat(Color.CYAN), new CyclicRepeat(n, this.rect)),
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

export const SKETCHES = {
  c3: make_sketch(new CyclicGroup(3)),
  c5: make_sketch(new CyclicGroup(5)),
  c6: make_sketch(new CyclicGroup(6)),
  c12: make_sketch(new CyclicGroup(12)),
}
