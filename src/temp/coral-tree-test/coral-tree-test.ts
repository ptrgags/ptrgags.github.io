import type p5 from 'p5'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { CoralNode, CoralTree } from '../../lib/primitives/CoralTree.ts'

export function circle(x: number, y: number, r: number): Circle {
  return new Circle(new Point2P(x, y), r)
}

function basic_tree(): Drawable {
  const tree = new CoralTree(
    new CoralNode(circle(128, 192, 32), [
      new CoralNode(
        circle(128, 128, 16),
        [
          new CoralNode(circle(192, 128, 16)),
          new CoralNode(circle(192, 64, 16)),
          new CoralNode(circle(64, 64, 16), [new CoralNode(circle(96, 32, 8))]),
        ],
        {
          between: [true, false],
        },
      ),
    ]),
  )

  return group(
    style(Style.flat(Color.RED), tree.render()),
    style(Style.DEFAULT_LINES, tree.debug_render()),
  )
}

export const SKETCHES = {
  basics: make_static_sketch(SWATCH.dimensions, basic_tree()),
}
