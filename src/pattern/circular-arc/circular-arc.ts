import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { CircularArc } from '../../lib/primitives/CircularArc.ts'
import { AngleOrientation, ArcAngles } from '../../lib/primitives/ArcAngles.ts'
import { Color } from '../../lib/styling/Color.ts'
import { ArcArrow, ArrowParts } from '../../lib/primitives/ArcArrow.ts'
import { CircularMotion } from '../../lib/animation/CircularMotion.ts'
import { TextStyle } from '../../lib/styling/TextStyle.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { mod } from '../../lib/math/mod.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import type { Pointlike } from '../../lib/primitives/Pointlike.ts'
import { Wave } from '../../lib/animation/Wave.ts'

const MAIN_CIRCLE = new Circle({ x: 128, y: 128 }, 64)
const LABEL_CIRCLE = new Circle(MAIN_CIRCLE.center, 96)
const LABEL_CIRCLE_INNER = new Circle(MAIN_CIRCLE.center, 32)

const COLOR_GREY = Oklch.grey(0.5)
const COLOR_NEUTRAL = Color.WHITE
const COLOR_POSITIVE = new Oklch(0.7, 0.1, 225)
const COLOR_NEGATIVE = new Oklch(0.7, 0.1, 25)
const TEXT_STYLE_LABEL = new TextStyle(16, 'center', 'center')
const STYLE_LABEL_NEUTRAL = { style: Style.flat(COLOR_NEUTRAL), text_style: TEXT_STYLE_LABEL }
const STYLE_LABEL_POSITIVE = { style: Style.flat(COLOR_POSITIVE), text_style: TEXT_STYLE_LABEL }
const STYLE_LABEL_NEGATIVE = { style: Style.flat(COLOR_NEGATIVE), text_style: TEXT_STYLE_LABEL }

