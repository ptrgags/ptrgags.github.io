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
import { CircularMotion } from '../../lib/math/CircularMotion.ts'
import { TextStyle } from '../../lib/styling/TextStyle.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { mod } from '../../lib/math/mod.ts'

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
    const center = { x: 128, y: 128 }

    const circle = new Circle(center, 75)

    const arc = new CircularArc(
      circle,
      new ArcAngles(Math.PI / 4, Math.PI / 2, AngleOrientation.POSITIVE).flip_y(),
    )

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
    })

    this.primitive = group(
      style(Style.lines(COLOR_GREY, 2), circle),
      style(Style.lines(COLOR_POSITIVE, 2), arc, arc2, arc3),
    )
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

const MAIN_CIRCLE = new Circle({ x: 128, y: 128 }, 64)
const LABEL_CIRCLE = new Circle(MAIN_CIRCLE.center, 96)

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
      angles: new ArcAngles(
        this.anim_start.angle(0),
        this.anim_start.angle(0),
        AngleOrientation.POSITIVE,
      ),
    })

    this.neg_arc = new ArcArrow({
      circle,
      angles: new ArcAngles(
        this.anim_start.angle(0),
        this.anim_start.angle(0),
        AngleOrientation.NEGATIVE,
      ),
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

export const SKETCHES = {
  concept: make_static_sketch(new ArcConcept()),
  start_end_orientation: make_sketch(new StartEndOrientation()),
}
