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
import { ArcArrow, ArrowParts } from '../../lib/primitives/ArcArrow.ts'

class ArcConcept implements SceneP5 {
  canvas_size = { width: 200, height: 200 }
  primitive: Drawable

  constructor() {
    const circle = new Circle({ x: 100, y: 100 }, 75)

    const arc = new CircularArc(
      circle,
      new ArcAngles(Math.PI / 4, Math.PI / 2, AngleOrientation.POSITIVE).flip_y(),
    )

    const arc2 = new ArcArrow({
      circle: new Circle({ x: 100, y: 100 }, 50),
      angles: new ArcAngles(Math.PI / 4, Math.PI / 2, AngleOrientation.POSITIVE).flip_y(),
      tip: 0b0010,
      tail: 0b0000,
    })

    const arc3 = new ArcArrow({
      circle: new Circle({ x: 100, y: 100 }, 55),
      angles: new ArcAngles(Math.PI / 4, Math.PI / 2, AngleOrientation.POSITIVE).flip_y(),
      tip: 0b0000,
      tail: 0b0001,
    })

    this.primitive = group(
      style(Style.lines(Oklch.grey(0.5), 2), circle),
      style(Style.lines(Color.CYAN, 2), arc, arc2, arc3),
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
