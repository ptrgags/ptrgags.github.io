import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Vec2 } from './Vec2.ts'

export class ParametricCurve implements Drawable {
  readonly num_points: number
  readonly curve: (t: number) => Vec2
  readonly points: Vec2[]

  constructor(num_points: number, curve: (t: number) => Vec2) {
    this.curve = curve
    this.num_points = num_points

    this.points = new Array(num_points)
    this.refresh()
  }

  refresh() {
    const step_size = 1 / (this.num_points - 1)
    for (let i = 0; i < this.num_points; i++) {
      const t = i * step_size
      this.points[i] = this.curve(t)
    }
  }

  draw(lib: DrawingLibrary): void {
    lib.polyline(this.points)
  }
}
