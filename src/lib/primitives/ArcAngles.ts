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

  complement(): ArcAngles {
    return new ArcAngles(this.end_angle, this.start_angle, this.orientation)
  }

  other_arc(): ArcAngles {
    return new ArcAngles(this.start_angle, this.end_angle, -this.orientation)
  }

  reverse(): ArcAngles {
    return new ArcAngles(this.end_angle, this.start_angle, -this.orientation)
  }

  flip_y(): ArcAngles {
    return new ArcAngles(-this.start_angle, -this.end_angle, -this.orientation)
  }
}
