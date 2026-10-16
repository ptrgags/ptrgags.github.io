import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { candy_corn, CANDY_CORN_STYLES, ghost, ghost_styles } from '../../lib/motifs/halloween.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { StyleLayers } from '../../lib/primitives/StyleLayers.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'

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

export const SKETCHES = {
  template: make_sketch(SWATCH.dimensions, new TEMPLATE()),
  ghost: make_static_sketch(SWATCH.dimensions, ghost_stamp()),
  candy_corn: make_static_sketch(SWATCH.dimensions, candy_corn_stamp()),
}
