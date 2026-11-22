import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { vec2, type Vec2 } from '../primitives/Vec2.ts'
import { ImageFrames } from './ImageFrames.ts'

/**
 * A static image that's drawn on the screen as-is, unlike sprites and tilesets.
 * This class doesn't actually store the image data, just a reference to an
 * image by ID.
 *
 */
export class Image implements Drawable {
  image_id: string
  position: Vec2
  dimensions: Dimensionlike

  /**
   * Constructor
   * @param image_id
   * @param position
   */
  constructor(image_id: string, dimensions: Dimensionlike, position: Vec2 = vec2(0, 0)) {
    this.image_id = image_id
    this.position = position
    this.dimensions = dimensions
  }

  draw(lib: DrawingLibrary) {
    lib.image(this.image_id, this.position)
  }
}
