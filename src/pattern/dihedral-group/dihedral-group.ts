import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { style, xform } from '../../lib/primitives/shorthand.ts'
import { CircularArc } from '../../lib/primitives/CircularArc.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { AngleOrientation, ArcAngles } from '../../lib/primitives/ArcAngles.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { RepeatDihedral } from '../../lib/symmetry/RepeatDihedral.ts'
import { RepeatMirror } from '../../lib/symmetry/RepeatMirror.ts'
import { Color } from '../../lib/styling/Color.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import { SWATCH } from '../../core/dimensions.ts'

const START_ANGLES = new ArcAngles(Math.PI / 6, (3 * Math.PI) / 4, AngleOrientation.POSITIVE)

class DihedralGroupTest implements SceneP5 {
  arc: CircularArc
  primitive: Drawable

  constructor() {
    this.arc = new CircularArc(new Circle(new Point2P(32, 16), 32), START_ANGLES)

    const dihedral = new RepeatDihedral({
      order: 5,
      children: this.arc,
    })

    this.primitive = xform(Rigid.translation(SWATCH.center), style(Style.DEFAULT_LINES, dihedral))
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    this.arc.angles = START_ANGLES.phase_shift(2.0 * Math.PI * 0.5 * t)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

function mirror_group_test(): Drawable {
  return xform(
    Rigid.translation(SWATCH.center),
    new RepeatMirror({
      children: (slot) => {
        const color = slot.flipped ? Color.RED : Color.GREEN
        return style(
          Style.lines(color),
          new LineSegment(new Point2P(-64, 64), new Point2P(64, -64)),
        )
      },
    }),
  )
}

export const SKETCHES = {
  dihedral_flower: make_sketch(SWATCH.dimensions, new DihedralGroupTest()),
  mirror_test: make_static_sketch(SWATCH.dimensions, mirror_group_test()),
}
