import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import type { Rigid } from '../primitives/Rigid.ts'
import { group, xform } from '../primitives/shorthand.ts'

export class SymmetryNode implements Drawable {
  primitive: Drawable

  constructor(transformations: Rigid[], children: Drawable | Drawable[]) {
    if (Array.isArray(children) && children.length !== transformations.length) {
      throw new Error('children array must match the length of transformations')
    }

    let transformed
    if (Array.isArray(children)) {
      transformed = transformations.map((x, i) => xform(x, children[i]))
    } else {
      transformed = transformations.map((x) => xform(x, children))
    }

    this.primitive = group(...transformed)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
