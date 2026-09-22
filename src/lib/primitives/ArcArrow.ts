import type { ArcAngles } from './ArcAngles.ts'
import type { Circle } from './Circle.ts'
import type { Dimensionlike } from './Dimensionlike.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'

export enum ArrowParts {
  ARROW_UPPER = 0b0001,
  ARROW_LOWER = 0b0010,
  BOUNDARY_UPPER = 0b0100,
  BOUNDARY_LOWER = 0b1000,
}

export interface ArcArowOptions {
  circle: Circle
  angles: ArcAngles
  tip?: number
  tail?: number
  arrow_radii?: Dimensionlike
}

export class ArcArrow implements Drawable {
  circle: Circle
  angles: ArcAngles
  tip: number
  tail: number
  arrow_radii: Dimensionlike

  constructor(options: ArcArowOptions) {
    this.circle = options.circle
    this.angles = options.angles
    this.tip = options.tip ?? ArrowParts.ARROW_UPPER | ArrowParts.ARROW_LOWER
    this.tail = options.tail ?? 0

    this.arrow_radii = options.arrow_radii ?? {
      width: this.circle.radius / 8,
      height: this.circle.radius / 8,
    }
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.circle.center
    const r = this.circle.radius
    const { start_angle, end_angle, orientation } = this.angles
    lib.arc(x, y, r, start_angle, end_angle, orientation)

    const { width, height } = this.arrow_radii

    if (this.tip > 0) {
      const end_c = Math.cos(end_angle)
      const end_s = Math.sin(end_angle)
      const tip_x = x + r * end_c
      const tip_y = y + r * end_s
      const nx = height * end_c
      const ny = height * end_s
      const tx = -width * end_s
      const ty = width * end_c

      if ((this.tip & ArrowParts.BOUNDARY_UPPER) === ArrowParts.BOUNDARY_UPPER) {
        lib.segment(tip_x, tip_y, tip_x + nx, tip_y + ny)
      }

      if ((this.tip & ArrowParts.BOUNDARY_LOWER) === ArrowParts.BOUNDARY_LOWER) {
        lib.segment(tip_x, tip_y, tip_x - nx, tip_y - ny)
      }

      if ((this.tip & ArrowParts.ARROW_LOWER) === ArrowParts.ARROW_LOWER) {
        lib.segment(tip_x, tip_y, tip_x - nx - orientation * tx, tip_y - ny - orientation * ty)
      }

      if ((this.tip & ArrowParts.ARROW_UPPER) === ArrowParts.ARROW_UPPER) {
        lib.segment(tip_x, tip_y, tip_x + nx - orientation * tx, tip_y + ny - orientation * ty)
      }
    }

    if (this.tail > 0) {
      const start_c = Math.cos(start_angle)
      const start_s = Math.sin(start_angle)
      const tail_x = x + r * start_c
      const tail_y = y + r * start_s
      const nx = height * start_c
      const ny = height * start_s
      const tx = -width * start_s
      const ty = width * start_c

      if ((this.tail & ArrowParts.BOUNDARY_UPPER) === ArrowParts.BOUNDARY_UPPER) {
        lib.segment(tail_x, tail_y, tail_x + nx, tail_y + ny)
      }

      if ((this.tail & ArrowParts.BOUNDARY_LOWER) === ArrowParts.BOUNDARY_LOWER) {
        lib.segment(tail_x, tail_y, tail_x - nx, tail_y - ny)
      }

      if ((this.tail & ArrowParts.ARROW_LOWER) === ArrowParts.ARROW_LOWER) {
        lib.segment(tail_x, tail_y, tail_x - nx + orientation * tx, tail_y - ny + orientation * ty)
      }

      if ((this.tail & ArrowParts.ARROW_UPPER) === ArrowParts.ARROW_UPPER) {
        lib.segment(tail_x, tail_y, tail_x + nx + orientation * tx, tail_y + ny + orientation * ty)
      }
    }
  }
}
