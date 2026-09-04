import type p5 from 'p5'
import type { DrawP5 } from '../../primitives/DrawP5.ts'
import type { Pointlike } from '../../primitives/Pointlike.ts'

export interface GearSchematicOptions {
  radius: number
  teeth: number
  center?: Pointlike
  phase?: number
}

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
   * The pitch radius, i.e. the radius at which the gears mesh
   */
  readonly radius: number
  private readonly radius_short: number
  private readonly radius_long: number
  readonly num_teeth: number
  /**
   * Initial Phase angle in _turns_, not radians. This is used for rotating
   * gears slightly so they mesh.
   *
   * Set this when first configuring the gear, but then do not change this,
   * update angle instead
   */
  phase: number
  /**
   * Angle the gear has rotated. Change this to animate the gear
   */
  angle: number = 0

  constructor(options: GearSchematicOptions) {
    this.center = options.center ?? { x: 0, y: 0 }
    this.radius = options.radius
    this.radius_short = 1.1 * this.radius
    this.radius_long = 0.5 * this.radius
    this.num_teeth = options.teeth
    this.phase = options.phase ?? 0
  }

  draw_p5(p: p5): void {
    const { x, y } = this.center
    // draw the pitch circle
    p.circle(x, y, 2 * this.radius)

    // Draw tick marks for the teeth
    const r1 = this.radius
    const r2 = this.radius * 0.75
    const start_angle = this.phase + this.angle

    for (let i = 0; i < this.num_teeth; i++) {
      const angle = start_angle + i / this.num_teeth
      const c = Math.cos(2.0 * Math.PI * angle)
      const s = -Math.sin(2.0 * Math.PI * angle)
      p.line(x + r1 * c, y + r1 * s, x + r2 * c, y + r2 * s)
    }

    const r3 = this.radius * 0.25
    const c = Math.cos(2.0 * Math.PI * start_angle)
    const s = -Math.sin(2.0 * Math.PI * start_angle)
    p.line(x + r1 * c, y + r1 * s, x + r3 * c, y + r3 * s)
  }
}
