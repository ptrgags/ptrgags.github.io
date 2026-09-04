import p5 from 'p5'
import { GearSchematic } from './GearSchematic.ts'

export const gear_schematic = (p: p5) => {
  const example_gear = new GearSchematic({ x: 100, y: 100 }, 50, 24, 0)

  p.setup = () => {
    p.createCanvas(200, 200)
  }

  p.draw = () => {
    p.background(0)

    const t = (p.frameCount / 512) % 1.0
    example_gear.phase = t

    p.stroke(255)
    p.noFill()
    example_gear.draw_p5(p)
  }
}
