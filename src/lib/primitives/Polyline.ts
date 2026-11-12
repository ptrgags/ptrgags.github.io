import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Vec2 } from './Vec2.ts'

export interface PolylineOptions {
  vertices: Vec2[]
  closed: boolean
}

export class Polyline implements Drawable {
  points: Vec2[]
  closed: boolean
  constructor(options: PolylineOptions) {
    this.points = options.vertices
    this.closed = options.closed
  }

  draw(lib: DrawingLibrary): void {
    lib.polyline(this.points, this.closed)
  }
}
