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
import type { Vec2 } from '../../lib/primitives/Vec2.ts'

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

class TurtleGraphics {
  points: Point2P[]
  position: Point2P
  angle: number
  constructor() {
    this.points = [Point2P.ORIGIN]
    this.position = Point2P.ORIGIN
    this.angle = 0
  }

  forward(length: number) {
    const offset = Direction2P.from_angle(this.angle).scale(length)
    this.position = this.position.add(offset)
    this.points.push(this.position)
  }

  rotate(angle: number) {
    this.angle += angle
  }

  to_polyline(): Polyline {
    return new Polyline({ vertices: this.points, closed: true })
  }
}

function triangular_prism(): Polyline {
  const ANGLE2 = Math.PI
  const ANGLE3 = (2 * Math.PI) / 3
  const ANGLE4 = Math.PI / 2
  const LENGTH = SIDE_LENGTH

  const outline = new TurtleGraphics()
  // turn around
  outline.rotate(ANGLE2)
  // two edges of the triangle
  outline.rotate(ANGLE3)
  outline.forward(LENGTH)
  outline.rotate(ANGLE3)
  outline.forward(LENGTH)
  // turn, but don't take the last edge
  outline.rotate(ANGLE3)
  // instead turn around
  outline.rotate(ANGLE2)
  // side of second square
  outline.forward(LENGTH)
  // 3 sides of third square
  outline.forward(LENGTH)
  outline.rotate(ANGLE4)
  outline.forward(LENGTH)
  outline.rotate(ANGLE4)
  outline.forward(LENGTH)
  // another side of second square
  outline.forward(LENGTH)
  // turn towards triangle and draw two edges
  outline.rotate(ANGLE2)
  outline.rotate(ANGLE3)
  outline.forward(LENGTH)
  outline.rotate(ANGLE3)
  outline.forward(LENGTH)
  // turn around the triangle to align with the square, then turn backwards
  outline.rotate(ANGLE3)
  outline.rotate(ANGLE2)
  // turn the last corner and draw the last edge
  outline.rotate(ANGLE4)
  outline.forward(LENGTH)

  return outline.to_polyline()
}

function net(): Drawable {
  const outline = triangular_prism()

  const square = regular_polygon(4)
  const triangle = regular_polygon(3)
  return xform(Rigid.translation(new Direction2P(100, 350)), style(Style.DEFAULT_LINES, outline))
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, net()),
}
