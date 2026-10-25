import type { Odd3P } from './Odd3P.ts'

export class Even3P {
  scalar: number
  xy: number
  xz: number
  xo: number
  yz: number
  yo: number
  zo: number
  xyzo: number

  constructor(
    scalar: number,
    xy: number,
    xz: number,
    xo: number,
    yz: number,
    yo: number,
    zo: number,
    xyzo: number,
  ) {
    this.scalar = scalar
    this.xy = xy
    this.xz = xz
    this.xo = xo
    this.yz = yz
    this.yo = yo
    this.zo = zo
    this.xyzo = xyzo
  }

  #wedge_even() {
    throw new Error('not implemented')
  }
  #wedge_odd() {
    throw new Error('not implemented')
  }

  wedge(other: Odd3P): Odd3P
  wedge(other: Even3P): Even3P
  wedge(other: Even3P | Odd3P): Even3P | Odd3P {
    throw new Error('not implemented')
  }
}
