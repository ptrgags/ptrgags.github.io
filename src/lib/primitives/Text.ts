import type { Drawable } from './Drawable.js'
import type { DrawingLibrary } from './DrawingLibrary.js'
import type { Pointlike } from './Pointlike.js'

/**
 * Text drawn on the screen. Text styling is handled separately
 */
export class Text implements Drawable {
  text: string
  position: Pointlike

  /**
   * Constructor
   * @param {string} text The text to display
   * @param {Pointlike} position The position to anchor the text
   */
  constructor(text: string, position: Pointlike) {
    this.text = text
    this.position = position
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.position
    lib.text(this.text, x, y)
  }
}
