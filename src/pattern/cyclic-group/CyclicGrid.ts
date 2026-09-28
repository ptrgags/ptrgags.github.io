import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'

export class CyclicGrid implements Drawable {
  readonly order: number
  readonly angle: number
  readonly children: Drawable[]

  /**
   *
   * @param order positive integer that indicates the order of the cyclic group
   * @param child_func
   */
  constructor(order: number, child_func: (i: number) => Drawable) {
    this.order = order
    this.angle = (2.0 * Math.PI) / order
    this.children = new Array(order)
    for (let i = 0; i < order; i++) {
      this.children[i] = child_func(i)
    }
  }

  draw(lib: DrawingLibrary): void {
    this.children.forEach((child, i) => {
      lib.push()
      lib.apply_rigid(0, 0, i * this.angle, false)
      child.draw(lib)
      lib.pop()
    })
  }
}
