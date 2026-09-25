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
