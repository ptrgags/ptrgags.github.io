import type p5 from 'p5'
import { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, xform } from '../../lib/primitives/shorthand.ts'
import { ATC_SCREEN, SWATCH } from '../../core/dimensions.ts'
import { ImageLibraryP5 } from '../../lib/p5-helpers/ImageLibraryP5.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Clock } from '../../lib/animation/Clock.ts'
import type { Sprite } from '../../lib/pixel/Sprite.ts'
import { Wave } from '../../lib/animation/Wave.ts'
import type { Tilemap } from '../../lib/pixel/Tilemap.ts'

const IMAGES = new ImageLibraryP5({
  // 12x11 tiles
  dungeon: '/assets/kenney/tiny-dungeon-2x.png',
})

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
    p.noSmooth()

    const scene = compute_scene(IMAGES)

    p.background(0)
    scene.draw(lib)
  }
}

// 16x16 px but I scaled up the image 2x since 16px is tiny
const TILE_SIZE = new Direction2P(32, 32)

const CLOCK = new Clock()

class PixelScene {
  chest: Sprite
  primitive: Drawable
  chest_opening_wave: Wave

  tracks: Tilemap

  constructor(p: p5, images: ImageLibraryP5) {
    this.chest = images.make_sprite('dungeon', TILE_SIZE, TILE_SIZE, 12 * 7 + 5)

    this.tracks = images.make_tilemap(p, 'dungeon', TILE_SIZE, SWATCH.dimensions)

    const l = 12 * 6 + 9
    const u = 12 * 5 + 10
    const ul = u - 1
    const ur = u + 1
    const r = 12 * 6 + 11
    const d = 12 * 7 + 10
    const dl = d - 1
    const dr = d + 1
    this.tracks.blit_all([
      [ul, u, u, u, u, u, u, ur],
      [l, 0, 0, 0, 0, 0, 0, r],
      [l, 0, 0, 0, 0, 0, 0, r],
      [l, 0, 0, 0, 0, 0, 0, r],
      [l, 0, 0, 0, 0, 0, 0, r],
      [l, 0, 0, 0, 0, 0, 0, r],
      [l, 0, 0, 0, 0, 0, 0, r],
      [dl, d, d, d, d, d, d, dr],
    ])

    this.chest_opening_wave = Wave.sine({ freq: 1.0, amp: 2 })

    this.primitive = group(this.tracks, this.chest)
  }

  update(p: p5) {
    const t = CLOCK.elapsed_time

    const frame = Math.round(this.chest_opening_wave.unipolar(t))

    this.chest.frame_id = 12 * 7 + 5 + frame
  }

  draw(lib: DrawP5) {
    this.primitive.draw(lib)
  }
}

const pixel_animation = (p: p5) => {
  let scene: PixelScene

  const lib = new DrawP5(p, IMAGES)
  p.setup = async () => {
    await IMAGES.preload(p)

    const { width, height } = SWATCH.dimensions
    p.createCanvas(width, height)
    p.pixelDensity(1)
    p.noSmooth()

    scene = new PixelScene(p, IMAGES)
  }

  p.draw = () => {
    p.background(0)

    scene.update(p)
    scene.draw(lib)
  }
}

export const SKETCHES = {
  static: pixel_test,
  animated: pixel_animation,
}
