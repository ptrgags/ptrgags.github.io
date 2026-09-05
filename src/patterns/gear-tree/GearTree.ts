import type p5 from 'p5'
import type { DrawP5 } from '../../primitives/DrawP5.ts'
import { GearSchematic, type GearSchematicOptions } from './GearSchematic.ts'
import type { Pointlike } from '../../primitives/Pointlike.ts'

interface SeriesGear {
  type: 'series'
  // tooth number of the parent gear where the series gear will be meshed.
  // This is used for computing the child gear's initial phase for correct
  // meshing.
  tooth: number
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

  constructor(gear: GearSchematicOptions, ...connections: GearConnection[]) {
    this.gear = new GearSchematic(gear)
    this.connections = connections
  }

  position_gears(center: Pointlike) {
    this.gear.center = center

    for (const connection of this.connections) {
      let child_center = center
      if (connection.type === 'series') {
        const { x, y } = center
        const angle = (2.0 * Math.PI * connection.tooth) / this.gear.num_teeth
        const c = Math.cos(angle)
        const s = -Math.sin(angle)
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
}
