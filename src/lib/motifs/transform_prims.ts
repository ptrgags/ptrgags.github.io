// Temporary for now until I have a better transformation interface

import { Complex } from '../math/complex/Complex.ts'
import { BezierCurve } from '../primitives/BezierCurve.ts'
import { Circle } from '../primitives/Circle.ts'
import { LineSegment } from '../primitives/LineSegment.ts'
import { Path } from '../primitives/Path.ts'
import { Polyline } from '../primitives/Polyline.ts'

export function transform_segment(segment: LineSegment, f: (x: Complex) => Complex): LineSegment {
  const start = Complex.from_vec2(segment.start)
  const end = Complex.from_vec2(segment.end)
  return new LineSegment(f(start), f(end))
}

// Don't have time to do this properly right now, so hacking things together
export function transform_path(path: Path, f: (x: Complex) => Complex): Path {
  const parts = path.parts.map((part) => {
    if (part instanceof LineSegment) {
      return transform_segment(part, f)
    } else {
      const a = Complex.from_vec2(part.a)
      const b = Complex.from_vec2(part.b)
      const c = Complex.from_vec2(part.c)
      const d = Complex.from_vec2(part.d)
      return new BezierCurve(f(a), f(b), f(c), f(d))
    }
  })
  return new Path({
    parts,
    closed: path.closed,
  })
}

export function transform_polyline(polyline: Polyline, f: (x: Complex) => Complex): Polyline {
  const vertices = polyline.points.map((x) => f(Complex.from_vec2(x)))
  return new Polyline({
    vertices,
    closed: polyline.closed,
  })
}

export function transform_circle(circle: Circle, f: (x: Complex) => Complex): Circle {
  const { center } = circle
  const xformed_center = f(Complex.from_vec2(center))
  const xformed_point = f(Complex.from_vec2(circle.position(0)))
  const xformed_radius = xformed_point.sub(xformed_center).mag
  return new Circle(xformed_center, xformed_radius)
}

export function zoom_circle(circle: Circle): (x: Complex) => Complex {
  const k = new Complex(circle.radius)
  const d = Complex.from_vec2(circle.center)
  return (x) => {
    // the conj here is to handle y-down
    return k.mul(x.conj).add(d)
  }
}
