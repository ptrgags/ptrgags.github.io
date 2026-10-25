// Adapted from https://github.com/ptrgags/math-notebook/blob/main/artworks/src/motifs/halloween.rs

import { Complex, VSComplex } from '../math/complex/Complex.ts'
import { range } from '../math/iteration/range.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import { AngleOrientation, ArcAngles } from '../primitives/ArcAngles.ts'
import { Circle } from '../primitives/Circle.ts'
import { CircularArc } from '../primitives/CircularArc.ts'
import { LineSegment } from '../primitives/LineSegment.ts'
import { Path } from '../primitives/Path.ts'
import { group } from '../primitives/shorthand.ts'
import { type LayeredDrawable } from '../primitives/StyleLayers.ts'
import { Color } from '../styling/Color.ts'
import { Style } from '../styling/Style.ts'
import { transform_circle, transform_path, zoom_circle } from './transform_prims.ts'

export function ghost_styles(): Style[] {
  const style_body = Style.flat('#c5f2fa')
  const style_eyes_mouth = Style.flat(Color.BLACK)
  return [style_body, style_eyes_mouth, style_eyes_mouth]
}

export function ghost(circle: Circle): LayeredDrawable {
  const SIDE_HEIGHT = 1.5
  const CIRCLE_SPACING = 2.0 / 5.0
  const BOTTOM_CIRCLE_RADIUS = 1.0 / 5.0
  const head_circle = Circle.UNIT_CIRCLE
  const bottom_circles = range(5)
    .map(
      (i) =>
        new Circle(
          new Complex(((-2.0 + i) as number) * CIRCLE_SPACING, -SIDE_HEIGHT),
          BOTTOM_CIRCLE_RADIUS,
        ),
    )
    .toArray()

  const left_eye = new Circle(new Complex(-0.5, 0.0), 0.25)
  const right_eye = new Circle(new Complex(0.5, 0.0), 0.25)
  const mouth = new Circle(new Complex(0.0, -0.5), 0.125)

  const [upper, lower] = ArcAngles.SEMICIRCLES

  const ghost_body = new Path({
    parts: [
      // top of ghost head is a semi-circle
      new CircularArc(head_circle, upper),
      // Left side
      new LineSegment(Complex.ONE.neg, new Complex(-1.0, -SIDE_HEIGHT)),
      // Five semi-circles for the bottom
      new CircularArc(bottom_circles[0], lower),
      new CircularArc(bottom_circles[1], upper.reverse_orientation().swap()),
      new CircularArc(bottom_circles[2], lower),
      new CircularArc(bottom_circles[3], upper.reverse_orientation().swap()),
      new CircularArc(bottom_circles[4], lower),
      // Right side
      new LineSegment(new Complex(1.0, -SIDE_HEIGHT), Complex.ONE),
    ],
    closed: true,
  })

  const zoom = zoom_circle(circle)

  return {
    layers: [
      transform_path(ghost_body, zoom),
      group(transform_circle(left_eye, zoom), transform_circle(right_eye, zoom)),
      transform_circle(mouth, zoom),
    ],
  }
}

function lerp(a: Complex, b: Complex, t: number): Complex {
  return VSComplex.combo([1 - t, t], [a, b])
}

export const CANDY_CORN_STYLES = [
  // Yellow base
  Style.flat(new Color(255, 255, 0)),
  // Orange middle
  Style.flat(new Color(255, 127, 0)),
  // White tip
  Style.flat(new Color(255, 255, 255)),
]

