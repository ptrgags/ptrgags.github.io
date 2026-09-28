import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'

export interface Transformation {
  apply_transformation(lib: DrawingLibrary): void
}

export class TransformationOp implements Drawable {
  transformation: Transformation
  child: Drawable

  constructor(transformation: Transformation, child: Drawable) {
    this.transformation = transformation
    this.child = child
  }

  draw(lib: DrawingLibrary): void {
    lib.push()
    this.transformation.apply_transformation(lib)
    this.child.draw(lib)
    lib.pop()
  }
}
