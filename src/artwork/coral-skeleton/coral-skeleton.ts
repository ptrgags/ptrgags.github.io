import { ATC_SCREEN } from '../../core/dimensions.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { bone2 } from '../../lib/motifs/halloween.ts'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { CoralNode, CoralTree } from '../../lib/primitives/CoralTree.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { Gridlines } from '../../lib/primitives/Gridlines.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Style } from '../../lib/styling/Style.ts'

export function circle(x: number, y: number, r: number): Circle {
  return new Circle(new Point2P(x, y), r)
}

function make_bone(parent_circle: Circle, child_circle: Circle): Drawable {
  const a = parent_circle.center
  const b = child_circle.center
  const midpoint = Point2P.lerp(a, b, 0.5)
  const ab = b.sub(a)
  const dir_ab = ab.normalize()
  const length = ab.mag()

  const min_radius = Math.min(parent_circle.radius, child_circle.radius)

  const bone_prim = bone2(0.75 * length, 4 /*0.25 * min_radius*/)

  const orient_bone = new Rigid({
    translation: midpoint,
    rotation: Math.atan2(dir_ab.y, dir_ab.x),
  })

  return xform(orient_bone, bone_prim)
}

function* make_bones(root: CoralNode): Generator<Drawable> {
  for (const child of root.children) {
    yield make_bone(root.circle, child.circle)
    yield* make_bones(child)
  }
}

function coral_tree(): Drawable {
  // This loosely follows a sketch I have on paper
  const tree = new CoralTree(
    // Base of the coral
    new CoralNode(circle(250, 650, 64), [
      // Parent node of bottom branches
      new CoralNode(circle(250, 550, 16), [
        new CoralNode(
          circle(300, 525, 24),
          [
            // A
            new CoralNode(circle(400, 600, 24)),
            new CoralNode(circle(350, 500, 24), [
              new CoralNode(circle(425, 500, 24), [
                // B
                new CoralNode(circle(475, 450, 24)),
              ]),
              // C
              new CoralNode(circle(400, 400, 24)),
            ]),
          ],
          { left: true, between: [true], right: true },
        ),
        // Parent node of top branches
        new CoralNode(circle(250, 350, 32), [
          new CoralNode(circle(325, 375, 16), [
            // D
            new CoralNode(circle(375, 325, 24)),
          ]),
          new CoralNode(circle(300, 300, 24), [
            new CoralNode(circle(350, 275, 16), [
              // E
              new CoralNode(circle(375, 225, 24)),
            ]),
            new CoralNode(circle(300, 200, 24), [
              // F
              new CoralNode(circle(375, 175, 16), [new CoralNode(circle(400, 125, 24))]),
              new CoralNode(circle(300, 150, 24), [
                // G
                new CoralNode(circle(350, 75, 24)),
                // H
                new CoralNode(circle(225, 100, 24)),
              ]),
            ]),
          ]),
          new CoralNode(circle(200, 300, 24), [
            // I
            new CoralNode(circle(250, 250, 16)),
            new CoralNode(
              circle(150, 275, 24),
              [
                // J
                new CoralNode(circle(200, 200, 24)),
                new CoralNode(
                  circle(100, 250, 24),
                  [
                    // K
                    new CoralNode(circle(150, 150, 24)),
                    new CoralNode(circle(50, 225, 32), [
                      // L
                      new CoralNode(circle(50, 150, 24)),
                    ]),
                  ],
                  { right: true, between: [true] },
                ),
              ],
              { right: true },
            ),
          ]),
        ]),
        new CoralNode(circle(175, 525, 24), [
          // M
          new CoralNode(circle(175, 450, 24)),
          new CoralNode(circle(125, 500, 24), [
            // N
            new CoralNode(circle(100, 400, 24)),
            new CoralNode(circle(50, 500, 24), [
              // O
              new CoralNode(circle(25, 400, 24)),
            ]),
          ]),
        ]),
      ]),
    ]),
  )
  const rock = Circle.from_two_points(new Point2P(250, 650), new Point2P(250, 2000))

  const bones = make_bones(tree.root).toArray()

  return group(
    // reference lines, temporary
    style(
      Style.lines(Oklch.grey(0.5)),
      new Gridlines({ bounds: ATC_SCREEN, x_spacing: 25, y_spacing: 25 }),
    ),
    style(
      Style.lines(Color.WHITE, 2),
      new Gridlines({ bounds: ATC_SCREEN, x_spacing: 100, y_spacing: 100 }),
    ),
    // -----------------------

    style(Style.lines(new Oklch(0.8264, 0.1, 131.93), 4), tree.render()),
    style(Style.DEFAULT_LINES, tree.debug_render()),
    style(Style.flat(Color.WHITE), ...bones),
    style(Style.flat(Oklch.grey(0.5)), rock),
  )
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, coral_tree()),
}
