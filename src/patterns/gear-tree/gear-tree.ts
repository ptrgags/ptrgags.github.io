import p5 from 'p5'
import { GearSchematic } from './GearSchematic.ts'
import { GearTree } from './GearTree.ts'

const PAUSE = false

const MODULE = 4

const SWATCH_SIZE = { w: 200, h: 200 }
const FRAMES_PER_TURN = 512

function make_gear_sketch(gears: GearSchematic | GearTree) {
  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(SWATCH_SIZE.w, SWATCH_SIZE.h)
    }

    p.draw = () => {
      p.background(0)

      const t = PAUSE ? 0 : p.frameCount / FRAMES_PER_TURN
      gears.angle = 2.0 * Math.PI * t

      p.stroke(255)
      p.strokeWeight(2)
      p.noFill()
      gears.draw_p5(p)
    }
  }
}

const MESHED_GEARS = new GearTree(
  { module: MODULE, teeth: 35 },
  {
    type: 'series',
    tooth: 0,
    child: new GearTree({ module: MODULE, teeth: 10 }),
  },
)
MESHED_GEARS.position_gears({ x: 75, y: 100 })

const COAXIAL_GEARS = new GearTree(
  { module: MODULE, teeth: 48 },
  {
    type: 'parallel',
    child: new GearTree({ module: MODULE, teeth: 24 }),
  },
)
COAXIAL_GEARS.position_gears({ x: 100, y: 100 })

const SIMPLE_TREE = new GearTree(
  { module: MODULE, teeth: 24 },
  {
    type: 'parallel',
    child: new GearTree(
      { module: MODULE, teeth: 12 },
      {
        type: 'series',
        tooth: -5,
        child: new GearTree({ module: MODULE, teeth: 45 }),
      },
    ),
  },
  {
    type: 'series',
    tooth: 0,
    child: new GearTree(
      { module: MODULE, teeth: 24 },
      {
        type: 'series',
        tooth: -6,
        child: new GearTree({ module: MODULE, teeth: 10 }),
      },
    ),
  },
  {
    type: 'series',
    tooth: -4,
    child: new GearTree({ module: MODULE, teeth: 15 }),
  },
)
SIMPLE_TREE.position_gears({ x: 50, y: 50 })

export const SKETCHES = {
  gear_schematic: make_gear_sketch(
    new GearSchematic({ center: { x: 100, y: 100 }, module: MODULE, teeth: 24 }),
  ),
  meshed_gears: make_gear_sketch(MESHED_GEARS),
  coaxial_gears: make_gear_sketch(COAXIAL_GEARS),
  simple_tree: make_gear_sketch(SIMPLE_TREE),
}
