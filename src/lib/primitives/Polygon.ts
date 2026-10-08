import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Vec2 } from './Vec2.ts'

export class Polygon implements Drawable {
  points: Vec2[]
  constructor(points: Vec2[]) {
    this.points = points
  }

  draw(lib: DrawingLibrary): void {
    lib.polygon(this.points)
  }
}
