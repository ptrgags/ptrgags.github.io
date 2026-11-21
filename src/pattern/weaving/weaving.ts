import type p5 from 'p5'
import { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group } from '../../lib/primitives/shorthand.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { ImageLibraryP5 } from '../../lib/p5-helpers/ImageLibraryP5.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Index2D } from '../../lib/data_structures/Grid.ts'

const IMAGES = new ImageLibraryP5({
  yarns: '/assets/tilesets/yarns4.png',
})

class WeaveScene {
  primitive: Drawable

  constructor(p: p5, images: ImageLibraryP5) {
    const weave_tileset = images.make_tilemap(
      p,
      'yarns',
      new Direction2P(16, 16),
      new Direction2P(16 * 8, 16 * 4),
    )

    const patch_horizontal = [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [4, 4, 4, 4],
      [6, 6, 6, 6],
    ]
    const patch_vertical = [
      [1, 3, 5, 7],
      [1, 3, 5, 7],
      [1, 3, 5, 7],
      [1, 3, 5, 7],
    ]

    // under strands
    weave_tileset.blit_patch(new Index2D(0, 0), patch_vertical)
    weave_tileset.blit_patch(new Index2D(0, 4), patch_horizontal)
    // over strands
    weave_tileset.blit_patch(new Index2D(0, 0), patch_horizontal)
    weave_tileset.blit_patch(new Index2D(0, 4), patch_vertical)

    this.primitive = weave_tileset
  }

  update(p: p5): void {}

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

const weaving_test = (p: p5) => {
  let scene: WeaveScene
  const lib = new DrawP5(p, IMAGES)
  p.setup = async () => {
    await IMAGES.preload(p)

    const { width, height } = SWATCH.dimensions
    p.createCanvas(width, height)
    p.pixelDensity(1)
    p.noSmooth()

    scene = new WeaveScene(p, IMAGES)

    p.noLoop()
    p.background(0)
    scene.draw(lib)
  }
}

export const SKETCHES = {
  template: weaving_test,
}
