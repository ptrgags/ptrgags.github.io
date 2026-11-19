import type p5 from 'p5'
import { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, xform } from '../../lib/primitives/shorthand.ts'
import { ATC_SCREEN, SWATCH } from '../../core/dimensions.ts'
import { ImageLibraryP5 } from '../../lib/p5-helpers/ImageLibraryP5.ts'

const IMAGES = new ImageLibraryP5({
  dungeon: '/assets/kenney/tiny-dungeon.png',
})

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

function compute_scene(images: ImageLibraryP5): Drawable {
  const spritesheet = images.make_image('dungeon')

  return group(spritesheet)
}

const pixel_test = (p: p5) => {
  const lib = new DrawP5(p, IMAGES)
  p.setup = async () => {
    await IMAGES.preload(p)

    const { width, height } = ATC_SCREEN.dimensions
    p.createCanvas(width, height)
    p.pixelDensity(1)
    p.noLoop()

    const scene = compute_scene(IMAGES)

    p.background(0)
    scene.draw(lib)
  }
}

export const SKETCHES = {
  template: pixel_test,
}
