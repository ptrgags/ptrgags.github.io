import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Turtle } from './Turtle.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'

export interface RegularPolygonNet {
  sides: number
  // the root will have sides children (or undefined to mark no child)
  // every other node will have (sides - 1) children (since one edge is shared
  // with the parent
  children?: (RegularPolygonNet | undefined)[]
}

function regular_polygon(sides: number, length: number): Polyline {
  let position = Point2P.ORIGIN

  const vertices = []
  for (let i = 0; i < sides; i++) {
    vertices.push(position)
    const direction = Direction2P.from_angle((i * 2 * Math.PI) / sides)
    position = position.add(direction.scale(length))
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

function draw_faces_root(net: RegularPolygonNet, output: Drawable[], length: number) {
  // I only use constructible polygons up to 12
  // see https://en.wikipedia.org/wiki/Constructible_polygon
  const polygons = [
    undefined,
    undefined,
    undefined,
    regular_polygon(3, length),
    regular_polygon(4, length),
    regular_polygon(5, length),
    regular_polygon(6, length),
    undefined,
    regular_polygon(8, length),
    undefined,
    regular_polygon(10, length),
    undefined,
    regular_polygon(12, length),
  ]

  const turtle = new Turtle()

  output.push(polygons[net.sides] as Polyline)

  const angle = 360 / net.sides
  const children = net.children ?? []
  for (let i = 0; i < net.sides; i++) {
    turtle.forward(length)

    const child = children[i]
    if (child !== undefined) {
      const turtle2 = turtle.clone()
      turtle2.rotate(180)
      draw_faces(child, output, length, turtle2, polygons)
    }

    turtle.rotate(angle)
  }
}

function draw_faces(
  net: RegularPolygonNet,
  output: Drawable[],
  length: number,
  turtle: Turtle,
  polygons: (Polyline | undefined)[],
) {
  const polygon = polygons[net.sides] as Polyline

  const rigid = turtle.get_transform()
  output.push(xform(rigid, polygon))

  // move to first boundary edge
  const angle = 360 / net.sides
  turtle.forward(length)
  turtle.rotate(angle)

  const children = net.children ?? []
  for (let i = 0; i < net.sides - 1; i++) {
    turtle.forward(length)

    const child = children[i]
    if (child !== undefined) {
      const turtle2 = turtle.clone()
      turtle2.rotate(180)
      draw_faces(child, output, length, turtle2, polygons)
    }
    turtle.rotate(angle)
  }
}

export function draw_net(
  net: RegularPolygonNet,
  side_length_px: number,
  pixels_per_inch: number,
): Drawable {
  const points: Vec2[] = []
  draw_outline_root(net, points, side_length_px)
  const outline = new Polyline({
    vertices: points,
    closed: true,
  })

  const faces: Drawable[] = []
  draw_faces_root(net, faces, side_length_px)

  const seam_allowance = (5 / 8) * pixels_per_inch

  return group(
    style(Style.lines(Oklch.grey(0.9), seam_allowance), outline),
    style(
      new Style({
        fill: Color.WHITE,
        stroke: Color.BLACK,
        width: 2,
      }),
      group(...faces),
    ),
  )
}
