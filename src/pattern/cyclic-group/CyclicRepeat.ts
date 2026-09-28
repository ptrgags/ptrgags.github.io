import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'

export class CyclicRepeat implements Drawable {
  order: number
  child: Drawable

  constructor(order: number, child: Drawable) {
    this.order = order
    this.child = child
  }

  draw(lib: DrawingLibrary): void {
    for (let i = 0; i < this.order; i++) {
      const angle = ((2.0 * Math.PI) / this.order) * i
      lib.push()
      lib.apply_rigid(0, 0, angle, false)
      this.child.draw(lib)
      lib.pop()
    }
  }
}
