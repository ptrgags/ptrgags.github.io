import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { CircularArc } from '../../lib/primitives/CircularArc.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { AngleOrientation, ArcAngles } from '../../lib/primitives/ArcAngles.ts'
import { Path } from '../../lib/primitives/Path.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { Style } from '../../lib/styling/Style.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'

// 20 degrees is a common value for this
const DEFAULT_PRESSURE_ANGLE = (20 * Math.PI) / 180

interface InvoluteGearOptions {
  module: number
  teeth: number
  pressure_angle?: number
}

function alpha(radius: number, base_circle_radius: number): number {
  return Math.acos(base_circle_radius / radius)
}

function involute_size(alpha: number): number {
  return Math.tan(alpha) - alpha
}

function involute_ccw(radius: number, angular_size: number): (t: number) => Vec2 {
  return (t) => {
    // TODO: fill this out
    // r_b C(t + d) + t * r_b * C(x - pi/2 + d)
    return new Point2P(0, 0)
  }
}

function involute_cw(radius: number, angular_size: number): (t: number) => Vec2 {
  return (t) => {
    // TODO: fill this out
    // r_b C(-t + d) - t * r_b * C(-x - pi/2 + d)
    return new Point2P(0, 0)
  }
}

function tooth_thickness(
  radius: number,
  module: number,
  reference_pitch_radius: number,
  base_circle_radius: number,
  pressure_angle: number,
): number {
  const s0 = Math.PI * module * 0.5
  return (
    2 *
    radius *
    ((0.5 * s0) / reference_pitch_radius +
      involute_size(pressure_angle) -
      involute_size(alpha(radius, base_circle_radius)))
  )
}

// See https://www.desmos.com/calculator/zim3g3v74v
// which further links to https://www.youtube.com/watch?v=_C8hu5aZjCA
// and https://www.youtube.com/watch?v=fpZQPr3BWcU
class InvoluteGear implements Drawable {
  primitive: Drawable

  constructor(options: InvoluteGearOptions) {
    const module = options.module
    const teeth = options.teeth
    const pressure_angle = options.pressure_angle ?? DEFAULT_PRESSURE_ANGLE
    const clearance_height = 0.25 * module
    const reference_pitch_radius = 0.5 * module * teeth
    const base_circle_radius = reference_pitch_radius * Math.cos(pressure_angle)
    const root_circle_radius = reference_pitch_radius - module - clearance_height
    const tip_circle_radius = reference_pitch_radius + module

    const reference_circle = new Circle(Point2P.ORIGIN, reference_pitch_radius)
    const base_circle = new Circle(Point2P.ORIGIN, base_circle_radius)
    const root_circle = new Circle(Point2P.ORIGIN, root_circle_radius)
    const tip_circle = new Circle(Point2P.ORIGIN, tip_circle_radius)

    const a = alpha(tip_circle_radius, base_circle_radius)

    const base_start_angle = 0
    const tooth_start_angle = involute_size(a)
    const tooth_end_angle =
      tooth_start_angle +
      tooth_thickness(
        tip_circle_radius,
        module,
        reference_pitch_radius,
        base_circle_radius,
        pressure_angle,
      )
    const base_end_angle = tooth_end_angle + tooth_start_angle
    const pitch_end_angle = (2 * Math.PI) / teeth

    const tip_arc_angles = new ArcAngles(
      tooth_start_angle,
      tooth_end_angle,
      AngleOrientation.POSITIVE,
    )
    const root_arc_angles = new ArcAngles(
      base_end_angle,
      pitch_end_angle,
      AngleOrientation.POSITIVE,
    )

    const parts = []

    for (let i = 0; i < teeth; i++) {
      // addendum
      // - involute

      // - circular arc along the top
      const tip_arc = new CircularArc(tip_circle, tip_arc_angles.phase_shift(i * pitch_end_angle))
      // - involute

      // bottom land
      const root_arc = new CircularArc(
        root_circle,
        root_arc_angles.phase_shift(i * pitch_end_angle),
      )

      parts.push(tip_arc, root_arc)
    }

    this.primitive = new Path({ parts, closed: true })
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}

function thumbnail(): Drawable {
  return style(
    Style.DEFAULT_LINES,
    xform(
      Rigid.translation(SWATCH.center),
      new InvoluteGear({
        module: 8,
        teeth: 20,
      }),
    ),
  )
}

export const SKETCHES = {
  thumbnail: make_static_sketch(SWATCH.dimensions, thumbnail()),
}
