import { Point2P } from '../math/pga2d/Point2P.ts'
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

  static from_two_points(a: Vec2, b: Vec2): Circle {
    const point_a = Point2P.from_vec2(a)
    const point_b = Point2P.from_vec2(b)
    const center = Point2P.lerp(point_a, point_b, 0.5)
    const radius = 0.5 * point_b.sub(point_a).mag()
    return new Circle(center, radius)
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
