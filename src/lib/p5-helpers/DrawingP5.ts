import p5 from 'p5'
import { Point2P } from '../math/pga2d/Point2P.js'
import type { Drawable } from '../primitives/Drawable.js'
import type { Vec2 } from '../primitives/Vec2.js'
import { DrawP5 } from './DrawP5.js'
import type { ImageLibraryP5 } from './ImageLibraryP5.js'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.js'
import type { Drawing } from '../pixel/Drawing.js'
import type { Dimensionlike } from '../primitives/Dimensionlike.js'
import { Direction2P } from '../math/pga2d/Direction2P.js'

/**
 * Offscreen graphics object. This wraps p5.Graphics, but adapts it to the
 * primitive system
 */
export class DrawingP5 implements Drawing {
  p5_gfx: p5.Graphics
  image_id: string
  lib: DrawP5
  position: Point2P
  readonly dimensions: Dimensionlike

  /**
   * Constructor
   * @param p5_gfx
   * @param position
   * @param image_library pass in the image library
   */
  constructor(p5_gfx: p5.Graphics, position: Vec2, image_library: ImageLibraryP5) {
    this.p5_gfx = p5_gfx
    this.image_id = image_library.register_gfx(p5_gfx)
    this.lib = new DrawP5(p5_gfx, image_library)
    this.position = Point2P.from_vec2(position)
    this.dimensions = new Direction2P(p5_gfx.width, p5_gfx.height)
  }

  clear() {
    this.p5_gfx.reset()
  }

  draw(lib: DrawingLibrary) {
    lib.image(this.image_id, this.position)
  }
}
