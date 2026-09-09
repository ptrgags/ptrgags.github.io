import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'

export class Group implements Drawable {
  children: Drawable[]
  constructor(...children: Drawable[]) {
    this.children = children
  }

  /**
   * Replace all the primitives with a new collection
   * @param children
   */
  regroup(...children: Drawable[]) {
    this.children.splice(0, Infinity, ...children)
  }

  draw(lib: DrawingLibrary): void {
    this.children.forEach((x) => x.draw(lib))
  }

  static readonly EMPTY = new Group()
}
