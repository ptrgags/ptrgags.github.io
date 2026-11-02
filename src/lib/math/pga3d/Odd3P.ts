import type { Even3P } from './Even3P.ts'

export class Odd3P {
  x: number
  y: number
  z: number
  o: number
  xyz: number
  xyo: number
  xzo: number
  yzo: number

  constructor(
    x: number,
    y: number,
    z: number,
    o: number,
    xyz: number,
    xyo: number,
    xzo: number,
    yzo: number,
  ) {
    this.x = x
    this.y = y
    this.z = z
    this.o = o
    this.xyz = xyz
    this.xyo = xyo
    this.xzo = xzo
    this.yzo = yzo
  }

  dual(): Odd3P {
    throw new Error('not implemented')
  }

  antidual(): Odd3P {
    throw new Error('not implemented')
  }

  reverse(): Odd3P {
    throw new Error('not implemented')
  }

  #gp_odd(odd: Odd3P): Even3P {
    throw new Error('not implemented')
  }

  #gp_even(even: Even3P): Odd3P {
    throw new Error('not implemented')
  }

  gp(other: Odd3P): Even3P
  gp(other: Even3P): Odd3P
  gp(other: Odd3P | Even3P): Odd3P | Even3P {
    if (other instanceof Odd3P) {
      return this.#gp_odd(other)
    }

    return this.#gp_even(other)
  }

  equals(other: Odd3P): boolean {
    throw new Error('not implemented')
  }
}
