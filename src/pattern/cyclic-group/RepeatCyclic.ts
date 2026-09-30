import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'

export interface CyclicSlot {
  i: number
  angle: number
  order: number
}

export interface RepeatCyclicOptions {
  /**
   * Order of the cyclic group. E.g. when order=5 this will repeat the
   * primitive 5 times making 1/5 turns each time
   */
  order: number
  /**
   * Phase angle in radians. Defaults to 0
   */
  phase?: number
  /**
   * - If children is a single child, it will be rendered many times
   * - If children is an array, it must have `order` elements
   * - If children is a function, it will be called `order` times. This will initialize a different primitive for each sector of the circle.
   */
  children: Drawable | Drawable[] | ((slot: CyclicSlot) => Drawable)
}

/**
 * Repeat a rendering primitive several times by applying the
 * cyclic group `C_n`
 *
 * This rotates the coordinate system around the origin. If you want to
 * rotate about a different point, nest this inside a translation.
 */
export class RepeatCyclic implements Drawable {
  readonly order: number
  readonly angle: number
  readonly phase: number
  readonly children: Drawable[]

  constructor(options: RepeatCyclicOptions) {
    this.order = options.order
    this.phase = options.phase ?? 0
    this.angle = (2.0 * Math.PI) / this.order

    if (typeof options.children === 'function') {
      this.children = new Array(this.order)
      for (let i = 0; i < this.order; i++) {
        this.children[i] = options.children({
          i,
          angle: i * this.angle + this.phase,
          order: this.order,
        })
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
      lib.apply_rigid(0, 0, i * this.angle + this.phase, false)
      child.draw(lib)
      lib.pop()
    })
  }
}
