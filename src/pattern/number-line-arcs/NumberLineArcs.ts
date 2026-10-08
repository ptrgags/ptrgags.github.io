import { by_pairs } from '../../lib/iteration/by_pairs.ts'
import { cycle } from '../../lib/iteration/cycle.ts'
import { repeat } from '../../lib/iteration/repeat.ts'
import { zip } from '../../lib/iteration/zip.ts'
import { CRS12 } from '../../lib/math/CRS12.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { AngleOrientation, ArcAngles } from '../../lib/primitives/ArcAngles.ts'
import { ArcArrow } from '../../lib/primitives/ArcArrow.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { CircularArc } from '../../lib/primitives/CircularArc.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'

export enum ArcConvention {
  /**
   * All arcs are traced in the positive direction (clockwise)
   */
  POSITIVE,
  /**
   * All arcs are traced in the negative direction (negative)
   */
  NEGATIVE,
  /**
   * All arcs will be traced above the number line (assuming p5 default of y-down)
   */
  ABOVE,
  /**
   * All arcs will be traced below the number line (assuming p5 default of y-down)
   */
  BELOW,
  /**
   * Alternate between upper and lower halves of the number line so the
   * arcs form a C1 continuous path. This version puts the first arc
   * above the number line (in y-down coordinates)
   */
  PATH_START_ABOVE,
  /**
   * Same as PATH_UPPER but the first arc is below the number line (in y-down coordinates)
   */
  PATH_START_BELOW,
}

export interface NumberLineArcsOptions {
  /**
   * Origin of the coordinate system
   */
  origin: Vec2
  /**
   * Spacing between integers on the number line (always in the +x direction)
   */
  spacing: number
  /**
   * Which style of drawing arcs to use
   */
  arc_convention: ArcConvention
  /**
   * List of integers to determine where the arcs go
   */
  points: number[]
}

const ANGLES = [
  // assuming y-down coordinates, these are:
  new ArcAngles(0, Math.PI, AngleOrientation.POSITIVE), // positive, below
  new ArcAngles(0, Math.PI, AngleOrientation.NEGATIVE), // negative, above
  new ArcAngles(Math.PI, 0, AngleOrientation.POSITIVE), // positive, above
  new ArcAngles(Math.PI, 0, AngleOrientation.NEGATIVE), // negative, below
]

const ANGLES_BY_TYPE = {
  above: [ANGLES[1], ANGLES[2]],
  below: [ANGLES[0], ANGLES[3]],
  // wrong
  positive: [ANGLES[0], ANGLES[2]],
  // wrong
  negative: [ANGLES[1], ANGLES[3]],
}

type ArcType = keyof typeof ANGLES_BY_TYPE

function make_arc(crs: CRS12, a: number, b: number, arc_type: ArcType): ArcArrow | undefined {
  // Arc is 0 size, skip over it
  if (a === b) {
    return undefined
  }

  const point_a = crs.position(a)
  const point_b = crs.position(b)
  const circle = Circle.from_two_points(point_a, point_b)

  const index = a < b ? 0 : 1
  const angles = ANGLES_BY_TYPE[arc_type][index]

  return new ArcArrow({ circle, angles })
}

function make_arcs(crs: CRS12, points: number[], arc_convention: ArcConvention): ArcArrow[] {
  let type_seq: Iterable<ArcType>
  if (arc_convention === ArcConvention.PATH_START_ABOVE) {
    type_seq = cycle(['above', 'below'])
  } else if (arc_convention === ArcConvention.PATH_START_BELOW) {
    type_seq = cycle(['below', 'above'])
  } else if (arc_convention === ArcConvention.ABOVE) {
    type_seq = repeat('above')
  } else if (arc_convention === ArcConvention.BELOW) {
    type_seq = repeat('below')
  } else if (arc_convention === ArcConvention.POSITIVE) {
    type_seq = repeat('positive')
  } else {
    type_seq = repeat('negative')
  }

  const result = []
  for (const [[a, b], arc_type] of zip(by_pairs(points), type_seq)) {
    const arc = make_arc(crs, a, b, arc_type)
    if (arc) {
      result.push(arc)
    }
  }
  return result
}

export class NumberLineArcs implements Drawable {
  crs: CRS12
  arcs: ArcArrow[]

  constructor(options: NumberLineArcsOptions) {
    this.crs = new CRS12(options.origin, Direction2P.DIR_X.scale(options.spacing))
    this.arcs = make_arcs(this.crs, options.points, options.arc_convention)
  }

  draw(lib: DrawingLibrary): void {
    this.arcs.forEach((x) => x.draw(lib))
  }
}
