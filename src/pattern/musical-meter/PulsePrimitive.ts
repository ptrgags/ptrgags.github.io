import { Gridlines } from '../../lib/primitives/Gridlines.ts'
import type { Pointlike } from '../../lib/primitives/Pointlike.ts'
import { Rect } from '../../lib/primitives/Rect.ts'

export interface PulsePrimitiveOptions {
  position: Pointlike
  radius: number
  beat_count: number
  spacing: number
}

/**
 * Draw a steady pulse of beats with no musical meter
 */
export class PulsePrimitive {
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
  }
}
