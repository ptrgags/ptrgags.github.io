import p5 from 'p5'
import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import { DrawingP5 } from './DrawingP5.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { Tilemap } from '../pixel/Tilemap.ts'
import { Image } from '../pixel/Image.ts'
import { Sprite } from '../pixel/Sprite.ts'

/**
 * Map of image ID to URL for an image
 */
export type ImageManifest = { [id: string]: string }

export class ImageLibraryP5 {
  manifest: ImageManifest
  images: { [id: string]: p5.Image | p5.Graphics }
  next_gfx_id: number = 0

  /**
   * Constructor
   * @param manifest Dictionary of image ID to URL for an image
   */
  constructor(manifest: ImageManifest) {
    this.manifest = manifest
    this.images = {}
  }

  /**
   * Await this in setup()
   * @param p
   */
  async preload(p: p5) {
    const promises = []

    for (const [id, url] of Object.entries(this.manifest)) {
      const load_func = async () => {
        this.images[id] = await p.loadImage(url)
      }
      promises.push(load_func())
    }
    await Promise.all(promises)
  }

  register_gfx(gfx: p5.Graphics): string {
    const id = `_gfx-${this.next_gfx_id}`
    this.next_gfx_id++
    this.images[id] = gfx
    return id
  }

  /**
   * Get a p5 Image from the library. This must be called in setup() or later
   * timing-wise.
   * @param image_id Image ID. It must match one of the keys of the manifest
   * @returns The loaded image
   */
  get_p5_image(image_id: string): p5.Image | p5.Graphics {
    const img = this.images[image_id]
    if (!img) {
      throw new Error(`unknown image ID ${image_id}`)
    }
    return img
  }

  make_image(image_id: string): Image {
    const img = this.get_p5_image(image_id)
    const dimensions = new Direction2P(img.width, img.height)
    return new Image(image_id, dimensions)
  }

  make_sprite(
    image_id: string,
    frame_size: Dimensionlike,
    position: Vec2,
    frame_id: number = 0,
    origin: Vec2 = Point2P.ORIGIN,
  ): Sprite {
    return new Sprite({
      spritesheet_id: image_id,
      frame_size,
      position,
      frame_id,
      origin,
    })
  }

  make_tilemap(
    p: p5,
    image_id: string,
    tile_size: Dimensionlike,
    map_size: Dimensionlike,
    position = Point2P.ORIGIN,
  ): Tilemap {
    const image = this.make_image(image_id)
    return new Tilemap({
      tileset: image,
      tile_size,
      map: this.make_drawing(p, map_size, position),
    })
  }

  make_drawing(p: p5, canvas_dimensions: Dimensionlike, position = Point2P.ORIGIN): DrawingP5 {
    const { width, height } = canvas_dimensions
    const gfx = p.createGraphics(width, height)
    return new DrawingP5(gfx, position, this)
  }

  static readonly EMPTY = new ImageLibraryP5({})
}
