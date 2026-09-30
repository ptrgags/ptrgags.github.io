import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'

export interface CyclicSlot {
  i: number
  angle: number
  order: number
}

export interface RepeatCyclicOptions {
  order: number
  phase?: number
  children: Drawable | Drawable[] | ((slot: CyclicSlot) => Drawable)
}

export class RepeatCyclic implements Drawable {
  readonly order: number
  readonly angle: number
  readonly children: Drawable[]

  /**
   *
   * @param order positive integer that indicates the order of the cyclic group
   * @param child_func
   */
  constructor(options: RepeatCyclicOptions) {
    this.order = options.order
    const phase = options.phase ?? 0
    this.angle = (2.0 * Math.PI) / this.order + phase

    if (typeof options.children === 'function') {
      this.children = new Array(this.order)
      for (let i = 0; i < this.order; i++) {
        this.children[i] = options.children({ i, angle: i * this.angle, order: this.order })
      }
    } else if (Array.isArray(options.children)) {
      this.children = options.children
    } else {
      // Single child is repeated automatically
      this.children = new Array(this.order).fill(options.children)
    }

    if (this.children.length !== this.order) {
      throw new Error('options.children array must be exactly order elements long')
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