/// Make a candy corn motif
/// See my [desmos sketch](https://www.desmos.com/calculator/4gidpmhf7c) for
/// an illustration
export function candy_corn(circle: Circle): LayeredDrawable {
  // Start with a triangle at the third roots of unity
  const a = Complex.ONE
  const b = Complex.from_polar(1.0, (2.0 * Math.PI) / 3)
  const c = Complex.from_polar(1.0, (4.0 * Math.PI) / 3)

  // Get points 1/3 and 2/3 along the sides to mark where
  // the colors transition
  const ab1 = lerp(a, b, 1.0 / 3.0)
  const ab2 = lerp(a, b, 2.0 / 3.0)
  const ac1 = lerp(a, c, 1.0 / 3.0)
  const ac2 = lerp(a, c, 2.0 / 3.0)

  // We want to round the corners, so compute points
  // a little inside from the corners.
  const radius = 0.1
  const scale_factor = new Complex(1.0 - 2.0 * radius)
  const center_a = scale_factor.mul(a)
  const center_b = scale_factor.mul(b)
  const center_c = scale_factor.mul(c)

  // Compute the six intersection points between the round circles
  // and the sides. Since the original triangle is equilateral,
  // these are just offsets from the rounding circle centers at
  // 60 degrees + a multiple of 120 degrees.
  const offset_ab = Complex.from_polar(radius, Math.PI / 3)
  const offset_bc = new Complex(-radius)
  const offset_ca = Complex.from_polar(radius, -Math.PI / 3)
  const isx_a_ab = center_a.add(offset_ab)
  const isx_b_ab = center_b.add(offset_ab)
  const isx_b_bc = center_b.add(offset_bc)
  const isx_c_bc = center_c.add(offset_bc)
  const isx_c_ca = center_c.add(offset_ca)
  const isx_a_ca = center_a.add(offset_ca)

  // Compute the line segments in counterclockwise order
  const line_a_ab1 = new LineSegment(isx_a_ab, ab1)
  const line_ab1_ab2 = new LineSegment(ab1, ab2)
  const line_ab2_b = new LineSegment(ab2, isx_b_ab)
  const line_bc = new LineSegment(isx_b_bc, isx_c_bc)
  const line_c_ac2 = new LineSegment(isx_c_ca, ac2)
  const line_ac2_ac1 = new LineSegment(ac2, ac1)
  const line_ac1_a = new LineSegment(ac1, isx_a_ca)

  // Compute the arcs for the corners
  const circle_a = new Circle(center_a, radius)
  const circle_b = new Circle(center_b, radius)
  const circle_c = new Circle(center_c, radius)
  const angles_a = new ArcAngles(-Math.PI / 3, Math.PI / 3, AngleOrientation.POSITIVE)
  const angles_b = new ArcAngles(Math.PI / 3, Math.PI, AngleOrientation.POSITIVE)
  const angles_c = new ArcAngles(-Math.PI, -Math.PI / 3, AngleOrientation.POSITIVE)
  const arc_a = new CircularArc(circle_a, angles_a)
  const arc_b = new CircularArc(circle_b, angles_b)
  const arc_c = new CircularArc(circle_c, angles_c)

  // Compute arcs dividing the 3 parts of the candy corn
  const len_ab = b.sub(a).mag
  const radius1 = len_ab / 3.0
  const radius2 = 2.0 * radius1
  const circle1 = new Circle(a, radius1)
  const circle2 = new Circle(a, radius2)
  const divider_angles = new ArcAngles(
    (5.0 * Math.PI) / 6,
    (7.0 * Math.PI) / 6,
    AngleOrientation.POSITIVE,
  )
  const arc1 = new CircularArc(circle1, divider_angles)
  const arc2 = new CircularArc(circle2, divider_angles)

  // Build the three parts of the candy corn
  const base = new Path({
    parts: [line_ab2_b, arc_b, line_bc, arc_c, line_c_ac2, arc2.reverse()],
    closed: true,
  })
  const mid = new Path({ parts: [line_ab1_ab2, arc2, line_ac2_ac1, arc1.reverse()], closed: true })
  const tip = new Path({ parts: [arc_a, line_a_ab1, arc1, line_ac1_a], closed: true })

  const zoom = zoom_circle(circle)

  return { layers: [base, mid, tip].map((x) => transform_path(x, zoom)) }
}

/// Create a vertical cartoon bone that fits in [-2, 2] x [- (length/2 + 1), (length/2 + 1)]
/// see https://www.desmos.com/calculator/tabdjja814
///
/// Since that's rather large, this shrinks the result down so the epiphyses
/// are at -i and i. So the length parameter really determines the length
/// to width ratio in practice.
export function bone(length: number, circle: Circle): Path {
  const half_width = Complex.ONE
  const half_height = new Complex(0.0, 0.5 * length)

  // Create four 3/4 circles of radius 1 at the corners of the rectangle. These
  // circles will stick out a little bit. apparently that part of a bone
  // is called an "epiphysis"
  const center_top_right = half_width.add(half_height)
  const center_bottom_left = center_top_right.neg
  const center_top_left = center_bottom_left.conj
  const center_bottom_right = center_top_right.conj

  const circle_top_left = new Circle(center_top_left, 1.0)
  const circle_top_right = new Circle(center_top_right, 1.0)
  const circle_bottom_left = new Circle(center_bottom_left, 1.0)
  const circle_bottom_right = new Circle(center_bottom_right, 1.0)

  const angles_top_left = new ArcAngles(0.0, (3.0 * Math.PI) / 2, AngleOrientation.POSITIVE)
  const angles_top_right = new ArcAngles(-Math.PI / 2, Math.PI, AngleOrientation.POSITIVE)
  const angles_bottom_left = new ArcAngles(Math.PI / 2, 2 * Math.PI, AngleOrientation.POSITIVE)
  const angles_bottom_right = new ArcAngles(-Math.PI, Math.PI / 2, AngleOrientation.POSITIVE)
  const arc_top_left = new CircularArc(circle_top_left, angles_top_left)
  const arc_top_right = new CircularArc(circle_top_right, angles_top_right)
  const arc_bottom_left = new CircularArc(circle_bottom_left, angles_bottom_left)
  const arc_bottom_right = new CircularArc(circle_bottom_right, angles_bottom_right)

  const left_side = new LineSegment(
    center_top_left.sub(Complex.I),
    center_bottom_left.add(Complex.I),
  )
  const right_side = new LineSegment(
    center_bottom_right.add(Complex.I),
    center_top_right.sub(Complex.I),
  )

  // the bone line's connected to the bone arc
  // the bone arc's connected to the bone arc... 🎵
  const big_bone = new Path({
    parts: [right_side, arc_top_right, arc_top_left, left_side, arc_bottom_left, arc_bottom_right],
    closed: true,
  })

  const zoom = zoom_circle(circle)
  const shrink = new Complex(2 / length)
  return transform_path(big_bone, (x) => {
    return zoom(shrink.mul(x))
  })
}

