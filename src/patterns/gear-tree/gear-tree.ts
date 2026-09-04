import p5 from 'p5'
import { GearSchematic } from './GearSchematic.ts'

export const gear_schematic = (p: p5) => {
  const example_gear = new GearSchematic({ x: 100, y: 100 }, 50, 24, 0)

  p.setup = () => {
    p.createCanvas(200, 200)
  }

  p.draw = () => {
    p.background(0)

    const t = (p.frameCount / 1024) % 1.0
    example_gear.phase = t

    p.stroke(255)
    p.noFill()
    example_gear.draw_p5(p)
  }
}

export const meshed_gears = (p: p5) => {
  const module = 5
  const r1 = 75
  const r2 = 25
  const teeth1 = (2 * r1) / module
  const teeth2 = (2 * r2) / module
  const phase2 = 1 / (2 * teeth2)

  const gear1 = new GearSchematic({ x: 75, y: 100 }, r1, teeth1, 0)
  const gear2 = new GearSchematic({ x: 175, y: 100 }, r2, teeth2, phase2)

  p.setup = () => {
    p.createCanvas(200, 200)
  }

  p.draw = () => {
    p.background(0)

    const t = (p.frameCount / 1024) % 1.0
    gear1.phase = t
    gear2.phase = phase2 + -gear1.phase * (gear1.pitch_radius / gear2.pitch_radius)

    p.stroke(255)
    p.noFill()
    gear1.draw_p5(p)
    gear2.draw_p5(p)
  }
}

export const coaxial_gears = (p: p5) => {
  const gear1 = new GearSchematic({ x: 100, y: 100 }, 100, 48, 0)
  const gear2 = new GearSchematic({ x: 100, y: 100 }, 50, 24, 0)

  p.setup = () => {
    p.createCanvas(200, 200)
  }

  p.draw = () => {
    p.background(0)

    const t = (p.frameCount / 1024) % 1.0
    gear1.phase = t
    gear2.phase = t

    p.stroke(255)
    p.noFill()
    gear1.draw_p5(p)
    gear2.draw_p5(p)
  }
}
