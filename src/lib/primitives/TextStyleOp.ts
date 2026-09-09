import type { TextStyle } from '../styling/TextStyle.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'

export class TextStyleOp implements Drawable {
  text_style: TextStyle
  child: Drawable
  constructor(text_style: TextStyle, child: Drawable) {
    this.text_style = text_style
    this.child = child
  }

  draw(lib: DrawingLibrary): void {
    lib.apply_text_style(this.text_style)
    this.child.draw(lib)
  }
}
