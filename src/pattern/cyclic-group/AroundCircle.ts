import type { Circle } from '../../lib/primitives/Circle.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import type { Pointlike } from '../../lib/primitives/Pointlike.ts'
import type { CyclicSlot } from './RepeatCyclic.ts'

export interface AroundCircleOptions {
  circle: Circle
  order: number
  phase?: number
  children: Drawable | Drawable[] | ((slot: CyclicSlot) => Drawable)
}

/**
 * Similar to `RepeatCyclic`, but this only translates the children to evenly
 * spaced spots around a given circle. it does not rotate the local coordinates
 * space.
 *
 * This is also different because you can position the circle anywhere on the
 * screen whereas `RepeatCyclic` always rotates about the current origin
 *
 * @see RepeatCyclic
 */
export class AroundCircle implements Drawable {
  readonly order: number
  readonly angle: number
  readonly phase: number
  readonly children: Drawable[]
  readonly positions: Pointlike[]

  constructor(options: AroundCircleOptions) {
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

    this.positions = new Array(this.order)
    for (let i = 0; i < this.order; i++) {
      this.positions[i] = options.circle.position(i * this.angle + this.phase)
    }

    if (this.children.length !== this.order) {
      throw new Error('options.children array must be exactly order elements long')
    }
  }

  draw(lib: DrawingLibrary): void {
    this.children.forEach((child, i) => {
      lib.push()
      const { x, y } = this.positions[i]
      lib.apply_rigid(x, y, 0, false)
      child.draw(lib)
      lib.pop()
    })
  }
}
