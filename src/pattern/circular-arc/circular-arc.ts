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
import { AngleAnnotation } from '../../lib/primitives/AngleAnnotation.ts'

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

  annotation_start: AngleAnnotation
  annotation_end: AngleAnnotation

  primitive: Drawable

  anim_start: CircularMotion
  anim_end: CircularMotion

  constructor() {
    const center = { x: 128, y: 128 }
    const circle = new Circle(center, 64)

    this.anim_start = new CircularMotion(circle, 1 / 16)
    this.anim_end = new CircularMotion(circle, 1 / 4, Math.PI / 4)

    this.pos_arc = new ArcArrow({
      circle,
      angles: new ArcAngles(0, 0, AngleOrientation.POSITIVE),
    })

    this.neg_arc = new ArcArrow({
      circle,
      angles: new ArcAngles(0, 0, AngleOrientation.NEGATIVE),
    })

    this.annotation_start = new AngleAnnotation({
      center: MAIN_CIRCLE.center,
      angle: 0,
      radius_arc: 16,
      radius_tip: 80,
    })
    this.annotation_end = new AngleAnnotation({
      center: MAIN_CIRCLE.center,
      angle: 0,
      radius_arc: 32,
      radius_tip: 80,
    })

    this.start_label = new Text('start', { x: 0, y: 0 })
    this.end_label = new Text('end', { x: 0, y: 0 })
    this.pos_label = new Text('+', { x: 0, y: 0 })
    this.neg_label = new Text('-', { x: 0, y: 0 })

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), circle, this.annotation_start, this.annotation_end),
      style(Style.lines(COLOR_POSITIVE, 2), this.pos_arc),
      style(Style.lines(COLOR_NEGATIVE, 2), this.neg_arc),
      style(Style.lines(COLOR_NEUTRAL, 2)),
      style(STYLE_LABEL_NEUTRAL, this.start_label, this.end_label),
      style(STYLE_LABEL_POSITIVE, this.pos_label),
      style(STYLE_LABEL_NEGATIVE, this.neg_label),
    )
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    // Negate the angles to compensate for p5's y-down coordinate system
    const start_angle = this.anim_start.angle(t)
    const end_angle = this.anim_end.angle(t)
    this.pos_arc.angles = new ArcAngles(start_angle, end_angle, AngleOrientation.POSITIVE)
    this.neg_arc.angles = new ArcAngles(start_angle, end_angle, AngleOrientation.NEGATIVE)

    this.annotation_start.angle = start_angle
    this.annotation_end.angle = end_angle

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

  annotation_start: AngleAnnotation
  annotation_disp: ArcArrow

  start_label: Text
  displacement_label: Text
  arc: ArcArrow
  primitive: Drawable

  static readonly WAVE_DISPLACEMENT = Wave.sine({
    amp: (2 * Math.PI) / 3,
    freq: 1 / 8,
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

    this.annotation_start = new AngleAnnotation({
      center: MAIN_CIRCLE.center,
      radius_arc: 16,
      radius_tip: 80,
      angle: 0,
    })
    this.annotation_disp = new ArcArrow({
      circle: LABEL_CIRCLE,
      angles: new ArcAngles(0, 0, AngleOrientation.POSITIVE),
      tip: ArrowParts.BOUNDARY_BOTH | ArrowParts.ARROW_BOTH,
      tail: ArrowParts.BOUNDARY_BOTH,
    })

    this.start_label = new Text('start', { x: 0, y: 0 })
    this.displacement_label = new Text('disp.', { x: 0, y: 0 })

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE, this.annotation_start, this.annotation_disp),
      style(Style.lines(COLOR_NEUTRAL, 2), this.arc),
      style(STYLE_LABEL_NEUTRAL, this.start_label, this.displacement_label),
    )
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const start_angle = this.anim_start.angle(t)
    const displacement = StartDisplacement.WAVE_DISPLACEMENT.bipolar(t)
    const end_angle = start_angle + displacement
    const orientation = displacement > 0 ? 1 : -1
    const arc_angles = new ArcAngles(start_angle, end_angle, orientation)
    this.arc.angles = arc_angles
    this.annotation_disp.angles = arc_angles

    const label_angle =
      orientation === 1
        ? start_angle + 0.5 * mod(end_angle - start_angle, 2.0 * Math.PI)
        : end_angle + 0.5 * mod(start_angle - end_angle, 2.0 * Math.PI)
    this.displacement_label.position = LABEL_CIRCLE.position(label_angle)

    this.annotation_start.angle = start_angle
    this.start_label.position = LABEL_CIRCLE_INNER.position(start_angle + Math.PI / 8)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class CenterDisplacement implements SceneP5 {
  canvas_size = { width: 256, height: 256 }
  anim_center: CircularMotion
  arc: ArcArrow
  annotation_start: AngleAnnotation
  annotation_disp: ArcArrow
  center_label: Text
  displacement_label: Text
  primitive: Drawable

  static readonly WAVE_DISPLACEMENT = Wave.sine({
    freq: 1 / 4,
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

    this.annotation_start = new AngleAnnotation({
      center: MAIN_CIRCLE.center,
      radius_arc: 16,
      radius_tip: 80,
      angle: 0,
    })
    this.annotation_disp = new ArcArrow({
      circle: LABEL_CIRCLE,
      angles: new ArcAngles(0, 0, AngleOrientation.POSITIVE),
      tip: ArrowParts.BOUNDARY_BOTH | ArrowParts.ARROW_BOTH,
      tail: ArrowParts.BOUNDARY_BOTH,
    })

    this.center_label = new Text('center', { x: 0, y: 0 })
    this.displacement_label = new Text('disp.', { x: 0, y: 0 })

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE, this.annotation_start, this.annotation_disp),
      style(Style.lines(COLOR_NEUTRAL, 2), this.arc),
      style(STYLE_LABEL_NEUTRAL, this.center_label, this.displacement_label),
    )
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const center_angle = this.anim_center.angle(t)
    const displacement = CenterDisplacement.WAVE_DISPLACEMENT.bipolar(t)
    const start_angle = center_angle - displacement
    const end_angle = center_angle + displacement
    this.arc.angles = new ArcAngles(start_angle, end_angle, Math.sign(displacement))
    this.annotation_disp.angles = new ArcAngles(
      center_angle,
      center_angle + displacement,
      Math.sign(displacement),
    )

    this.annotation_start.angle = center_angle

    this.center_label.position = LABEL_CIRCLE_INNER.position(center_angle + Math.PI / 8)
    this.displacement_label.position = LABEL_CIRCLE.position(center_angle + 0.5 * displacement)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

const WAVE_TOGGLE = Wave.square({ freq: 0.5 })

class ArcInvolution implements SceneP5 {
  canvas_size = { width: 256, height: 256 }

  arc_angles: [ArcAngles, ArcAngles]
  start_position: [Pointlike, Pointlike]
  end_position: [Pointlike, Pointlike]

  arc: ArcArrow
  label_start: Text
  label_end: Text

  primitive: Drawable
  annotation_start: AngleAnnotation
  annotation_end: AngleAnnotation

  constructor(
    transformation: 'complement' | 'flip_y' | 'other_path' | 'reverse',
    annotate: boolean,
  ) {
    // These angles may change depending on what I want to show
    const start_angle = Math.PI / 6
    const end_angle = (5 * Math.PI) / 6
    const angles_forward = new ArcAngles(start_angle, end_angle, AngleOrientation.POSITIVE)

    let angles_flipped: ArcAngles
    if (transformation === 'complement') {
      angles_flipped = angles_forward.swap()
    } else if (transformation === 'flip_y') {
      angles_flipped = angles_forward.reverse_angles()
    } else if (transformation === 'other_path') {
      angles_flipped = angles_forward.reverse_orientation()
    } else {
      angles_flipped = angles_forward.reverse_orientation().swap()
    }

    this.arc_angles = [angles_forward, angles_flipped]

    this.arc = new ArcArrow({
      circle: MAIN_CIRCLE,
      angles: angles_forward,
    })

    const start_position = LABEL_CIRCLE.position(start_angle)
    const start_position_rev = LABEL_CIRCLE.position(angles_flipped.start_angle)
    const end_position = LABEL_CIRCLE.position(end_angle)
    const end_position_rev = LABEL_CIRCLE.position(angles_flipped.end_angle)

    this.start_position = [start_position, start_position_rev]
    this.end_position = [end_position, end_position_rev]

    this.label_start = new Text('start', start_position)
    this.label_end = new Text('end', end_position)

    this.annotation_start = new AngleAnnotation({
      center: MAIN_CIRCLE.center,
      angle: 0,
      radius_arc: 16,
      radius_tip: 80,
    })
    this.annotation_end = new AngleAnnotation({
      center: MAIN_CIRCLE.center,
      angle: 0,
      radius_arc: 32,
      radius_tip: 80,
    })

    if (annotate) {
      this.primitive = group(
        style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE, this.annotation_start, this.annotation_end),
        style(Style.lines(COLOR_NEUTRAL, 2), this.arc),
        style(STYLE_LABEL_NEUTRAL, this.label_start, this.label_end),
      )
    } else {
      this.primitive = group(
        style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE),
        style(Style.lines(COLOR_NEUTRAL, 2), this.arc),
      )
    }
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const wave = WAVE_TOGGLE.unipolar(t)

    const arc_angles = this.arc_angles[wave]
    this.arc.angles = arc_angles
    this.label_start.position = this.start_position[wave]
    this.label_end.position = this.end_position[wave]

    this.annotation_start.angle = arc_angles.start_angle
    this.annotation_end.angle = arc_angles.end_angle
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class PhaseShiftRotate implements SceneP5 {
  canvas_size = { width: 256, height: 256 }

  anim_delta: CircularMotion

  arc: ArcArrow
  label_start: Text
  label_end: Text
  label_delta: Text

  primitive: Drawable
  annotation_start: AngleAnnotation
  annotation_end: AngleAnnotation
  annotation_delta: AngleAnnotation

  static readonly INIT_ANGLES = new ArcAngles(
    Math.PI / 4,
    (3 * Math.PI) / 4,
    AngleOrientation.POSITIVE,
  )

  constructor(annotate: boolean) {
    this.anim_delta = new CircularMotion(MAIN_CIRCLE, 1 / 8)

    const initial_angles = PhaseShiftRotate.INIT_ANGLES

    this.arc = new ArcArrow({
      circle: MAIN_CIRCLE,
      angles: initial_angles,
    })

    this.label_start = new Text('start', LABEL_CIRCLE.position(initial_angles.start_angle))
    this.label_end = new Text('end', LABEL_CIRCLE.position(initial_angles.end_angle))
    this.label_delta = new Text('delta', LABEL_CIRCLE.position(0))

    this.annotation_start = new AngleAnnotation({
      center: MAIN_CIRCLE.center,
      angle: initial_angles.start_angle,
      radius_arc: 16,
      radius_tip: 80,
    })
    this.annotation_end = new AngleAnnotation({
      center: MAIN_CIRCLE.center,
      angle: initial_angles.end_angle,
      radius_arc: 32,
      radius_tip: 80,
    })
    this.annotation_delta = new AngleAnnotation({
      center: MAIN_CIRCLE.center,
      angle: 0,
      radius_arc: 48,
      radius_tip: 80,
    })

    if (annotate) {
      this.primitive = group(
        style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE),
        style(Style.lines(COLOR_NEUTRAL, 2), this.arc),
        style(Style.lines(COLOR_NEGATIVE, 2), this.annotation_end),
        style(Style.lines(COLOR_POSITIVE, 2), this.annotation_start),
        style(Style.lines(COLOR_GREY, 2), this.annotation_delta),
        style(STYLE_LABEL_NEUTRAL, this.label_start, this.label_end, this.label_delta),
      )
    } else {
      this.primitive = group(
        style(Style.lines(COLOR_GREY, 2), MAIN_CIRCLE),
        style(Style.lines(COLOR_NEUTRAL, 2), this.arc),
      )
    }
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const delta = this.anim_delta.angle(t)
    const shifted_arc = PhaseShiftRotate.INIT_ANGLES.phase_shift(delta)

    this.arc.angles = shifted_arc

    this.annotation_start.angle_ref = delta
    this.annotation_end.angle_ref = delta
    this.annotation_delta.angle = delta

    this.label_delta.position = LABEL_CIRCLE.position(delta)
    this.label_start.position = LABEL_CIRCLE.position(shifted_arc.start_angle)
    this.label_end.position = LABEL_CIRCLE.position(shifted_arc.end_angle)
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

  xform_phase_shift_rotate: make_sketch(new PhaseShiftRotate(false)),
  xform_complement: make_sketch(new ArcInvolution('complement', false)),
  xform_flip_y: make_sketch(new ArcInvolution('flip_y', false)),
  xform_other_path: make_sketch(new ArcInvolution('other_path', false)),
  xform_reverse: make_sketch(new ArcInvolution('reverse', false)),

  // Symmetry animations
  symm_phase_shift_rotate: make_sketch(new PhaseShiftRotate(true)),
  symm_complement: make_sketch(new ArcInvolution('complement', true)),
  symm_flip_y: make_sketch(new ArcInvolution('flip_y', true)),
  symm_other_path: make_sketch(new ArcInvolution('other_path', true)),
  symm_reverse: make_sketch(new ArcInvolution('reverse', true)),
}
