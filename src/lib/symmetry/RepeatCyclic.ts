import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { SymmetryNode } from './SymmetryNode.ts'

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

export class RepeatCyclic implements Drawable {
  primitive: SymmetryNode

  constructor(options: RepeatCyclicOptions) {
    const order = options.order
    const phase = options.phase ?? 0
    const angle_step = (2.0 * Math.PI) / order

    const transformations = new Array(order)
    for (let i = 0; i < order; i++) {
      transformations[i] = Rigid.rotation(i * angle_step + phase)
    }

    let children: Drawable | Drawable[]
    if (typeof options.children === 'function') {
      children = new Array(order)
      for (let i = 0; i < order; i++) {
        children[i] = options.children({ i, angle: i * angle_step + phase, order })
      }
    } else {
      children = options.children
    }

    this.primitive = new SymmetryNode(transformations, children)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
