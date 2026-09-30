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

  position(angle: number): Pointlike {
    const r = this.radius
    const { x, y } = this.center
    return { x: x + r * Math.cos(angle), y: y + r * Math.sin(angle) }
  }

  unit_normal(angle: number): Pointlike {
    return { x: Math.cos(angle), y: Math.sin(angle) }
  }

  unit_tangent(angle: number): Pointlike {
    return { x: -Math.sin(angle), y: Math.cos(angle) }
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.center
    const r = this.radius
    lib.circle(x, y, r)
  }
}
