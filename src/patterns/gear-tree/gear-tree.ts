import p5 from 'p5'
import { GearSchematic } from './GearSchematic.ts'
import { GearTree } from './GearTree.ts'

export const gear_schematic = (p: p5) => {
  const example_gear = new GearSchematic({ center: { x: 100, y: 100 }, radius: 50, teeth: 24 })

  p.setup = () => {
    p.createCanvas(200, 200)
  }

  p.draw = () => {
    p.background(0)

    const t = p.frameCount / 1024
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

  const gear_tree = new GearTree(new GearSchematic({ radius: r1, teeth: teeth1 }), {
    type: 'series',
    angle: 0,
    child: GearTree.gear({ radius: r2, teeth: teeth2, phase: phase2 }),
  })

  p.setup = () => {
    p.createCanvas(200, 200)

    gear_tree.position_gears({ x: 75, y: 100 })
  }

  p.draw = () => {
    p.background(0)

    const t = p.frameCount / 1024
    gear_tree.angle = t

    p.stroke(255)
    p.noFill()
    gear_tree.draw_p5(p)
  }
}

export const coaxial_gears = (p: p5) => {
  const gear_tree = new GearTree(new GearSchematic({ radius: 100, teeth: 48 }), {
    type: 'parallel',
    child: GearTree.gear({ radius: 50, teeth: 24 }),
  })

  p.setup = () => {
    p.createCanvas(200, 200)
    gear_tree.position_gears({ x: 100, y: 100 })
  }

  p.draw = () => {
    p.background(0)

    const t = p.frameCount / 1024
    gear_tree.angle = t

    p.stroke(255)
    p.noFill()
    gear_tree.draw_p5(p)
  }
}

export const simple_gear_tree = (p: p5) => {
  const gear_tree = new GearTree(
    new GearSchematic({ radius: 50, teeth: 24 }),
    {
      type: 'parallel',
      child: new GearTree(new GearSchematic({ radius: 25, teeth: 12 }), {
        type: 'series',
        angle: -1 / 3,
        child: GearTree.gear({ radius: 100, teeth: 45 }),
      }),
    },
    {
      type: 'series',
      angle: 0,
      child: new GearTree(new GearSchematic({ radius: 50, teeth: 24 }), {
        type: 'series',
        angle: -0.25,
        child: GearTree.gear({ radius: 25, teeth: 12 }),
      }),
    },
    {
      type: 'series',
      angle: -1 / 6,
      child: GearTree.gear({ radius: 25, teeth: 12 }),
    },
  )

  p.setup = () => {
    p.createCanvas(200, 200)
    gear_tree.position_gears({ x: 50, y: 50 })
  }

  p.draw = () => {
    p.background(0)

    const t = p.frameCount / 1024
    gear_tree.angle = t

    p.stroke(255)
    p.noFill()
    gear_tree.draw_p5(p)
  }
}
