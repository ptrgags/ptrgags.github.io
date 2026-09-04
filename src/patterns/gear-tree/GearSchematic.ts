import type p5 from 'p5'
import type { DrawP5 } from '../../primitives/DrawP5.ts'
import type { Pointlike } from '../../primitives/Pointlike.ts'

/**
 * Schematic for a gear. It's just a circle with tick marks where the teeth go.
 *
 * NOTE: the tick marks are drawn _inside_ the pitch circle
 */
export class GearSchematic implements DrawP5 {
  /**
   * Center of the gear. You can swap this out to move the gear around without
   * needing to wrap in a transform
   */
  center: Pointlike
  /**
   * The radius where the teeth will mesh
   */
  readonly pitch_radius: number
  private readonly radius_short: number
  private readonly radius_long: number
  readonly num_teeth: number
  /**
   * Phase angle in _turns_, not radians
   */
  phase: number

  constructor(center: Pointlike, pitch_radius: number, num_teeth: number, phase: number) {
    this.center = center
    this.pitch_radius = pitch_radius
    this.radius_short = 1.1 * this.pitch_radius
    this.radius_long = 0.5 * this.pitch_radius
    this.num_teeth = num_teeth
    this.phase = phase
  }

  draw_p5(p: p5): void {
    const { x, y } = this.center
    // draw the pitch circle
    p.circle(x, y, 2 * this.pitch_radius)

    // Draw tick marks for the teeth
    const r1 = this.pitch_radius
    const r2 = this.pitch_radius * 1.25

    for (let i = 0; i < this.num_teeth; i++) {
      const angle = i / this.num_teeth + this.phase
      const c = Math.cos(2.0 * Math.PI * angle)
      const s = -Math.sin(2.0 * Math.PI * angle)
      p.line(x + r1 * c, y + r1 * s, x + r2 * c, y + r2 * s)
    }

    const r3 = this.pitch_radius * 0.5
    const angle = this.phase
    const c = Math.cos(2.0 * Math.PI * angle)
    const s = -Math.sin(2.0 * Math.PI * angle)
    p.line(x + r1 * c, y + r1 * s, x + r3 * c, y + r3 * s)
  }
}
