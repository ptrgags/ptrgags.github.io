import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { CircularArc } from '../../lib/primitives/CircularArc.ts'
import { AngleOrientation, ArcAngles } from '../../lib/primitives/ArcAngles.ts'
import { Color } from '../../lib/styling/Color.ts'

class ArcConcept implements SceneP5 {
  canvas_size = { width: 200, height: 200 }
  primitive: Drawable

  constructor() {
    const circle = new Circle({ x: 100, y: 100 }, 75)

    const arc = new CircularArc(
      circle,
      new ArcAngles(Math.PI / 4, Math.PI / 2, AngleOrientation.POSITIVE).flip_y(),
    )

    this.primitive = group(
      style(Style.lines(Oklch.grey(0.5), 2), circle),
      style(Style.lines(Color.CYAN, 2), arc),
    )
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  concept: make_static_sketch(new ArcConcept()),
}
