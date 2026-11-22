import { Circle } from './Circle.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Vec2 } from './Vec2.ts'

const DEFAULT_RADIUS = 4

export class Dots implements Drawable {
  dots: Circle[]
  constructor(positions: Vec2[], radius: number = DEFAULT_RADIUS) {
    this.dots = positions.map((pos) => new Circle(pos, radius))
  }

  draw(lib: DrawingLibrary): void {
    for (const dot of this.dots) {
      lib.circle(dot)
    }
  }
}
