import type { DrawingLibrary } from './DrawingLibrary.ts'

/**
 * Interface for something that can be drawn with 2D graphics. This
 * interface allows drawing in a library-agnostic way, since I use
 * several (p5, SVG, PDF)
 */
export interface Drawable {
  /**
   * Draw the
   * @param lib The drawing library to use
   */
  draw(lib: DrawingLibrary): void
}

export function is_drawable(x: any): x is Drawable {
  return x.draw !== undefined
}
