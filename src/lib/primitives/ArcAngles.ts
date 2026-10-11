import { mod } from '../math/mod.ts'

export enum AngleOrientation {
  NEGATIVE = -1,
  POSITIVE = 1,
}

export class ArcAngles {
  start_angle: number
  end_angle: number
  orientation: AngleOrientation

  constructor(start_angle: number, end_angle: number, orientation: AngleOrientation) {
    this.start_angle = start_angle
    this.end_angle = end_angle
    this.orientation = orientation
  }

  angle(t: number): number {
    return this.orientation === 1
      ? this.start_angle + 0.5 * mod(this.end_angle - this.start_angle, 2.0 * Math.PI)
      : this.end_angle + 0.5 * mod(this.start_angle - this.end_angle, 2.0 * Math.PI)
  }

  get subtended_angle(): number {
    // This is probably not right in all cases.
    return mod(this.end_angle - this.start_angle, 2.0 * Math.PI)
  }

  swap(): ArcAngles {
    return new ArcAngles(this.end_angle, this.start_angle, this.orientation)
  }

  reverse_angles(): ArcAngles {
    return new ArcAngles(-this.start_angle, -this.end_angle, -this.orientation)
  }

  reverse_orientation(): ArcAngles {
    return new ArcAngles(this.start_angle, this.end_angle, -this.orientation)
  }

  phase_shift(delta: number): ArcAngles {
    return new ArcAngles(this.start_angle + delta, this.end_angle + delta, this.orientation)
  }
}
