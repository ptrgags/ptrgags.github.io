import type p5 from 'p5'
import type { DrawP5 } from '../../p5-helpers/DrawP5.ts'
import type { Pointlike } from '../../primitives/Pointlike.ts'

export enum GearStyle {
  // Draw the teeth inside the pitch circle. This is the original style
  INSIDE_PITCH_CIRCLE,
  // Draw the pitch circle and the teeth crossing the pitch circle like hash marks
  HASH_MARKS,
  // Like HASH_MARKS but draw the root circle instead of the pitch circle. This
  // looks the most like the final gear
  PSEUDO_GEAR,
  // Draw just the teeth, no pitch circle
  NO_CIRCLE,
}

export interface GearSchematicOptions {
  module: number
  teeth: number
  center?: Pointlike
  phase?: number
  gear_style?: GearStyle
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
   * The length of the tooth from pitch circle to tip. This must match
   * for all gears meshed together in series
   */
  readonly module: number
  /**
   * Number of teeth
   */
  readonly num_teeth: number
  /**
   * The pitch radius, i.e. the radius at which the gears mesh. This is
   * computed from module and number of teeth
   */
  readonly radius: number
  /**
   * Initial Phase angle in radians. This is used for rotating
   * gears slightly so they mesh.
   *
   * Set this when first configuring the gear, but then do not change this,
   * update angle instead
   */
  phase: number
  /**
   * Angle the gear has rotated in radians. Change this to animate the gear
   */
  angle: number = 0

  /**
   * Style for drawing the gear. This adjusts a couple of things in the
   * draw function
   */
  gear_style: GearStyle

  constructor(options: GearSchematicOptions) {
    this.center = options.center ?? { x: 0, y: 0 }
    this.module = options.module
    this.num_teeth = options.teeth
    this.radius = 0.5 * options.module * options.teeth
    this.phase = options.phase ?? 0
    this.gear_style = options.gear_style ?? GearStyle.PSEUDO_GEAR
  }

  draw_p5(p: p5): void {
    const { x, y } = this.center

    const pitch_radius = this.radius
    const root_radius = pitch_radius - 1.25 * this.module
    const tip_radius = pitch_radius + this.module

    // Draw a circle for the body of the gear
    const gear_style = this.gear_style
    if (gear_style === GearStyle.PSEUDO_GEAR) {
      p.circle(x, y, 2 * root_radius)
    } else if (gear_style !== GearStyle.NO_CIRCLE) {
      p.circle(x, y, 2 * pitch_radius)
    }

    // Draw tick marks for the teeth
    let r1 = root_radius
    let r2 = tip_radius
    if (gear_style === GearStyle.INSIDE_PITCH_CIRCLE) {
      // Exaggerate the root to show it more clearly
      r1 = pitch_radius - 2 * this.module
      r2 = pitch_radius
    }

    const start_angle = this.phase + this.angle

    for (let i = 0; i < this.num_teeth; i++) {
      const angle = start_angle + (2 * Math.PI * i) / this.num_teeth
      const c = Math.cos(angle)
      const s = -Math.sin(angle)
      p.line(x + r1 * c, y + r1 * s, x + r2 * c, y + r2 * s)
    }

    const r3 = this.radius * 0.25
    const c = Math.cos(start_angle)
    const s = -Math.sin(start_angle)
    p.line(x + r1 * c, y + r1 * s, x + r3 * c, y + r3 * s)
  }
}