class ArcConcept implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  primitive: Drawable

  constructor() {
    const arc = new CircularArc(
      MAIN_CIRCLE,
      new ArcAngles(Math.PI / 4, Math.PI / 2, AngleOrientation.POSITIVE).reverse_angles(),
    )

    // TEMP: Keeping around for reference
    /*
    const arc2 = new ArcArrow({
      circle: new Circle(center, 64),
      angles: new ArcAngles(Math.PI / 4, Math.PI / 2, AngleOrientation.POSITIVE).flip_y(),
      tip: 0b0010,
      tail: 0b0000,
    })

    const arc3 = new ArcArrow({
      circle: new Circle(center, 55),
      angles: new ArcAngles(Math.PI / 4, Math.PI / 2, AngleOrientation.POSITIVE).flip_y(),
      tip: 0b0000,
      tail: 0b0001,
    })*/

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE),
      style(Style.lines(COLOR_POSITIVE, 2), arc),
    )
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class StartEndOrientation implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  pos_arc: ArcArrow
  neg_arc: ArcArrow

  start_label: Text
  end_label: Text
  pos_label: Text
  neg_label: Text

  primitive: Drawable

  anim_start: CircularMotion
  anim_end: CircularMotion

  constructor() {
    const center = { x: 128, y: 128 }
    const circle = new Circle(center, 64)

    this.anim_start = new CircularMotion(circle, 1 / 16)
    this.anim_end = new CircularMotion(circle, -1 / 4, Math.PI / 4)

    this.pos_arc = new ArcArrow({
      circle,
      angles: new ArcAngles(0, 0, AngleOrientation.POSITIVE),
    })

    this.neg_arc = new ArcArrow({
      circle,
      angles: new ArcAngles(0, 0, AngleOrientation.NEGATIVE),
      tail: ArrowParts.BOUNDARY_LOWER | ArrowParts.BOUNDARY_UPPER,
    })

    this.start_label = new Text('start', { x: 0, y: 0 })
    this.end_label = new Text('end', { x: 0, y: 0 })
    this.pos_label = new Text('+', { x: 0, y: 0 })
    this.neg_label = new Text('-', { x: 0, y: 0 })

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), circle),
      style(Style.lines(COLOR_POSITIVE, 2), this.pos_arc),
      style(Style.lines(COLOR_NEGATIVE, 2), this.neg_arc),
      style(STYLE_LABEL_NEUTRAL, this.start_label, this.end_label),
      style(STYLE_LABEL_POSITIVE, this.pos_label),
      style(STYLE_LABEL_NEGATIVE, this.neg_label),
    )
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const start_angle = this.anim_start.angle(t)
    const end_angle = this.anim_end.angle(t)
    this.pos_arc.angles = new ArcAngles(start_angle, end_angle, AngleOrientation.POSITIVE)
    this.neg_arc.angles = new ArcAngles(start_angle, end_angle, AngleOrientation.NEGATIVE)

    this.start_label.position = LABEL_CIRCLE.position(start_angle)
    this.end_label.position = LABEL_CIRCLE.position(end_angle)

    const pos_angle = start_angle + 0.5 * mod(end_angle - start_angle, 2.0 * Math.PI)
    const neg_angle = end_angle + 0.5 * mod(start_angle - end_angle, 2.0 * Math.PI)

    this.pos_label.position = LABEL_CIRCLE.position(pos_angle)
    this.neg_label.position = LABEL_CIRCLE.position(neg_angle)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class StartDisplacement implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  anim_start: CircularMotion

  start_line: LineSegment
  start_label: Text
  displacement_label: Text
  arc: ArcArrow
  primitive: Drawable

  static readonly WAVE_DISPLACEMENT = Wave.sine({
    amp: (3 * Math.PI) / 4,
    freq: 0.25,
    // Add a little bit of bias so the displacement is never exactly 0
    // (which causes annoying flickering in this animation)
    bias: 0.0125,
  })

  constructor() {
    this.anim_start = new CircularMotion(MAIN_CIRCLE, 1 / 4)

    this.arc = new ArcArrow({
      circle: MAIN_CIRCLE,
      angles: new ArcAngles(0, 0, AngleOrientation.POSITIVE),
    })

    this.start_line = new LineSegment(MAIN_CIRCLE.center, this.anim_start.position(0))

    this.start_label = new Text('start', { x: 0, y: 0 })
    this.displacement_label = new Text('disp.', { x: 0, y: 0 })

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE),
      style(Style.lines(COLOR_NEUTRAL, 2), this.arc, this.start_line),
      style(STYLE_LABEL_NEUTRAL, this.start_label, this.displacement_label),
    )
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const start_angle = this.anim_start.angle(t)
    const displacement = StartDisplacement.WAVE_DISPLACEMENT.bipolar(t)
    const end_angle = start_angle + displacement
    const orientation = displacement > 0 ? 1 : -1
    this.arc.angles = new ArcAngles(start_angle, end_angle, orientation)

    const label_angle =
      orientation === 1
        ? start_angle + 0.5 * mod(end_angle - start_angle, 2.0 * Math.PI)
        : end_angle + 0.5 * mod(start_angle - end_angle, 2.0 * Math.PI)
    this.displacement_label.position = LABEL_CIRCLE.position(label_angle)

    this.start_label.position = LABEL_CIRCLE_INNER.position(start_angle)
    this.start_line.end = MAIN_CIRCLE.position(start_angle)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class CenterDisplacement implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  anim_center: CircularMotion
  arc: ArcArrow
  primitive: Drawable
  center_line: LineSegment

  static readonly WAVE_DISPLACEMENT = Wave.sine({
    freq: 0.5,
    amp: Math.PI / 4,
    // Add a tiny bit of phase so we don't get a displacement of exactly 0
    // (this makes the animation flicker in an annoying way)
    phase: 0.01,
  })

  constructor() {
    this.anim_center = new CircularMotion(MAIN_CIRCLE, 1 / 4)

    this.arc = new ArcArrow({
      circle: MAIN_CIRCLE,
      angles: new ArcAngles(0, 0, AngleOrientation.POSITIVE),
    })

    this.center_line = new LineSegment(MAIN_CIRCLE.center, this.anim_center.position(0))

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE),
      style(Style.lines(COLOR_NEUTRAL, 2), this.arc, this.center_line),
    )
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const center_angle = this.anim_center.angle(t)
    const displacement = CenterDisplacement.WAVE_DISPLACEMENT.bipolar(t)
    const start_angle = center_angle - displacement
    const end_angle = center_angle + displacement
    this.arc.angles = new ArcAngles(start_angle, end_angle, Math.sign(displacement))

    this.center_line.end = MAIN_CIRCLE.position(center_angle)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

