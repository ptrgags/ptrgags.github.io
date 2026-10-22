import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import {
  bone,
  candy_corn,
  CANDY_CORN_STYLES,
  ghost,
  ghost_styles,
  skull,
  SKULL_STYLES,
  witch_hat,
  WITCH_HAT_STYLES,
} from '../../lib/motifs/halloween.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { StyleLayers } from '../../lib/primitives/StyleLayers.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { RepeatCyclic } from '../../lib/symmetry/RepeatCyclic.ts'
import { Complex } from '../../lib/math/complex/Complex.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { TravelingWave } from '../../lib/animation/TravellingWave.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { range } from '../../lib/math/iteration/range.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'

class TEMPLATE implements SceneP5 {
  primitive: Drawable

  constructor() {
    this.primitive = group()
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

const UNIT_CIRCLE = new Circle(SWATCH.center, 64)

function ghost_stamp(): Drawable {
  return new StyleLayers(ghost_styles(), ghost(UNIT_CIRCLE))
}

function candy_corn_stamp(): Drawable {
  const [a, b, c] = CANDY_CORN_STYLES
  return new StyleLayers([a, b, c], candy_corn(UNIT_CIRCLE))
}

function bone_stamp(): Drawable {
  return xform(
    Rigid.translation(SWATCH.center),
    style(
      Style.flat(Color.WHITE),
      new RepeatCyclic({ children: bone(20, new Circle(new Complex(48, 0), 64)), order: 5 }),
    ),
  )
}

function skull_stamp(): Drawable {
  return new StyleLayers(SKULL_STYLES, skull(UNIT_CIRCLE))
}

function witch_hat_stamp(): Drawable {
  return new StyleLayers(WITCH_HAT_STYLES, witch_hat(UNIT_CIRCLE))
}

class SpineWaveProto implements SceneP5 {
  wave: TravelingWave
  vertebrae: Rect[]
  primitive: Drawable

  constructor(num_vertebrae: number) {
    this.wave = TravelingWave.sine({
      // center of screen - half width
      bias: 128 - 32,
      amp: 32,
      freq: 0.5,
    })

    // TODO: 5 should be passed in to the constructor to control spine length
    this.vertebrae = range(num_vertebrae)
      .map((i) => {
        return Rect.from_center(new Point2P(128, 10 + i * 32), new Direction2P(64, 16))
      })
      .toArray()

    this.primitive = style(Style.flat(Color.RED), ...this.vertebrae)
  }

  update(p: p5): void {
    const t = p.frameCount / 60

    const n = this.vertebrae.length
    this.vertebrae.forEach((rect, i) => {
      const u = i / (n - 1)
      const x = this.wave.bipolar(u, t)
      const y = rect.position.y
      rect.position = new Point2P(x, y)
    })
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  template: make_sketch(SWATCH.dimensions, new TEMPLATE()),
  ghost: make_static_sketch(SWATCH.dimensions, ghost_stamp()),
  candy_corn: make_static_sketch(SWATCH.dimensions, candy_corn_stamp()),
  bone: make_static_sketch(SWATCH.dimensions, bone_stamp()),
  skull: make_static_sketch(SWATCH.dimensions, skull_stamp()),
  witch_hat: make_static_sketch(SWATCH.dimensions, witch_hat_stamp()),

  spine: make_sketch(SWATCH.dimensions, new SpineWaveProto(7)),
}
