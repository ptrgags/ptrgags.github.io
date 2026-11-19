import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'

export interface Transformation {
  /**
   * Apply a transformation. This should ultimately call one of the
   * lib.begin_xform_XXX functions
   * @param lib Drawing library
   */
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
    this.transformation.apply_transformation(lib)
    this.child.draw(lib)
    lib.end_xform()
  }
}
