import type { CRS12 } from '../math/CRS12.ts'
import type { Direction2P } from '../math/pga2d/Direction2P.ts'
import type { Point2P } from '../math/pga2d/Point2P.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { SymmetryNode } from './SymmetryNode.ts'

export interface Repeat1DSlot {
  i: number
  x: number
  offset: Direction2P
  position: Point2P
}

export interface Repeat1DOptions {
  crs: CRS12
  /**
   * integer tile numbers (first, last) for the range of tiles to display
   * because we can't represent all of them (infinitely many), and we don't
   * want to render tiles we can't see on screen
   */
  x_range: [number, number]
  children: Drawable | ((slot: Repeat1DSlot) => Drawable)
}

export class Repeat1D {
  primitive: SymmetryNode

  constructor(options: Repeat1DOptions) {
    const crs = options.crs
    const [first, last] = options.x_range
    const count = last - first + 1

    const transformations = new Array(count)
    for (let i = 0; i < count; i++) {
      const x = first + i
      transformations[i] = Rigid.translation(crs.position(x))
    }

    let children: Drawable | Drawable[]
    if (typeof options.children === 'function') {
      children = new Array(count)
      for (let i = 0; i < count; i++) {
        const x = first + i
        children[i] = options.children({
          i,
          x,
          offset: crs.offset(x),
          position: crs.position(x),
        })
      }
    } else {
      children = options.children
    }

    this.primitive = new SymmetryNode(transformations, children)
  }
}
