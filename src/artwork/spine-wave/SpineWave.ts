import { ATC_SCREEN } from '../../core/dimensions.ts'
import type { Animated } from '../../lib/animation/Animated.ts'
import { TravelingWave } from '../../lib/animation/TravellingWave.ts'
import { Wave } from '../../lib/animation/Wave.ts'
import { range } from '../../lib/math/iteration/range.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import {
  BONE_STYLE,
  skull,
  skull_jaw,
  SKULL_JAW_STYLES,
  SKULL_STYLES,
  tailbone,
  vertebra,
} from '../../lib/motifs/skull.ts'
import type { Circle } from '../../lib/primitives/Circle.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { StyleLayers } from '../../lib/primitives/StyleLayers.ts'
import type { TransformationOp } from '../../lib/primitives/TransformationOp.ts'

export interface SpineWaveOptions {
  unit_circle: Circle
  num_vertebrae: number
  spacing: number
}

export class SpineWave implements Animated, Drawable {
  unit_circle: Circle
  spacing: number

  jaw_wave: Wave
  spine_wave: TravelingWave
  jaw: TransformationOp
  spine: TransformationOp[]
  primitive: Drawable

  constructor(options: SpineWaveOptions) {
    const unit_circle = options.unit_circle
    this.unit_circle = unit_circle
    this.spacing = options.spacing

    const head = new StyleLayers(SKULL_STYLES, skull(unit_circle))

    this.jaw_wave = Wave.sine({
      amp: (3 / 8) * unit_circle.radius,
      freq: 0.5,
      bias: unit_circle.center.y + unit_circle.radius,
    })
    this.spine_wave = TravelingWave.sine({
      bias: unit_circle.center.x,
      amp: 0.75 * unit_circle.radius,
      freq: 0.75,
    })

    const jaw_primitive = new StyleLayers(SKULL_JAW_STYLES, skull_jaw(unit_circle))
    this.jaw = xform(Rigid.IDENTITY, jaw_primitive) as TransformationOp

    const vertebra_primitive = style(BONE_STYLE, vertebra(unit_circle))
    const tailbone_primitive = style(BONE_STYLE, tailbone(unit_circle))
    this.spine = range(options.num_vertebrae + 1)
      .map((i) => {
        const prim = i === options.num_vertebrae ? tailbone_primitive : vertebra_primitive
        return xform(Rigid.IDENTITY, prim) as TransformationOp
      })
      .toArray()

    // Since the jaw overlaps the spine, it must go at the end.
    this.primitive = group(head, group(...this.spine), this.jaw)
  }

  update(t: number): void {
    const center = this.unit_circle.center

    const jaw_y = this.jaw_wave.unipolar(t)
    this.jaw.transformation = Rigid.translation(new Direction2P(center.x, jaw_y))

    const n = this.spine.length
    this.spine.forEach((node, i) => {
      const u = i / (n - 1)
      const x = this.spine_wave.bipolar(u, t)
      const y = center.y + 2 * this.unit_circle.radius + i * this.spacing
      node.transformation = Rigid.translation(new Direction2P(x, y))
    })
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
