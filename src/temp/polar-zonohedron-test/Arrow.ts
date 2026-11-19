import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import type { ArcAngles } from '../../lib/primitives/ArcAngles.ts'
import type { Circle } from '../../lib/primitives/Circle.ts'
import type { Dimensionlike } from '../../lib/primitives/Dimensionlike.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import type { DrawingLibrary } from '../../lib/primitives/DrawingLibrary.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import type { Vec2 } from '../../lib/primitives/Vec2.ts'

export enum ArrowParts {
  ARROW_UPPER = 0b0001,
  ARROW_LOWER = 0b0010,
  ARROW_BOTH = 0b0011,
  BOUNDARY_UPPER = 0b0100,
  BOUNDARY_LOWER = 0b1000,
  BOUNDARY_BOTH = 0b1100,
}

export interface ArrowSegmentOptions {
  start: Vec2
  end: Vec2
}

export interface ArrowOptions {
  tip: number
  tail: number
  arrow_radii: Dimensionlike
}

export type ArrOptions = ArrowSegmentOptions & Partial<ArrowOptions>

// hacking this together for now.
export class Arrow implements Drawable {
  segment: LineSegment
  tip: number
  tail: number
  arrow_radii: Dimensionlike

  constructor(options: ArrOptions) {
    this.segment = new LineSegment(options.start, options.end)
    this.tip = options.tip ?? ArrowParts.ARROW_UPPER | ArrowParts.ARROW_LOWER
    this.tail = options.tail ?? 0

    this.arrow_radii = options.arrow_radii ?? {
      width: 16,
      height: 16,
    }
  }

  draw(lib: DrawingLibrary): void {
    this.segment.draw(lib)

    const { width, height } = this.arrow_radii

    const start = Direction2P.from_vec2(this.segment.start)
    const end = Direction2P.from_vec2(this.segment.end)

    // For a line segemnt, normal and tangent are constant along the length
    const tangent = end.sub(start).normalize()
    const normal = tangent.rot90()

    if (this.tip > 0) {
      const tip_x = end.x
      const tip_y = end.y
      const nx = height * normal.x
      const ny = height * normal.y
      const tx = width * tangent.x
      const ty = width * tangent.y

      if ((this.tip & ArrowParts.BOUNDARY_UPPER) === ArrowParts.BOUNDARY_UPPER) {
        lib.segment(tip_x, tip_y, tip_x + nx, tip_y + ny)
      }

      if ((this.tip & ArrowParts.BOUNDARY_LOWER) === ArrowParts.BOUNDARY_LOWER) {
        lib.segment(tip_x, tip_y, tip_x - nx, tip_y - ny)
      }

      if ((this.tip & ArrowParts.ARROW_LOWER) === ArrowParts.ARROW_LOWER) {
        lib.segment(tip_x, tip_y, tip_x - nx - tx, tip_y - ny - ty)
      }

      if ((this.tip & ArrowParts.ARROW_UPPER) === ArrowParts.ARROW_UPPER) {
        lib.segment(tip_x, tip_y, tip_x + nx - tx, tip_y + ny - ty)
      }
    }

    if (this.tail > 0) {
      const tail_x = start.x
      const tail_y = start.y
      const nx = height * normal.x
      const ny = height * normal.y
      const tx = width * tangent.x
      const ty = width * tangent.y

      if ((this.tail & ArrowParts.BOUNDARY_UPPER) === ArrowParts.BOUNDARY_UPPER) {
        lib.segment(tail_x, tail_y, tail_x + nx, tail_y + ny)
      }

      if ((this.tail & ArrowParts.BOUNDARY_LOWER) === ArrowParts.BOUNDARY_LOWER) {
        lib.segment(tail_x, tail_y, tail_x - nx, tail_y - ny)
      }

      if ((this.tail & ArrowParts.ARROW_LOWER) === ArrowParts.ARROW_LOWER) {
        lib.segment(tail_x, tail_y, tail_x - nx + tx, tail_y - ny + ty)
      }

      if ((this.tail & ArrowParts.ARROW_UPPER) === ArrowParts.ARROW_UPPER) {
        lib.segment(tail_x, tail_y, tail_x + nx + tx, tail_y + ny + ty)
      }
    }
  }
}
