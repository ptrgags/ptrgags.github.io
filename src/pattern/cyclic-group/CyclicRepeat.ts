import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'

export class CyclicRepeat implements Drawable {
  readonly order: number
  readonly angle: number
  readonly child: Drawable

  constructor(order: number, child: Drawable) {
    this.order = order
    this.angle = (2.0 * Math.PI) / order
    this.child = child
  }

  draw(lib: DrawingLibrary): void {
    for (let i = 0; i < this.order; i++) {
      lib.push()
      lib.apply_rigid(0, 0, i * this.angle, false)
      this.child.draw(lib)
      lib.pop()
    }
  }
}
