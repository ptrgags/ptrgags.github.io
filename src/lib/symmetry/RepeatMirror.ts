import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { SymmetryNode } from './SymmetryNode.ts'

export interface MirrorSlot {
  flipped: boolean
}

export interface RepeatMirrorOptions {
  children: Drawable | Drawable[] | ((slot: MirrorSlot) => Drawable)
}

/**
 * Mirror symmetry group. It always is a mirror reflection that flips the
 * y-coordinate. This is used in `RepeatDihedral`
 *
 * @see RepeatDihedral
 */
export class RepeatMirror implements Drawable {
  primitive: SymmetryNode

  constructor(options: RepeatMirrorOptions) {
    const transformations = [Rigid.IDENTITY, Rigid.FLIP_Y]

    let mirror_pair: Drawable | Drawable[]
    if (typeof options.children === 'function') {
      mirror_pair = [options.children({ flipped: false }), options.children({ flipped: true })]
    } else {
      mirror_pair = options.children
    }

    this.primitive = new SymmetryNode(transformations, mirror_pair)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
