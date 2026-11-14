import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { ATC_SCREEN, SWATCH } from '../../core/dimensions.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'

const TRIANGULAR_PRISM = {
  sides: 4,
  children: [{ sides: 3 }, { sides: 4, children: [{ sides: 4 }] }, { sides: 3 }],
}

const SIDE_LENGTH = 100

function regular_polygon(sides: number): Polyline {
  let position = Point2P.ORIGIN

  const vertices = []
  for (let i = 0; i < sides; i++) {
    vertices.push(position)
    const direction = Direction2P.from_angle((i * 2 * Math.PI) / sides)
    position = position.add(direction.scale(SIDE_LENGTH))
  }

  return new Polyline({ vertices, closed: true })
}

function net(): Drawable {
  const square = regular_polygon(4)
  const triangle = regular_polygon(3)
  return xform(
    Rigid.translation(ATC_SCREEN.center),

    style(Style.DEFAULT_LINES, square, triangle),
  )
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, net()),
}