const WAVE_TOGGLE = Wave.square({ freq: 0.5 })

class SwapComplement implements SceneP5 {
  canvas_size = { width: 256, height: 256 }

  arc: ArcArrow
  label_start: Text
  label_end: Text

  primitive: Drawable

  constructor() {
    this.arc = new ArcArrow({
      circle: MAIN_CIRCLE,
      angles: new ArcAngles(0, (3 * Math.PI) / 4, AngleOrientation.POSITIVE),
    })

    this.label_start = new Text('start', LABEL_CIRCLE.position(0))
    this.label_end = new Text('end', LABEL_CIRCLE.position((3 * Math.PI) / 4))

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE),
      style(Style.lines(COLOR_NEUTRAL, 2), this.arc),
      style(STYLE_LABEL_NEUTRAL, this.label_start, this.label_end),
    )
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const wave = WAVE_TOGGLE.unipolar(t)

    const start_angle = [0, (3 * Math.PI) / 4][wave]
    const end_angle = [(3 * Math.PI) / 4, 0][wave]
    this.arc.angles = new ArcAngles(start_angle, end_angle, AngleOrientation.POSITIVE)

    this.label_start.position = LABEL_CIRCLE.position(start_angle)
    this.label_end.position = LABEL_CIRCLE.position(end_angle)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class ReverseMirror implements SceneP5 {
  canvas_size = { width: 256, height: 256 }

  arc_angles: [ArcAngles, ArcAngles]
  start_position: [Pointlike, Pointlike]
  end_position: [Pointlike, Pointlike]

  arc: ArcArrow
  label_start: Text
  label_end: Text

  primitive: Drawable

  constructor() {
    const start_angle = Math.PI / 4
    const end_angle = (5 * Math.PI) / 4
    const angles_forward = new ArcAngles(start_angle, end_angle, AngleOrientation.POSITIVE)

    this.arc_angles = [angles_forward, angles_forward.reverse_angles()]

    this.arc = new ArcArrow({
      circle: MAIN_CIRCLE,
      angles: angles_forward,
    })

    const start_position = LABEL_CIRCLE.position(start_angle)
    const start_position_rev = LABEL_CIRCLE.position(-start_angle)
    const end_position = LABEL_CIRCLE.position(end_angle)
    const end_position_rev = LABEL_CIRCLE.position(-end_angle)

    this.start_position = [start_position, start_position_rev]
    this.end_position = [end_position, end_position_rev]

    this.label_start = new Text('start', start_position)
    this.label_end = new Text('end', end_position)

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE),
      style(Style.lines(COLOR_NEUTRAL, 2), this.arc),
      style(STYLE_LABEL_NEUTRAL, this.label_start, this.label_end),
    )
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const wave = WAVE_TOGGLE.unipolar(t)

    this.arc.angles = this.arc_angles[wave]
    this.label_start.position = this.start_position[wave]
    this.label_end.position = this.end_position[wave]
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  concept: make_static_sketch(new ArcConcept()),
  start_end_orientation: make_sketch(new StartEndOrientation()),
  start_displacement: make_sketch(new StartDisplacement()),
  center_displacement: make_sketch(new CenterDisplacement()),

  // Symmetry animations
  swap_complement: make_sketch(new SwapComplement()),
  reverse_mirror: make_sketch(new ReverseMirror()),
}
