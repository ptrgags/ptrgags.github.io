import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Style } from '../../lib/styling/Style.ts'

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
  return style(Style.DEFAULT_LINES, square, triangle)
}

export const SKETCHES = {
  template: make_static_sketch(SWATCH.dimensions, net()),
}
