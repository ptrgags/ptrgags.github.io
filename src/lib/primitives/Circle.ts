import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Pointlike } from './Pointlike.ts'

export class Circle implements Drawable {
  center: Pointlike
  radius: number

  constructor(center: Pointlike, radius: number) {
    this.center = center
    this.radius = radius
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.center
    const r = this.radius
    lib.circle(x, y, r)
  }
}
