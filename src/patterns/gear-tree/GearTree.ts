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
    console.log(this.gear)
    this.gear.center = center

    for (const connection of this.connections) {
      let child_center = center
      let child_phase = this.gear.phase
      if (connection.type === 'series') {
        const { x, y } = center

        const connection_angle = (2.0 * Math.PI * connection.tooth) / this.gear.num_teeth
        console.log(connection.tooth, '/', this.gear.num_teeth, connection_angle)
        const c = Math.cos(connection_angle)
        const s = -Math.sin(connection_angle)
        const r = this.gear.radius + connection.child.gear.radius
        child_center = {
          x: x + r * c,
          y: y + r * s,
        }

        // Rotate the child gear so tooth 0 is facing
        const tip_phase = Math.PI + connection_angle
        // but now we need to rotate the child gear by half a tooth for them
        // to mesh
        const half_tooth_angle = Math.PI / connection.child.gear.num_teeth

        // If the parent gear was rotated, the child gear must also
        // rotate through the same arc length using the usual series
        // gear angle math (see set angle())
        const ratio = this.gear.radius / connection.child.gear.radius
        const phase_adjustment = this.gear.phase * -ratio

        child_phase = tip_phase + half_tooth_angle + phase_adjustment
      }

      console.log('child phase', child_phase)
      connection.child.gear.phase = child_phase
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
