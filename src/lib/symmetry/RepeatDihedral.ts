import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { RepeatCyclic } from './RepeatCyclic.ts'
import { RepeatMirror } from './RepeatMirror.ts'

export interface RepeatDihedralOptions {
  order: number
  phase?: number
  children: Drawable
}

export class RepeatDihedral implements Drawable {
  primitive: RepeatCyclic

  constructor(options: RepeatDihedralOptions) {
    const order = options.order
    const phase = options.phase ?? 0

    this.primitive = new RepeatCyclic({
      order,
      phase,
      children: new RepeatMirror({ children: options.children }),
    })
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
