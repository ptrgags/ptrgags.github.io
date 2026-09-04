import p5 from 'p5'
import { GearSchematic } from './GearSchematic.ts'
import { GearTree } from './GearTree.ts'

const SWATCH_SIZE = { w: 200, h: 200 }
const FRAMES_PER_TURN = 1024

function make_gear_sketch(gears: GearSchematic | GearTree) {
  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(SWATCH_SIZE.w, SWATCH_SIZE.h)
    }

    p.draw = () => {
      p.background(0)

      const t = p.frameCount / FRAMES_PER_TURN
      gears.angle = t

      p.stroke(255)
      p.noFill()
      gears.draw_p5(p)
    }
  }
}

function make_meshed_gears() {
  const module = 5
  const r1 = 75
  const r2 = 25
  const teeth1 = (2 * r1) / module
  const teeth2 = (2 * r2) / module
  const phase2 = 1 / (2 * teeth2)

  const tree = new GearTree(
    { radius: r1, teeth: teeth1 },
    {
      type: 'series',
      angle: 0,
      child: new GearTree({ radius: r2, teeth: teeth2, phase: phase2 }),
    },
  )
  tree.position_gears({ x: 75, y: 100 })
  return tree
}

const MESHED_GEARS = make_meshed_gears()

const COAXIAL_GEARS = new GearTree(
  { radius: 100, teeth: 48 },
  {
    type: 'parallel',
    child: new GearTree({ radius: 50, teeth: 24 }),
  },
)
COAXIAL_GEARS.position_gears({ x: 100, y: 100 })

const SIMPLE_TREE = new GearTree(
  { radius: 50, teeth: 24 },
  {
    type: 'parallel',
    child: new GearTree(
      { radius: 25, teeth: 12 },
      {
        type: 'series',
        angle: -1 / 3,
        child: new GearTree({ radius: 100, teeth: 45 }),
      },
    ),
  },
  {
    type: 'series',
    angle: 0,
    child: new GearTree(
      { radius: 50, teeth: 24 },
      {
        type: 'series',
        angle: -0.25,
        child: new GearTree({ radius: 25, teeth: 12 }),
      },
    ),
  },
  {
    type: 'series',
    angle: -1 / 6,
    child: new GearTree({ radius: 25, teeth: 12 }),
  },
)
SIMPLE_TREE.position_gears({ x: 50, y: 50 })

export const SKETCHES = {
  gear_schematic: make_gear_sketch(
    new GearSchematic({ center: { x: 100, y: 100 }, radius: 50, teeth: 24 }),
  ),
  meshed_gears: make_gear_sketch(MESHED_GEARS),
  coaxial_gears: make_gear_sketch(COAXIAL_GEARS),
  simple_tree: make_gear_sketch(SIMPLE_TREE),
}
