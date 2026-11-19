import type { Style } from '../styling/Style.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'

function check_layer_counts(styles: Style[], children: LayeredDrawable[]) {
  const n = styles.length
  for (const child of children) {
    if (child.layers.length !== n) {
      throw new Error(`expected child with ${n} layers, got one with ${child.layers.length}`)
    }
  }
}

export interface LayeredDrawable {
  get layers(): Drawable[]
}

export class StyleLayers implements Drawable {
  styles: Style[]
  children: LayeredDrawable[]

  constructor(styles: Style[], ...children: LayeredDrawable[]) {
    check_layer_counts(styles, children)

    this.styles = styles
    this.children = children
  }

  draw(lib: DrawingLibrary): void {
    this.styles.forEach((style, i) => {
      lib.begin_style(style)
      this.children.forEach((child) => {
        child.layers[i].draw(lib)
      })
      lib.end_style()
    })
  }
}
