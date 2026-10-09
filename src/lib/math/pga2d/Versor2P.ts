import { Even2P } from './Even2P.ts'
import type { Odd2P } from './Odd2P.ts'

export class Versor2P {
  versor: Even2P | Odd2P

  constructor(versor: Even2P | Odd2P) {
    this.versor = versor
  }

  /**
   * Rotation about the origin
   * @param angle
   * @returns
   */
  static rotation(angle: number): Versor2P {
    const c = Math.cos(angle / 2)
    const s = Math.sin(angle / 2)

    // the versor cos(theta/2) + sin(theta / 2)xy rotates in the negative
    // direction, so use -sin() instead
    const versor = new Even2P(c, -s, 0, 0)
    return new Versor2P(versor)
  }

  inv(): Versor2P {
    throw new Error('not implemented')
    //return new Versor2P(this.versor.reverse())
  }

  compose(other: Versor2P): Versor2P {
    // huh, I never implemented geometric product for 2D PGA
    throw new Error('not implemented')
    //return new Versor2P(this.versor.gp(other.versor))
  }

  static readonly IDENTITY = new Versor2P(Even2P.IDENTITY)
}
