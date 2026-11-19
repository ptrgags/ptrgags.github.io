import type { Index2D } from '../data_structures/Grid.js'
import { Direction2P } from '../math/pga2d/Direction2P.js'
import { Point2P } from '../math/pga2d/Point2P.js'
import type { Dimensionlike } from '../primitives/Dimensionlike.js'
import { Rect } from '../primitives/Rect.js'

/**
 * Class for managing frames of a spritesheet or tile
 * This only supports spritesheets/tilesets where all frames are the same size
 * and there's no spacing between frames.
 */
export class ImageFrames {
  image_dimensions: Direction2P
  frame_size: Direction2P
  grid_dimensions: Direction2P
  frame_count: number

  /**
   * Constructor
   * @param {Dimensionlike} image_dimensions Image dimensions as a direction in pixels
   * @param {Dimensionlike} frame_size Size of a single frame in pixels
   */
  constructor(image_dimensions: Dimensionlike, frame_size: Dimensionlike) {
    const { width, height } = image_dimensions
    const { width: frame_w, height: frame_h } = frame_size

    if (width % frame_w !== 0 || height % frame_h !== 0) {
      throw new Error('image_dimensions must be divisible by frame_size in both dimensions')
    }

    this.image_dimensions = Direction2P.from_dimensions(image_dimensions)
    this.frame_size = Direction2P.from_dimensions(frame_size)
    this.grid_dimensions = this.image_dimensions.div_components(this.frame_size)
    this.frame_count = this.grid_dimensions.x * this.grid_dimensions.y
  }

  /**
   * Compute the bounds of a specific frame in pixels relative to the top left
   * corner of the image
   * @param {number} frame_id
   * @returns {Rect}
   */
  get_frame(frame_id: number): Rect {
    const width = this.grid_dimensions.x
    const x = frame_id % width
    const y = Math.floor(frame_id / width)
    const position = new Point2P(x * this.frame_size.x, y * this.frame_size.y)
    return new Rect(position, this.frame_size)
  }

  /**
   * like get_frame() but indexed in 2D instead of 1D for convenience
   * @param {Index2D} frame_index The (row, col) of the frame
   * @returns {Rect} The bounds for that frame
   */
  get_frame_2d(frame_index: Index2D): Rect {
    const { i, j } = frame_index
    const id = i * this.grid_dimensions.x + j
    return this.get_frame(id)
  }
}
