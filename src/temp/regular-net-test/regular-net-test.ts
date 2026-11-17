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
import { Turtle } from './Turtle.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'

interface RegularPolygonNet {
  sides: number
  // the root will have sides children (or undefined to mark no child)
  // every other node will have (sides - 1) children (since one edge is shared
  // with the parent
  children?: (RegularPolygonNet | undefined)[]
}

const TRIANGULAR_PRISM: RegularPolygonNet = {
  sides: 4,
  children: [{ sides: 3 }, { sides: 4, children: [undefined, { sides: 4 }] }, { sides: 3 }],
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

function draw_outline_root(net: RegularPolygonNet, points: Vec2[], length: number) {
  const turtle = new Turtle()
  points.push(turtle.position)
  const angle = 360 / net.sides

  const children = net.children ?? []
  for (let i = 0; i < net.sides; i++) {
    const child = children[i]
    if (child !== undefined) {
      // the child polygon is upside-down, so rotate 180
      turtle.rotate(180)

      // align the turtle with the child polygon
      turtle.rotate(360 / child.sides)
      draw_outline(child, points, turtle, length)

      // we were doing things upside-down, so rotate back
      turtle.rotate(180)
    } else {
      turtle.forward(length)
      points.push(turtle.position)
    }
    turtle.rotate(angle)
  }
}

function draw_outline(net: RegularPolygonNet, points: Vec2[], turtle: Turtle, length: number) {
  const angle = 360 / net.sides

  const children = net.children ?? []
  for (let i = 0; i < net.sides - 1; i++) {
    const child = children[i]
    if (child !== undefined) {
      // the child polygon is upside-down, so rotate 180
      turtle.rotate(180)

      // align the turtle with the child polygon
      turtle.rotate(360 / child.sides)
      draw_outline(child, points, turtle, length)

      // we were doing things upside-down, so rotate back
      turtle.rotate(180)
    } else {
      turtle.forward(length)
      points.push(turtle.position)
    }
    turtle.rotate(angle)
  }
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

const LENGTH = 100
const PPI = 100

function net(): Drawable {
  const points: Vec2[] = []
  draw_outline_root(TRIANGULAR_PRISM, points, LENGTH)
  const outline2 = new Polyline({
    vertices: points,
    closed: true,
  })

  return xform(
    new Rigid({
      translation: new Direction2P(100, 350),
      flip: true,
    }),
    style(Style.lines(Oklch.grey(0.8), (PPI * 5) / 8), outline2),
  )
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, net()),
}
