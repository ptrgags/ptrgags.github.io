import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { SymmetryNode } from './SymmetryNode.ts'

export interface MirrorSlot {
  // 0 for original, 1 for flipped
  i: number
  is_flipped: boolean
}

/**
 * Mirror symmetry group. It always is a mirror reflection that flips the
 * y-coordinate. This is used in `RepeatDihedral`
 *
 * @see RepeatDihedral
 */
export class RepeatMirror implements Drawable {
  primitive: SymmetryNode

  constructor(children: Drawable | Drawable[] | ((slot: MirrorSlot) => Drawable)) {
    const transformations = [Rigid.IDENTITY, Rigid.FLIP_Y]

    let mirror_pair: Drawable | Drawable[]
    if (typeof children === 'function') {
      mirror_pair = [children({ i: 0, is_flipped: false }), children({ i: 1, is_flipped: true })]
    } else {
      mirror_pair = children
    }

    this.primitive = new SymmetryNode(transformations, mirror_pair)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
