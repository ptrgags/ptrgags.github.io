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
      Aox * Bx - Aoxyz * Bxyz + Aoy * By + Aoz * Bz + As * Bo - Axy * Boxy - Axz * Boxz - Ayz * Boyz
    const x = As * Bx + Axy * By + Axz * Bz - Ayz * Bxyz
    const y = As * By - Axy * Bx + Axz * Bxyz + Ayz * Bz
    const z = As * Bz - Axy * Bxyz - Axz * Bx - Ayz * By
    const xyo =
      Aox * By + Aoxyz * Bz - Aoy * Bx + Aoz * Bxyz + As * Boxy + Axy * Bo - Axz * Boyz + Ayz * Boxz
    const xzo =
      Aox * Bz - Aoxyz * By - Aoy * Bxyz - Aoz * Bx + As * Boxz + Axy * Boyz + Axz * Bo - Ayz * Boxy
    const yzo =
      Aox * Bxyz + Aoxyz * Bx + Aoy * Bz - Aoz * By + As * Boyz - Axy * Boxz + Axz * Boxy + Ayz * Bo
    const xyz = As * Bxyz + Axy * Bz - Axz * By + Ayz * Bx
    return new Odd3P(x, y, z, o, xyz, xyo, xzo, yzo)
  }

  #gp_even(even: Even3P): Even3P {
    const { scalar: As, xy: Axy, xz: Axz, xo: Axo, yz: Ayz, yo: Ayo, zo: Azo, xyzo: Axyzo } = this
    const { scalar: Bs, xy: Bxy, xz: Bxz, xo: Bxo, yz: Byz, yo: Byo, zo: Bzo, xyzo: Bxyzo } = even
    const scalar = As * Bs - Axy * Bxy - Axz * Bxz - Ayz * Byz
    const xo = -(
      Aox * Bs -
      Aoxyz * Byz -
      Aoy * Bxy -
      Aoz * Bxz +
      As * Box +
      Axy * Boy +
      Axz * Boz -
      Ayz * Boxyz
    )
    const yo = -(
      Aox * Bxy +
      Aoxyz * Bxz +
      Aoy * Bs -
      Aoz * Byz +
      As * Boy -
      Axy * Box +
      Axz * Boxyz +
      Ayz * Boz
    )
    const zo = -(
      Aox * Bxz -
      Aoxyz * Bxy +
      Aoy * Byz +
      Aoz * Bs +
      As * Boz -
      Axy * Boxyz -
      Axz * Box -
      Ayz * Boy
    )
    const xy = As * Bxy + Axy * Bs - Axz * Byz + Ayz * Bxz
    const xz = As * Bxz + Axy * Byz + Axz * Bs - Ayz * Bxy
    const yz = As * Byz - Axy * Bxz + Axz * Bxy + Ayz * Bs
    const xyzo = -(
      Aox * Byz +
      Aoxyz * Bs -
      Aoy * Bxz +
      Aoz * Bxy +
      As * Boxyz +
      Axy * Boz -
      Axz * Boy +
      Ayz * Box
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
    const xo = -(Aox * Bs + As * Box)
    const yo = -(Aoy * Bs + As * Boy)
    const zo = -(Aoz * Bs + As * Boz)
    const xy = As * Bxy + Axy * Bs
    const xz = As * Bxz + Axz * Bs
    const yz = As * Byz + Ayz * Bs
    const xyzo = -(
      Aox * Byz +
      Aoxyz * Bs -
      Aoy * Bxz +
      Aoz * Bxy +
      As * Boxyz +
      Axy * Boz -
      Axz * Boy +
      Ayz * Box
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
    const xyo = Aox * By - Aoy * Bx + As * Boxy + Axy * Bo
    const xzo = Aox * Bz - Aoz * Bx + As * Boxz + Axz * Bo
    const yzo = Aoy * Bz - Aoz * By + As * Boyz + Ayz * Bo
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
      Aox * Byz +
      Aoxyz * Bs -
      Aoy * Bxz +
      Aoz * Bxy +
      As * Boxyz +
      Axy * Boz -
      Axz * Boy +
      Ayz * Box
    const xo = -(Aox * Boxyz + Aoxyz * Box)
    const yo = -(Aoxyz * Boy + Aoy * Boxyz)
    const zo = -(Aoxyz * Boz + Aoz * Boxyz)
    const xy = Aoxyz * Bxy + Axy * Boxyz
    const xz = Aoxyz * Bxz + Axz * Boxyz
    const yz = Aoxyz * Byz + Ayz * Boxyz
    const xyzo = -(Aoxyz * Boxyz)
    return new Even3P(scalar, xy, xz, xo, yz, yo, zo, xyzo)
  }
  #vee_odd(odd: Odd3P): Odd3P {
    const { scalar: As, xy: Axy, xz: Axz, xo: Axo, yz: Ayz, yo: Ayo, zo: Azo, xyzo: Axyzo } = this
    const { x: Bx, y: By, z: Bz, o: Bo, xyz: Bxyz, xyo: Bxyo, xzo: Bxzo, yzo: Byzo } = odd
    const o = Aox * Boyz + Aoxyz * Bo - Aoy * Boxz + Aoz * Boxy
    const x = Aox * Bxyz + Aoxyz * Bx - Axy * Boxz + Axz * Boxy
    const y = Aoxyz * By + Aoy * Bxyz - Axy * Boyz + Ayz * Boxy
    const z = Aoxyz * Bz + Aoz * Bxyz - Axz * Boyz + Ayz * Boxz
    const xyo = Aoxyz * Boxy
    const xzo = Aoxyz * Boxz
    const yzo = Aoxyz * Boyz
    const xyz = Aoxyz * Bxyz
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
