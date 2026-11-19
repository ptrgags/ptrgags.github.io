import type { Drawable } from './Drawable.js'
import type { DrawingLibrary } from './DrawingLibrary.js'
import type { Vec2 } from './Vec2.js'

/**
 * Text drawn on the screen. Text styling is handled separately
 */
export class Text implements Drawable {
  text: string
  position: Vec2

  /**
   * Constructor
   * @param {string} text The text to display
   * @param {Vec2} position The position to anchor the text
   */
  constructor(text: string, position: Vec2) {
    this.text = text
    this.position = position
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.position
    lib.text(this.text, x, y)
  }
}
