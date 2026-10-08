export enum ArcConvention {
  POSITIVE,
  NEGATIVE,
  UPPER,
  LOWER,
  PATH_POSITIVE,
  PATH_NEGATIVE,
}

export class NumberLineArcs {
  // crs: CRS12
  points: number[]

  constructor() {
    this.points = []
  }

  // Or should the constructor take a list of numbers and construct the arcs from that?
  arc(a: number, b: number) {
    // I need to think through the math for the different conventions
  }
}
