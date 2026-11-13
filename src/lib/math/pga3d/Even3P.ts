import { Odd3P } from './Odd3P.ts'

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

  #gp_odd(odd: Odd3P): Odd3P {
    const { scalar: As, xy: Axy, xz: Axz, xo: Axo, yz: Ayz, yo: Ayo, zo: Azo, xyzo: Axyzo } = this
    const { x: Bx, y: By, z: Bz, o: Bo, xyz: Bxyz, xyo: Bxyo, xzo: Bxzo, yzo: Byzo } = odd
    const o =
      -Axo * Bx -
      -Axyzo * Bxyz +
      -Ayo * By +
      -Azo * Bz +
      As * Bo -
      Axy * Bxyo -
      Axz * Bxzo -
      Ayz * Byzo
    const x = As * Bx + Axy * By + Axz * Bz - Ayz * Bxyz
    const y = As * By - Axy * Bx + Axz * Bxyz + Ayz * Bz
    const z = As * Bz - Axy * Bxyz - Axz * Bx - Ayz * By
    const xyo =
      -Axo * By +
      -Axyzo * Bz -
      -Ayo * Bx +
      -Azo * Bxyz +
      As * Bxyo +
      Axy * Bo -
      Axz * Byzo +
      Ayz * Bxzo
    const xzo =
      -Axo * Bz -
      -Axyzo * By -
      -Ayo * Bxyz -
      -Azo * Bx +
      As * Bxzo +
      Axy * Byzo +
      Axz * Bo -
      Ayz * Bxyo
    const yzo =
      -Axo * Bxyz +
      -Axyzo * Bx +
      -Ayo * Bz -
      -Azo * By +
      As * Byzo -
      Axy * Bxzo +
      Axz * Bxyo +
      Ayz * Bo
    const xyz = As * Bxyz + Axy * Bz - Axz * By + Ayz * Bx
    return new Odd3P(x, y, z, o, xyz, xyo, xzo, yzo)
  }

  #gp_even(even: Even3P): Even3P {
    const { scalar: As, xy: Axy, xz: Axz, xo: Axo, yz: Ayz, yo: Ayo, zo: Azo, xyzo: Axyzo } = this
    const { scalar: Bs, xy: Bxy, xz: Bxz, xo: Bxo, yz: Byz, yo: Byo, zo: Bzo, xyzo: Bxyzo } = even
    const scalar = As * Bs - Axy * Bxy - Axz * Bxz - Ayz * Byz
    const xo = -(
      -Axo * Bs -
      -Axyzo * Byz -
      -Ayo * Bxy -
      -Azo * Bxz +
      As * -Bxo +
      Axy * -Byo +
      Axz * -Bzo -
      Ayz * -Bxyzo
    )
    const yo = -(
      -Axo * Bxy +
      -Axyzo * Bxz +
      -Ayo * Bs -
      -Azo * Byz +
      As * -Byo -
      Axy * -Bxo +
      Axz * -Bxyzo +
      Ayz * -Bzo
    )
    const zo = -(
      -Axo * Bxz -
      -Axyzo * Bxy +
      -Ayo * Byz +
      -Azo * Bs +
      As * -Bzo -
      Axy * -Bxyzo -
      Axz * -Bxo -
      Ayz * -Byo
    )
    const xy = As * Bxy + Axy * Bs - Axz * Byz + Ayz * Bxz
    const xz = As * Bxz + Axy * Byz + Axz * Bs - Ayz * Bxy
    const yz = As * Byz - Axy * Bxz + Axz * Bxy + Ayz * Bs
    const xyzo = -(
      -Axo * Byz +
      -Axyzo * Bs -
      -Ayo * Bxz +
      -Azo * Bxy +
      As * -Bxyzo +
      Axy * -Bzo -
      Axz * -Byo +
      Ayz * -Bxo
    )
    return new Even3P(scalar, xy, xz, xo, yz, yo, zo, xyzo)
  }

  gp(other: Odd3P): Even3P
  gp(other: Even3P): Odd3P
  gp(other: Odd3P | Even3P): Odd3P | Even3P {
    if (other instanceof Odd3P) {
      return this.#gp_odd(other)
    }

    return this.#gp_even(other)
  }

  #wedge_even(even: Even3P): Even3P {
    const { scalar: As, xy: Axy, xz: Axz, xo: Axo, yz: Ayz, yo: Ayo, zo: Azo, xyzo: Axyzo } = this
    const { scalar: Bs, xy: Bxy, xz: Bxz, xo: Bxo, yz: Byz, yo: Byo, zo: Bzo, xyzo: Bxyzo } = even
    const scalar = As * Bs
    const xo = -(-Axo * Bs + As * -Bxo)
    const yo = -(-Ayo * Bs + As * -Byo)
    const zo = -(-Azo * Bs + As * -Bzo)
    const xy = As * Bxy + Axy * Bs
    const xz = As * Bxz + Axz * Bs
    const yz = As * Byz + Ayz * Bs
    const xyzo = -(
      -Axo * Byz +
      -Axyzo * Bs -
      -Ayo * Bxz +
      -Azo * Bxy +
      As * -Bxyzo +
      Axy * -Bzo -
      Axz * -Byo +
      Ayz * -Bxo
    )
    return new Even3P(scalar, xy, xz, xo, yz, yo, zo, xyzo)
  }
  #wedge_odd(odd: Odd3P): Odd3P {
    const { scalar: As, xy: Axy, xz: Axz, xo: Axo, yz: Ayz, yo: Ayo, zo: Azo, xyzo: Axyzo } = this
    const { x: Bx, y: By, z: Bz, o: Bo, xyz: Bxyz, xyo: Bxyo, xzo: Bxzo, yzo: Byzo } = odd
    const o = As * Bo
    const x = As * Bx
    const y = As * By
    const z = As * Bz
    const xyo = -Axo * By - -Ayo * Bx + As * Bxyo + Axy * Bo
    const xzo = -Axo * Bz - -Azo * Bx + As * Bxzo + Axz * Bo
    const yzo = -Ayo * Bz - -Azo * By + As * Byzo + Ayz * Bo
    const xyz = As * Bxyz + Axy * Bz - Axz * By + Ayz * Bx
    return new Odd3P(x, y, z, o, xyz, xyo, xzo, yzo)
  }

  wedge(other: Odd3P): Odd3P
  wedge(other: Even3P): Even3P
  wedge(other: Even3P | Odd3P): Even3P | Odd3P {
    if (other instanceof Odd3P) {
      return this.#wedge_odd(other)
    }

    return this.#wedge_even(other)
  }

  #vee_even(even: Even3P): Even3P {
    const { scalar: As, xy: Axy, xz: Axz, xo: Axo, yz: Ayz, yo: Ayo, zo: Azo, xyzo: Axyzo } = this
    const { scalar: Bs, xy: Bxy, xz: Bxz, xo: Bxo, yz: Byz, yo: Byo, zo: Bzo, xyzo: Bxyzo } = even
    const scalar =
      -Axo * Byz +
      -Axyzo * Bs -
      -Ayo * Bxz +
      -Azo * Bxy +
      As * -Bxyzo +
      Axy * -Bzo -
      Axz * -Byo +
      Ayz * -Bxo
    const xo = -(-Axo * -Bxyzo + -Axyzo * -Bxo)
    const yo = -(-Axyzo * -Byo + -Ayo * -Bxyzo)
    const zo = -(-Axyzo * -Bzo + -Azo * -Bxyzo)
    const xy = -Axyzo * Bxy + Axy * -Bxyzo
    const xz = -Axyzo * Bxz + Axz * -Bxyzo
    const yz = -Axyzo * Byz + Ayz * -Bxyzo
    const xyzo = -(-Axyzo * -Bxyzo)
    return new Even3P(scalar, xy, xz, xo, yz, yo, zo, xyzo)
  }
  #vee_odd(odd: Odd3P): Odd3P {
    const { scalar: As, xy: Axy, xz: Axz, xo: Axo, yz: Ayz, yo: Ayo, zo: Azo, xyzo: Axyzo } = this
    const { x: Bx, y: By, z: Bz, o: Bo, xyz: Bxyz, xyo: Bxyo, xzo: Bxzo, yzo: Byzo } = odd
    const o = -Axo * Byzo + -Axyzo * Bo - -Ayo * Bxzo + -Azo * Bxyo
    const x = -Axo * Bxyz + -Axyzo * Bx - Axy * Bxzo + Axz * Bxyo
    const y = -Axyzo * By + -Ayo * Bxyz - Axy * Byzo + Ayz * Bxyo
    const z = -Axyzo * Bz + -Azo * Bxyz - Axz * Byzo + Ayz * Bxzo
    const xyo = -Axyzo * Bxyo
    const xzo = -Axyzo * Bxzo
    const yzo = -Axyzo * Byzo
    const xyz = -Axyzo * Bxyz
    return new Odd3P(x, y, z, o, xyz, xyo, xzo, yzo)
  }

  vee(other: Even3P): Even3P
  vee(other: Odd3P): Odd3P
  vee(other: Even3P | Odd3P): Even3P | Odd3P {
    if (other instanceof Odd3P) {
      return this.#vee_odd(other)
    }

    return this.#vee_even(other)
  }
}
