import { ATC_SCREEN } from '../../core/dimensions.ts'
import { divmod } from '../math/divmod.ts'
import { range } from '../math/iteration/range.ts'
import { Direction2P } from '../math/pga2d/Direction2P.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { Group } from '../primitives/Group.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { SymmetryNode } from '../symmetry/SymmetryNode.ts'
import { TradingCard } from './TradingCard.ts'

export class ATC3x3 implements Drawable {
  static readonly DIMENSIONS = ATC_SCREEN.dimensions.scale(3)

  primitive: SymmetryNode

  constructor(cards: Drawable[]) {
    if (cards.length > 9) {
      throw new Error('cards can have at most 9 entries')
    }

    while (cards.length < 9) {
      cards.push(Group.EMPTY)
    }

    const transformations = range(9)
      .map((i) => {
        const [row, col] = divmod(i, 3)
        return Rigid.translation(new Direction2P(col, row).mul_components(ATC_SCREEN.dimensions))
      })
      .toArray()

    this.primitive = new SymmetryNode(transformations, cards)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }

  static readonly BLANK = new ATC3x3(
    range(9)
      .map((i) => TradingCard.BLANK)
      .toArray(),
  )

  static readonly BLANK_WITH_CAPTION_BOX = new ATC3x3(
    range(9)
      .map((i) => TradingCard.BLANK_WITH_CAPTION_BOX)
      .toArray(),
  )
}
