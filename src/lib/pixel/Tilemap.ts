import { Index2D } from '../data_structures/Grid.ts'
import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import type { Drawing } from './Drawing.ts'
import type { Image } from './Image.ts'
import { ImageFrames } from './ImageFrames.ts'

/**
 * Check if a patch of tiles will fit in the buffer and that there
 * are no mismatched row lengths
 * @param {Direction} grid_dimensions How many tiles wide/tall is the tilemap
 * @param {Index2D} dst_coord The top left corner of where the patch will be pasted
 * @param {number[][]} src_indices
 */
function check_patch(grid_dimensions: Dimensionlike, dst_coord: Index2D, src_indices: number[][]) {
  const { i, j } = dst_coord
  const max_width = grid_dimensions.width - j
  const max_height = grid_dimensions.height - i

  if (src_indices.length > max_height) {
    throw new Error('patch is too tall for tilemap')
  }

  for (const row of src_indices) {
    if (row.length > max_width) {
      throw new Error('patch is too wide for tilemap')
    }
  }

  if (src_indices.some((row) => row.length != src_indices[0].length)) {
    throw new Error('patch has mismatched row lengths!')
  }
}

export interface TilemapOptions {
  tileset: Image
  map: Drawing
  tile_size: Dimensionlike
}

export class Tilemap implements Drawable {
  tileset: Image
  map: Drawing
  tileset_frames: ImageFrames
  map_frames: ImageFrames

  constructor(options: TilemapOptions) {
    this.tileset = options.tileset
    this.map = options.map

    const tile_size = options.tile_size
    this.tileset_frames = new ImageFrames(this.tileset.dimensions, tile_size)
    this.map_frames = new ImageFrames(this.map.dimensions, tile_size)
  }

  get position(): Vec2 {
    return this.map.position
  }

  set position(value: Vec2) {
    this.map.position = value
  }

  blit_tile(dst_coords: Index2D, src_index: number) {
    const dst_rect = this.map_frames.get_frame_2d(dst_coords)
    const src_rect = this.tileset_frames.get_frame(src_index)

    const lib = this.map.lib
    lib.image_frame(this.tileset.image_id, src_rect, dst_rect.position)
  }

  blit_patch(dst_coord: Index2D, src_indices: number[][]) {
    check_patch(this.map_frames.grid_dimensions, dst_coord, src_indices)
    const { i: start_row, j: start_col } = dst_coord

    const lib = this.map.lib
    for (const [d_row, row] of src_indices.entries()) {
      for (const [d_col, index] of row.entries()) {
        const dst_rect = this.map_frames.get_frame_2d(
          new Index2D(start_row + d_row, start_col + d_col),
        )
        const src_rect = this.tileset_frames.get_frame(index)

        lib.image_frame(this.tileset.image_id, src_rect, dst_rect.position)
      }
    }
  }

  /**
   * Blit tiles for the entire map at once.
   * @param src_indices 2D array of tile indices. It must match the full grid dimensions
   */
  blit_all(src_indices: number[][]) {
    const dimensions = this.map_frames.grid_dimensions
    if (
      src_indices.length !== dimensions.y ||
      src_indices.some((row) => row.length !== dimensions.x)
    ) {
      throw new Error('src_indices must match tilemap size!')
    }

    this.blit_patch(new Index2D(0, 0), src_indices)
  }

  draw(lib: DrawingLibrary): void {
    this.map.draw(lib)
  }
}
