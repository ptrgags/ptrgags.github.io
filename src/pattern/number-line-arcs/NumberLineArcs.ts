import { by_pairs } from '../../lib/iteration/by_pairs.ts'
import { cycle } from '../../lib/iteration/cycle.ts'
import { first } from '../../lib/iteration/first.ts'
import { repeat } from '../../lib/iteration/repeat.ts'
import { zip } from '../../lib/iteration/zip.ts'
import { CRS12 } from '../../lib/math/CRS12.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { AngleOrientation, ArcAngles } from '../../lib/primitives/ArcAngles.ts'
import { ArcArrow, type ArrowOptions } from '../../lib/primitives/ArcArrow.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { CircularArc } from '../../lib/primitives/CircularArc.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import { Path } from '../../lib/primitives/Path.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'

export enum ArcConvention {
  /**
   * All arcs are traced in the positive direction
   */
  POS_ANGLE,
  /**
   * All arcs are traced in the negative direction
   */
  NEG_ANGLE,
  /**
   * All arcs will be traced on the +y side of the number line
   */
  POS_Y,
  /**
   * All arcs will be traced on the -y side of the number line
   */
  NEG_Y,
  /**
   * Alternate between upper and lower halves of the number line so the
   * arcs form a C1 continuous path. This version puts the first arc on the +y side of the number line
   */
  PATH_START_POS_Y,
  /**
   * Same as PATH_UPPER but the first arc is on the -y side of the number line
   */
  PATH_START_NEG_Y,
}

const ANGLES_POS_Y_POSITIVE = new ArcAngles(0, Math.PI, AngleOrientation.POSITIVE)
const ANGLES_POS_Y_NEGATIVE = new ArcAngles(Math.PI, 0, AngleOrientation.NEGATIVE)
const ANGLES_NEG_Y_POSITIVE = new ArcAngles(Math.PI, 2 * Math.PI, AngleOrientation.POSITIVE)
const ANGLES_NEG_Y_NEGATIVE = new ArcAngles(0, -Math.PI, AngleOrientation.NEGATIVE)

// Index as ANGLES_BY_TYPE[arc_type][Number(b > a)]
const ANGLES_BY_TYPE = {
  above: [ANGLES_POS_Y_NEGATIVE, ANGLES_POS_Y_POSITIVE],
  below: [ANGLES_NEG_Y_POSITIVE, ANGLES_NEG_Y_NEGATIVE],
  positive: [ANGLES_NEG_Y_POSITIVE, ANGLES_POS_Y_POSITIVE],
  negative: [ANGLES_POS_Y_NEGATIVE, ANGLES_NEG_Y_NEGATIVE],
}

type ArcType = keyof typeof ANGLES_BY_TYPE

function make_arc(crs: CRS12, a: number, b: number, arc_type: ArcType): CircularArc {
  const point_a = crs.position(a)
  const point_b = crs.position(b)
  const circle = Circle.from_two_points(point_a, point_b)

  const index = a < b ? 0 : 1
  const angles = ANGLES_BY_TYPE[arc_type][index]

  return new CircularArc(circle, angles)
}

function make_arcs(crs: CRS12, points: number[], arc_convention: ArcConvention): CircularArc[] {
  const type_seq = get_arc_types(arc_convention)

  const result = []
  for (const [[a, b], arc_type] of zip(by_pairs(points), type_seq)) {
    const arc = make_arc(crs, a, b, arc_type)
    if (arc) {
      result.push(arc)
    }
  }
  return result
}

function get_arc_types(arc_convention: ArcConvention): Iterable<ArcType> {
  if (arc_convention === ArcConvention.PATH_START_POS_Y) {
    return cycle(['above', 'below'])
  }
  if (arc_convention === ArcConvention.PATH_START_NEG_Y) {
    return cycle(['below', 'above'])
  }
  if (arc_convention === ArcConvention.POS_Y) {
    return repeat('above')
  }
  if (arc_convention === ArcConvention.NEG_Y) {
    return repeat('below')
  }
  if (arc_convention === ArcConvention.POS_ANGLE) {
    return repeat('positive')
  }
  // NEG_ANGLE
  return repeat('negative')
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
}

export class NumberLineArcs {
  crs: CRS12
  arc_convention: ArcConvention

  constructor(options: NumberLineArcsOptions) {
    this.crs = new CRS12(options.origin, Direction2P.DIR_X.scale(options.spacing))
    this.arc_convention = options.arc_convention
  }

  make_arc(a: number, b: number): CircularArc {
    const arc_seq = get_arc_types(this.arc_convention)
    const arc_type = first(arc_seq)

    if (!arc_type) {
      // All the sequences are infinite, so first will always return
      throw Error('impossible')
    }

    return make_arc(this.crs, a, b, arc_type)
  }

  make_path(points: number[], closed: boolean): Path {
    const arcs = make_arcs(this.crs, points, this.arc_convention)
    return new Path({ parts: arcs, closed })
  }

  make_arrow(a: number, b: number, arrow_options: Partial<ArrowOptions> = {}): ArcArrow {
    const arc = this.make_arc(a, b)

    return new ArcArrow({
      circle: arc.circle,
      angles: arc.angles,
      ...arrow_options,
    })
  }

  make_arrows(points: number[], arrow_options: Partial<ArrowOptions> = {}): ArcArrow[] {
    const arcs = make_arcs(this.crs, points, this.arc_convention)
    return arcs.map(
      (x) =>
        new ArcArrow({
          circle: x.circle,
          angles: x.angles,
          ...arrow_options,
        }),
    )
  }
}
