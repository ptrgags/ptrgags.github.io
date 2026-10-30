import { ATC_SCREEN } from '../../core/dimensions.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { CoralNode, CoralTree } from '../../lib/primitives/CoralTree.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Style } from '../../lib/styling/Style.ts'

export function circle(x: number, y: number, r: number): Circle {
  return new Circle(new Point2P(x, y), r)
}

function coral_tree(): Drawable {
  const tree = new CoralTree(
    new CoralNode(circle(250, 600, 64), [
      new CoralNode(circle(250, 500, 48), [
        new CoralNode(circle(250, 400, 32), [
          new CoralNode(circle(450, 350, 32)),
          new CoralNode(circle(250, 200, 32)),
        ]),
        new CoralNode(circle(50, 400, 32)),
      ]),
    ]),
  )
  const rock = circle(250, 1000, 400)

  return group(
    style(Style.lines(new Oklch(0.8264, 0.1, 131.93), 4), tree.render()),
    style(Style.DEFAULT_LINES, tree.debug_render()),
    style(Style.flat(Oklch.grey(0.5)), rock),
  )
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, coral_tree()),
}
