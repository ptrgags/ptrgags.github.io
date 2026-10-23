import { Complex } from '../math/complex/Complex.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import { AngleOrientation, ArcAngles } from '../primitives/ArcAngles.ts'
import { CircularArc } from '../primitives/CircularArc.ts'
import { LineSegment } from '../primitives/LineSegment.ts'
import type { LayeredDrawable } from '../primitives/StyleLayers.ts'
import { Color } from '../styling/Color.ts'
import { Style } from '../styling/Style.ts'
import { Circle } from '../primitives/Circle.ts'
import { group } from '../primitives/shorthand.ts'
import {
  transform_circle,
  transform_path,
  transform_segment,
  zoom_circle,
} from './transform_prims.ts'
import { Path } from '../primitives/Path.ts'
import { range } from '../math/iteration/range.ts'
import { Rect } from '../primitives/Rect.ts'
import { Direction2P } from '../math/pga2d/Direction2P.ts'

export const SKULL_STYLES = [
  // body
  new Style({
    fill: Color.WHITE,
    stroke: Color.BLACK,
    width: 2,
  }),
  // eyes
  Style.flat(Color.BLACK),
  // lines for the teeth
  Style.lines(Color.BLACK, 2),
]

/// Create a skull motif that _nearly_ fits in the unit circle. the teeth
/// stick out a tiny bit.
export function skull(circle: Circle): LayeredDrawable {
  const top_circle = new Circle(Point2P.ORIGIN, 2.0)
  const left_circle = new Circle(Complex.ONE.neg, 1.0)
  const right_circle = new Circle(Complex.ONE, 1.0)

  const angles_top = new ArcAngles(0.0, Math.PI, AngleOrientation.POSITIVE)
  const angles_left = new ArcAngles(Math.PI, (3.0 * Math.PI) / 2, AngleOrientation.POSITIVE)
  const angles_right = new ArcAngles(-Math.PI / 2, 0.0, AngleOrientation.POSITIVE)
  const arc_top = new CircularArc(top_circle, angles_top)
  const arc_left = new CircularArc(left_circle, angles_left)
  const arc_right = new CircularArc(right_circle, angles_right)

  const teeth_left = new Complex(-1.0, -1)
  const teeth_spacing = 0.5
  const bottom_offset = Complex.I.neg
  const teeth_bottom = new LineSegment(
    teeth_left.add(bottom_offset),
    teeth_left.add(new Complex(4 * teeth_spacing)).add(bottom_offset),
  )
  const teeth_verticals = range(5)
    .map((i) => {
      const x_offset = new Complex(teeth_spacing * i)
      return new LineSegment(teeth_left.add(x_offset), teeth_left.add(bottom_offset).add(x_offset))
    })
    .toArray()

  const EYE_RADIUS: number = 0.5
  const EYE_X: number = 0.8
  const EYE_Y: number = 1.0 / 3.0
  const left_eye = new Circle(new Complex(-EYE_X, EYE_Y), EYE_RADIUS)
  const right_eye = new Circle(new Complex(EYE_X, EYE_Y), EYE_RADIUS)

  const skull = new Path({
    parts: [
      arc_right,
      arc_top,
      arc_left,
      teeth_verticals[0],
      teeth_bottom,
      teeth_verticals[4].reverse(),
    ],
    closed: false,
  })

  const zoom = zoom_circle(circle)
  const shrink = new Complex(0.5)
  const transform_point = (x: Complex) => {
    return zoom(shrink.mul(x))
  }

  const eye_circles = [left_eye, right_eye].map((x) => transform_circle(x, transform_point))
  const eyes = group(...eye_circles)

  const teeth_lines = teeth_verticals.slice(1, 4).map((x) => {
    return transform_segment(x, transform_point)
  })
  const lines = group(...teeth_lines)

  return {
    layers: [transform_path(skull, transform_point), eyes, lines],
  }
}

export const SKULL_JAW_STYLES = [
  // body
  new Style({
    fill: Color.WHITE,
    stroke: Color.BLACK,
    width: 2,
  }),
  // lines for the teeth
  Style.lines(Color.BLACK, 2),
]

export function skull_jaw(circle: Circle): LayeredDrawable {
  const body = new Rect(
    new Point2P(-0.5 * circle.radius, 0),
    new Direction2P(circle.radius, 0.5 * circle.radius),
  )

  const teeth_lines = range(1, 4)
    .map((i) => {
      const x = circle.radius * (-1 / 2 + (i * 1) / 4)
      return new LineSegment(new Point2P(x, 0), new Point2P(x, 0.25 * circle.radius))
    })
    .toArray()

  return {
    layers: [body, group(...teeth_lines)],
  }
}
