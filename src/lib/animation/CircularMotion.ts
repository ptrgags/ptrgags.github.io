import type { Circle } from '../primitives/Circle.ts'
import type { Vec2 } from '../primitives/Vec2.ts'

export class CircularMotion {
  circle: Circle
  frequency: number
  phase: number
  /**
   *
   * @param frequency Frequency in Hz
   * @param phase Initial phase in radians
   */
  constructor(circle: Circle, frequency: number, phase: number = 0) {
    this.circle = circle
    this.frequency = frequency
    this.phase = phase
  }

  angle(t: number): number {
    return 2.0 * Math.PI * this.frequency * t + this.phase
  }

  position(t: number): Vec2 {
    const angle = this.angle(t)
    return this.circle.position(angle)
  }
}
