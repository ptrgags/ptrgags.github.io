import type { Dimensionlike } from './Dimensionlike.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Pointlike } from './Pointlike.ts'

export class Rect implements Drawable {
  dimensions: Dimensionlike
  position: Pointlike

  constructor(position: Pointlike, dimensions: Dimensionlike) {
    this.position = position
    this.dimensions = dimensions
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.position
    const { width, height } = this.dimensions
    lib.rect(x, y, width, height)
  }
}
