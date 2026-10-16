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
} from '../../lib/motifs/halloween.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { StyleLayers } from '../../lib/primitives/StyleLayers.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { RepeatCyclic } from '../../lib/symmetry/RepeatCyclic.ts'
import { Complex } from '../../lib/math/complex/Complex.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'

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

export const SKETCHES = {
  template: make_sketch(SWATCH.dimensions, new TEMPLATE()),
  ghost: make_static_sketch(SWATCH.dimensions, ghost_stamp()),
  candy_corn: make_static_sketch(SWATCH.dimensions, candy_corn_stamp()),
  bone: make_static_sketch(SWATCH.dimensions, bone_stamp()),
  skull: make_static_sketch(SWATCH.dimensions, skull_stamp()),
}
