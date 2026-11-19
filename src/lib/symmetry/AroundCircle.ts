import { Direction2P } from '../math/pga2d/Direction2P.ts'
import type { Circle } from '../primitives/Circle.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { SymmetryNode } from './SymmetryNode.ts'

export interface AroundCircleSlot {
  i: number
  position: Vec2
  angle: number
  order: number
}

export interface AroundCircleOptions {
  circle: Circle
  order: number
  phase?: number
  children: Drawable | Drawable[] | ((slot: AroundCircleSlot) => Drawable)
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
  primitive: SymmetryNode

  constructor(options: AroundCircleOptions) {
    const order = options.order
    const angle_step = (2.0 * Math.PI) / order
    const phase = options.phase ?? 0

    const transformations = new Array(order)
    for (let i = 0; i < order; i++) {
      const angle = i * angle_step + phase
      transformations[i] = Rigid.translation(options.circle.position(angle))
    }

    let children: Drawable | Drawable[]
    if (typeof options.children === 'function') {
      children = new Array(order)
      for (let i = 0; i < order; i++) {
        const angle = i * angle_step + phase
        children[i] = options.children({
          i,
          angle,
          order,
          position: options.circle.position(angle),
        })
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
