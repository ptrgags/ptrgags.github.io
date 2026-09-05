import p5 from 'p5'
import { GearSchematic, type GearSchematicOptions } from './GearSchematic.ts'
import { GearTree, type GearConnection, type ParallelGear, type SeriesGear } from './GearTree.ts'

const PAUSE = false

const MODULE = 4

// shorthand for reducing boilerplate
function gear(teeth: number): GearSchematicOptions {
  return {
    module: MODULE,
    teeth,
  }
}

function parallel(child: GearTree): ParallelGear {
  return {
    type: 'parallel',
    child,
  }
}

function series(tooth: number, child: GearTree): SeriesGear {
  return {
    type: 'series',
    tooth,
    child,
  }
}

// ===========================================================

const SIZE_SWATCH = { w: 200, h: 200 }
const SIZE_ATC = { w: 500, h: 700 }
const FRAMES_PER_TURN = 512

function make_gear_sketch(gears: GearSchematic | GearTree, size = SIZE_SWATCH) {
  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(size.w, size.h)

      if (gears instanceof GearTree) {
        gears.is_root = true
      }
    }

    p.draw = () => {
      p.background(0)

      const t = PAUSE ? 0 : p.frameCount / FRAMES_PER_TURN
      gears.angle = 2.0 * Math.PI * t

      p.stroke(255, 0, 0)
      p.strokeWeight(2)
      p.noFill()
      gears.draw_p5(p)
    }
  }
}

const MESHED_GEARS = new GearTree(gear(35), {
  type: 'series',
  tooth: 0,
  child: new GearTree(gear(10)),
})
MESHED_GEARS.position_gears({ x: 75, y: 100 })

const MESHED_AT_ANGLE = new GearTree(gear(35), {
  type: 'series',
  tooth: 5,
  child: new GearTree(gear(10)),
})
MESHED_AT_ANGLE.position_gears({ x: 75, y: 100 })

const COAXIAL_GEARS = new GearTree(gear(48), {
  type: 'parallel',
  child: new GearTree(gear(24)),
})
COAXIAL_GEARS.position_gears({ x: 100, y: 100 })

const SIMPLE_TREE = new GearTree(
  gear(30),
  {
    type: 'parallel',
    child: new GearTree(gear(18)),
  },
  {
    type: 'series',
    tooth: 10,
    child: new GearTree(gear(50)),
  },
  {
    type: 'series',
    tooth: -4,
    child: new GearTree(gear(15)),
  },
)
SIMPLE_TREE.position_gears({ x: 100, y: 100 })

// Tree starting from a driving gear at the bottom
const ELABORATE_TREE = new GearTree(gear(24), {
  type: 'series',
  tooth: 6,
  // a train of gears that forms the "trunk" of the tree
  child: new GearTree(gear(16), {
    type: 'series',
    tooth: 4,
    child: new GearTree(gear(16), {
      type: 'series',
      tooth: 4,
      // Huge gear in the center with smaller gears inside it similar to
      // gears on a multi-speed bike
      child: new GearTree(
        gear(48),
        {
          type: 'parallel',
          child: new GearTree(
            gear(32),
            series(
              4,
              new GearTree(
                gear(20),
                series(5, new GearTree(gear(16), series(4, new GearTree(gear(16))))),
              ),
            ),
            series(
              12,
              new GearTree(
                gear(20),
                series(5, new GearTree(gear(16), series(4, new GearTree(gear(16))))),
              ),
            ),
          ),
        },
        { type: 'parallel', child: new GearTree(gear(20)) },
        {
          type: 'parallel',
          // The smallest gear on the center axle drives a train of smol gears
          // because why not
          child: new GearTree(
            gear(12),
            series(
              3,
              new GearTree(
                gear(8),
                series(
                  2,
                  new GearTree(
                    gear(8),
                    series(
                      2,
                      new GearTree(
                        gear(8),
                        series(
                          2,
                          new GearTree(
                            gear(8),
                            series(
                              2,
                              new GearTree(
                                gear(8),
                                series(2, new GearTree(gear(8), series(2, new GearTree(gear(8))))),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        },
        // two gear trains on the sides that each have two branches
        series(
          0,
          new GearTree(
            gear(16),
            series(
              2,
              new GearTree(
                gear(16),
                series(3, new GearTree(gear(16), series(4, new GearTree(gear(16))))),
              ),
            ),
            series(
              -2,
              new GearTree(
                gear(16),
                series(-3, new GearTree(gear(16), series(-4, new GearTree(gear(16))))),
              ),
            ),
          ),
        ),
        series(
          24,
          new GearTree(
            gear(16),
            series(
              6,
              new GearTree(
                gear(16),
                series(5, new GearTree(gear(16), series(4, new GearTree(gear(16))))),
              ),
            ),
            series(
              -6,
              new GearTree(
                gear(16),
                series(-5, new GearTree(gear(16), series(-4, new GearTree(gear(16))))),
              ),
            ),
          ),
        ),
      ),
    }),
  }),
})
ELABORATE_TREE.position_gears({ x: 250, y: 550 })

export const SKETCHES = {
  gear_schematic: make_gear_sketch(
    new GearSchematic({ center: { x: 100, y: 100 }, module: MODULE, teeth: 24 }),
  ),
  meshed_gears: make_gear_sketch(MESHED_GEARS),
  meshed_at_angle: make_gear_sketch(MESHED_AT_ANGLE),
  coaxial_gears: make_gear_sketch(COAXIAL_GEARS),
  simple_tree: make_gear_sketch(SIMPLE_TREE),
  elaborate_tree: make_gear_sketch(ELABORATE_TREE, SIZE_ATC),
}
