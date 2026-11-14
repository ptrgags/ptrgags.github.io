import { Direction2P } from '../math/pga2d/Direction2P.ts'
import { Point2P } from '../math/pga2d/Point2P.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { Polyline } from '../primitives/Polyline.ts'
import type { Rect } from '../primitives/Rect.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import type { Wave } from './Wave.ts'

export interface OscilloscopeOptions {
  bounds: Rect
  wave: Wave
  sample_count: number
  draw_axes: boolean
}

export class Oscilloscope implements Drawable {
  primitive: Drawable

  constructor(options: OscilloscopeOptions) {
    const vertices: Vec2[] = []

    const bounds = options.bounds
    const bipolar_bounds = new Direction2P(bounds.dimensions.x, bounds.dimensions.height * 0.5)

    for (let i = 0; i < options.sample_count; i++) {
      const u = i / (options.sample_count - 1)
      const v = options.wave.bipolar(u)
      const offset = new Direction2P(u, 1 - v).mul_components(bipolar_bounds)
      vertices.push(bounds.position.add(offset))
    }
    this.primitive = new Polyline({ vertices, closed: false })
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
