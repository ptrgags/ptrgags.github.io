import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Vec2 } from './Vec2.ts'

export class Circle implements Drawable {
  center: Vec2
  radius: number

  constructor(center: Vec2, radius: number) {
    this.center = center
    this.radius = radius
  }

  position(angle: number): Vec2 {
    const r = this.radius
    const { x, y } = this.center
    return { x: x + r * Math.cos(angle), y: y + r * Math.sin(angle) }
  }

  unit_normal(angle: number): Vec2 {
    return { x: Math.cos(angle), y: Math.sin(angle) }
  }

  unit_tangent(angle: number): Vec2 {
    return { x: -Math.sin(angle), y: Math.cos(angle) }
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.center
    const r = this.radius
    lib.circle(x, y, r)
  }
}
