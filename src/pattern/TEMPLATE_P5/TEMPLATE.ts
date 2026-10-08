import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group } from '../../lib/primitives/shorthand.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'

class TEMPLATE implements SceneP5 {
  canvas_size = new Direction2P(256, 256)
  primitive: Drawable

  constructor() {
    this.primitive = group()
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  template: make_sketch(new TEMPLATE()),
}
