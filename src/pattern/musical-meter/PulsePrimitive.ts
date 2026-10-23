import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import { Gridlines } from '../../lib/primitives/Gridlines.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'
import { Rect } from '../../lib/primitives/Rect.ts'

export interface PulsePrimitiveOptions {
  position: Vec2
  radius: number
  beat_count: number
  spacing: number
}

/**
 * Draw a steady pulse of beats with no musical meter
 */
export class PulsePrimitive implements Drawable {
  gridlines: Gridlines
  constructor(options: PulsePrimitiveOptions) {
    const { x, y } = options.position
    const width = options.beat_count * options.spacing
    const bounds = new Rect(
      {
        x,
        y: y - options.radius,
      },
      { width, height: 2 * options.radius },
    )
    this.gridlines = new Gridlines({
      bounds,
      x_spacing: options.spacing,
    })
  }

  draw(lib: DrawingLibrary): void {
    this.gridlines.draw(lib)
  }
}
