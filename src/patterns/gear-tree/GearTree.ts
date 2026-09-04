import type p5 from 'p5'
import type { DrawP5 } from '../../primitives/DrawP5.ts'
import { GearSchematic, type GearSchematicOptions } from './GearSchematic.ts'
import type { Pointlike } from '../../primitives/Pointlike.ts'

interface SeriesGear {
  type: 'series'
  // angle of the axis between the two gears measured relative
  // to the parent gear. Angle is specified in _turns_
  angle: number
  child: GearTree
}

interface ParallelGear {
  type: 'parallel'
  child: GearTree
}

type GearConnection = SeriesGear | ParallelGear

export class GearTree implements DrawP5 {
  gear: GearSchematic
  connections: GearConnection[]

  constructor(gear: GearSchematic, ...connections: GearConnection[]) {
    this.gear = gear
    this.connections = connections
  }

  position_gears(center: Pointlike) {
    this.gear.center = center

    for (const connection of this.connections) {
      let child_center = center
      if (connection.type === 'series') {
        const { x, y } = center
        const angle = connection.angle
        const c = Math.cos(2 * Math.PI * angle)
        const s = -Math.sin(2 * Math.PI * angle)
        const r = this.gear.radius + connection.child.gear.radius
        child_center = {
          x: x + r * c,
          y: y + r * s,
        }
      }

      connection.child.position_gears(child_center)
    }
  }

  set angle(value: number) {
    this.gear.angle = value

    for (const connection of this.connections) {
      // parallel gears are mounted on the same axle so turn the same
      // angle. Series gears turn proportional to the gear ratio, but in
      // the opposite direction
      let child_angle = value
      if (connection.type === 'series') {
        const ratio = this.gear.radius / connection.child.gear.radius
        child_angle = -ratio * value
      }

      connection.child.angle = child_angle
    }
  }

  draw_p5(p: p5): void {
    this.gear.draw_p5(p)

    for (const connection of this.connections) {
      connection.child.draw_p5(p)
    }
  }

  /**
   * Shorthand for creating a gear and wrapping as a GearTree
   * @param options Options for constructing a gear
   * @returns A gear wrapped in the gear
   */
  static gear(options: GearSchematicOptions): GearTree {
    return new GearTree(new GearSchematic(options))
  }
}
