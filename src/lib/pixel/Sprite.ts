import { Direction2P } from '../math/pga2d/Direction2P.js'
import { Point2P } from '../math/pga2d/Point2P.js'
import type { Dimensionlike } from '../primitives/Dimensionlike.js'
import type { Drawable } from '../primitives/Drawable.js'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.js'
import type { Vec2 } from '../primitives/Vec2.js'
import type { Image } from './Image.js'
import { ImageFrames } from './ImageFrames.js'

export interface SpriteOptions {
  spritesheet: Image
  frame_size: Dimensionlike
  position: Vec2
  /**
   * Frame ID (default 0)
   */
  frame_id?: number
  /**
   * Anchor point for the sprite if different than the top left corner
   */
  origin?: Vec2
}

/**
 * A sprite is an image divided into a grid of equally sized frames, indexed
 * in row-major order.
 *
 * When drawn, only the currently selected frame is rendered.
 * @implements {Primitive}
 */
export class Sprite implements Drawable {
  spritesheet: Image
  frames: ImageFrames
  position: Point2P
  origin: Point2P
  frame_id: number

  constructor(options: SpriteOptions) {
    this.spritesheet = options.spritesheet

    this.frames = new ImageFrames(this.spritesheet.dimensions, options.frame_size)

    this.position = Point2P.from_vec2(options.position)
    this.frame_id = options.frame_id ?? 0
    this.origin = options.origin ? Point2P.from_vec2(options.origin) : Point2P.ORIGIN
  }

  draw(lib: DrawingLibrary) {
    const dst_position = this.position.sub(this.origin)
    const src_rect = this.frames.get_frame(this.frame_id)
    lib.image_frame(this.spritesheet.image_id, src_rect, dst_position)
  }
}
