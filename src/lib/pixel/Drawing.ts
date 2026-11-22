import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { Vec2 } from '../primitives/Vec2.ts'

export interface Drawing extends Drawable {
  clear(): void
  position: Vec2
  get dimensions(): Dimensionlike
  get lib(): DrawingLibrary
}