export function bone2(length: number, radius: number): Path {
  const circle_top_left = new Circle(new Complex(0, -radius), radius)
  const circle_top_right = new Circle(new Complex(length, -radius), radius)
  const circle_bottom_left = new Circle(new Complex(0, radius), radius)
  const circle_bottom_right = new Circle(new Complex(length, radius), radius)

  // tracing counterclockwise from the top left circle
  const arc_top_left = new CircularArc(
    circle_top_left,
    new ArcAngles(0, (-3 * Math.PI) / 2, AngleOrientation.NEGATIVE),
  )
  const arc_bottom_left = new CircularArc(
    circle_bottom_left,
    new ArcAngles((3 * Math.PI) / 2, 0, AngleOrientation.NEGATIVE),
  )
  const arc_bottom_right = new CircularArc(
    circle_bottom_right,
    new ArcAngles(Math.PI, (-3 * Math.PI) / 2, AngleOrientation.NEGATIVE),
  )
  const arc_top_right = new CircularArc(
    circle_top_right,
    new ArcAngles(Math.PI / 2, -Math.PI, AngleOrientation.NEGATIVE),
  )

  const side_bottom = new LineSegment(
    new Point2P(radius, radius),
    new Point2P(length - radius, radius),
  )
  const side_top = new LineSegment(
    new Point2P(length - radius, -radius),
    new Point2P(radius, -radius),
  )

  return new Path({
    parts: [arc_top_left, arc_bottom_left, side_bottom, arc_bottom_right, arc_top_right, side_top],
    closed: true,
  })
}

export const WITCH_HAT_STYLES = [Style.lines('#9261ba', 2), Style.lines('#ffff00', 2)]

/// Create a motif shaped like a witch's hat.
/// It's normalized so it fits in the unit circle
export function witch_hat(circle: Circle): LayeredDrawable {
  // The circles can be found at https://www.desmos.com/calculator/nrdpneh58g
  // The brim of the hat is made from 3 circular arcs
  const circle_brim_bottom = new Circle(Complex.ZERO, 2.0)
  const circle_brim_left = new Circle(Complex.ONE.neg, 1.0)
  const circle_brim_right = new Circle(Complex.ONE, 1.0)
  // This hat is very pointy! in fact the angle at the point is 0!
  const circle_point_bottom = new Circle(new Complex(2.0, 1.0), 1.0)
  const circle_point_top = new Circle(new Complex(1.0, 1.0), 2.0)

  // Outline the outside of the hat
  const angles_brim_left = new ArcAngles(Math.PI / 2, Math.PI, AngleOrientation.POSITIVE)
  const angles_brim_bottom = new ArcAngles(-Math.PI, 0.0, AngleOrientation.POSITIVE)
  const angles_brim_right = new ArcAngles(0.0, Math.PI / 2, AngleOrientation.POSITIVE)
  const angles_point_bottom = new ArcAngles(Math.PI, 0.0, AngleOrientation.NEGATIVE)
  const angles_point_top = new ArcAngles(0.0, Math.PI, AngleOrientation.POSITIVE)
  const arc_brim_left = new CircularArc(circle_brim_left, angles_brim_left)
  const arc_brim_bottom = new CircularArc(circle_brim_bottom, angles_brim_bottom)
  const arc_brim_right = new CircularArc(circle_brim_right, angles_brim_right)
  const arc_point_bottom = new CircularArc(circle_point_bottom, angles_point_bottom)
  const arc_point_top = new CircularArc(circle_point_top, angles_point_top)
  const outside = new Path({
    parts: [arc_brim_left, arc_brim_bottom, arc_brim_right, arc_point_bottom, arc_point_top],
    closed: true,
  })

  // Add a band in the middle in a different color to make it look more
  // like a hat
  const circle_band_top = new Circle(new Complex(0.0, 2.0), Math.SQRT2)
  const circle_band_bottom = new Circle(Complex.I, Math.SQRT2)

  const angles_band = new ArcAngles(-Math.PI / 4, (-3.0 * Math.PI) / 4, AngleOrientation.NEGATIVE)
  const arc_band_top = new CircularArc(circle_band_top, angles_band)
  const band_left = new LineSegment(new Complex(-1.0, 1.0), Complex.ONE.neg)
  const arc_band_bottom = new CircularArc(
    circle_band_bottom,
    angles_band.reverse_orientation().swap(),
  )
  const band_right = new LineSegment(Complex.ONE, new Complex(1.0, 1.0))

  const band = new Path({
    parts: [arc_band_top, band_left, arc_band_bottom, band_right],
    closed: true,
  })

  // TODO: scale down everything
  const zoom = zoom_circle(circle)
  const shrink = new Complex(0.25)
  const transform_point = (x: Complex) => {
    return zoom(shrink.mul(x))
  }

  return {
    layers: [transform_path(outside, transform_point), transform_path(band, transform_point)],
  }
}
