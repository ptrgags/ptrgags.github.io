import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Style } from '../../lib/styling/Style.ts'
import { BezierCurve } from '../../lib/primitives/BezierCurve.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Path } from '../../lib/primitives/Path.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import { CircularArc } from '../../lib/primitives/CircularArc.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { AngleOrientation, ArcAngles } from '../../lib/primitives/ArcAngles.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'

function path_test(): Drawable {
  const bezier = new BezierCurve(
    new Point2P(0, 0),
    new Point2P(128, 64),
    new Point2P(128, 192),
    new Point2P(0, 256),
  )

  const polygon = new Polyline({
    vertices: Point2P.from_pairs([
      [128, 0],
      [192, 64],
      [256, 0],
      [256, 128],
      [192, 192],
      [128, 128],
    ]),
    closed: true,
  })

  const path = new Path({
    parts: [
      new LineSegment(new Point2P(256, 128), new Point2P(256, 256)),
      new BezierCurve(
        new Point2P(256, 256),
        new Point2P(192, 256 + 64),
        new Point2P(192, 256 - 64),
        new Point2P(128, 256),
      ),
      new LineSegment(new Point2P(128, 256), new Point2P(128, 128)),
      new BezierCurve(
        new Point2P(128, 128),
        new Point2P(192, 128 - 64),
        new Point2P(192, 128 + 64),
        new Point2P(256, 128),
      ),
    ],
    closed: true,
  })

  return group(
    style(Style.lines(Color.CYAN), bezier.control_polyline),
    style(Style.DEFAULT_LINES, bezier),
    style(Style.flat(Color.YELLOW), polygon),
    style(Style.flat(Color.RED), xform(Rigid.translation(new Direction2P(-64, 0)), path)),
  )
}

function arc_test(): Drawable {
  const arc = new CircularArc(
    new Circle(new Point2P(180, 180), 64),
    new ArcAngles(0, (5 * Math.PI) / 4, AngleOrientation.POSITIVE),
  )

  const arc_path = new Path({
    parts: [arc],
    closed: false,
  })

  const negative_arc = new CircularArc(
    new Circle(new Point2P(180, 180), 32),
    new ArcAngles(Math.PI / 4, -Math.PI / 2, AngleOrientation.NEGATIVE),
  )
  const negative_path = new Path({
    parts: [negative_arc],
    closed: false,
  })

  const circle = new Circle(new Point2P(64, 64), 48)
  const beziers = [
    ...arc.to_bezier_curves(),
    ...circle.to_bezier_curves(),
    ...negative_arc.to_bezier_curves(),
  ]

  const control_lines = group(...beziers.map((x) => x.control_polyline))

  const circle_path = new Path({
    parts: circle.to_bezier_curves(),
    closed: true,
  })
  return group(
    style(Style.lines(Oklch.grey(0.5), 8), circle, arc.circle, negative_arc.circle),
    style(Style.lines(Oklch.grey(0.75), 2), control_lines),
    style(Style.lines(Color.GREEN, 2), arc_path, circle_path, negative_path),
  )
}

export const SKETCHES = {
  path_test: make_static_sketch(SWATCH.dimensions, path_test()),
  arc_test: make_static_sketch(SWATCH.dimensions, arc_test()),
}
