import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Style } from '../styling/Style.ts'

/**
 * Operator that applies a style to its child
 */
export class StyleOp implements Drawable {
  style: Style
  child: Drawable

  constructor(style: Style, child: Drawable) {
    this.style = style
    this.child = child
  }

  draw(lib: DrawingLibrary): void {
    lib.apply_style(this.style)
    this.child.draw(lib)
  }
}
