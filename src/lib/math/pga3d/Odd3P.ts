import { Even3P } from './Even3P.ts'

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
    const { x: Ax, y: Ay, z: Az, o: Ao, xyz: Axyz, xyo: Axyo, xzo: Axzo, yzo: Ayzo } = this
    const { x: Bx, y: By, z: Bz, o: Bo, xyz: Bxyz, xyo: Bxyo, xzo: Bxzo, yzo: Byzo } = odd
    const scalar = Ax * Bx - Axyz * Bxyz + Ay * By + Az * Bz
    const xo = -(
      Ao * Bx +
      Axyo * By +
      Axzo * Bz -
      Ayzo * Bxyz -
      Ax * Bo +
      Axyz * Byzo +
      Ay * Bxyo +
      Az * Bxzo
    )
    const yo = -(
      Ao * By -
      Axyo * Bx +
      Axzo * Bxyz +
      Ayzo * Bz -
      Ax * Bxyo -
      Axyz * Bxzo -
      Ay * Bo +
      Az * Byzo
    )
    const zo = -(
      Ao * Bz -
      Axyo * Bxyz -
      Axzo * Bx -
      Ayzo * By -
      Ax * Bxzo +
      Axyz * Bxyo -
      Ay * Byzo -
      Az * Bo
    )
    const xy = Ax * By + Axyz * Bz - Ay * Bx + Az * Bxyz
    const xz = Ax * Bz - Axyz * By - Ay * Bxyz - Az * Bx
    const yz = Ax * Bxyz + Axyz * Bx + Ay * Bz - Az * By
    const xyzo = -(
      Ao * Bxyz +
      Axyo * Bz -
      Axzo * By +
      Ayzo * Bx -
      Ax * Byzo -
      Axyz * Bo +
      Ay * Bxzo -
      Az * Bxyo
    )
    return new Even3P(scalar, xy, xz, xo, yz, yo, zo, xyzo)
  }

  #gp_even(even: Even3P): Odd3P {
    const { x: Ax, y: Ay, z: Az, o: Ao, xyz: Axyz, xyo: Axyo, xzo: Axzo, yzo: Ayzo } = this
    const { scalar: Bs, xy: Bxy, xz: Bxz, xo: Bxo, yz: Byz, yo: Byo, zo: Bzo, xyzo: Bxyzo } = even
    const o =
      Ao * Bs -
      Axyo * Bxy -
      Axzo * Bxz -
      Ayzo * Byz -
      Ax * -Bxo +
      Axyz * -Bxyzo -
      Ay * -Byo -
      Az * -Bzo
    const x = Ax * Bs - Axyz * Byz - Ay * Bxy - Az * Bxz
    const y = Ax * Bxy + Axyz * Bxz + Ay * Bs - Az * Byz
    const z = Ax * Bxz - Axyz * Bxy + Ay * Byz + Az * Bs
    const xyo =
      Ao * Bxy +
      Axyo * Bs -
      Axzo * Byz +
      Ayzo * Bxz -
      Ax * -Byo -
      Axyz * -Bzo +
      Ay * -Bxo -
      Az * -Bxyzo
    const xzo =
      Ao * Bxz +
      Axyo * Byz +
      Axzo * Bs -
      Ayzo * Bxy -
      Ax * -Bzo +
      Axyz * -Byo +
      Ay * -Bxyzo +
      Az * -Bxo
    const yzo =
      Ao * Byz -
      Axyo * Bxz +
      Axzo * Bxy +
      Ayzo * Bs -
      Ax * -Bxyzo -
      Axyz * -Bxo -
      Ay * -Bzo +
      Az * -Byo
    const xyz = Ax * Byz + Axyz * Bs - Ay * Bxz + Az * Bxy
    return new Odd3P(x, y, z, o, xyz, xyo, xzo, yzo)
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

  #wedge_even(even: Even3P): Odd3P {
    const { x: Ax, y: Ay, z: Az, o: Ao, xyz: Axyz, xyo: Axyo, xzo: Axzo, yzo: Ayzo } = this
    const { scalar: Bs, xy: Bxy, xz: Bxz, xo: Bxo, yz: Byz, yo: Byo, zo: Bzo, xyzo: Bxyzo } = even
    const o = Ao * Bs
    const x = Ax * Bs
    const y = Ay * Bs
    const z = Az * Bs
    const xyo = Ao * Bxy + Axyo * Bs - Ax * -Byo + Ay * -Bxo
    const xzo = Ao * Bxz + Axzo * Bs - Ax * -Bzo + Az * -Bxo
    const yzo = Ao * Byz + Ayzo * Bs - Ay * -Bzo + Az * -Byo
    const xyz = Ax * Byz + Axyz * Bs - Ay * Bxz + Az * Bxy
    return new Odd3P(x, y, z, o, xyz, xyo, xzo, yzo)
  }
  #wedge_odd(odd: Odd3P): Even3P {
    const { x: Ax, y: Ay, z: Az, o: Ao, xyz: Axyz, xyo: Axyo, xzo: Axzo, yzo: Ayzo } = this
    const { x: Bx, y: By, z: Bz, o: Bo, xyz: Bxyz, xyo: Bxyo, xzo: Bxzo, yzo: Byzo } = odd
    const xo = -(Ao * Bx - Ax * Bo)
    const yo = -(Ao * By - Ay * Bo)
    const zo = -(Ao * Bz - Az * Bo)
    const xy = Ax * By - Ay * Bx
    const xz = Ax * Bz - Az * Bx
    const yz = Ay * Bz - Az * By
    const xyzo = -(
      Ao * Bxyz +
      Axyo * Bz -
      Axzo * By +
      Ayzo * Bx -
      Ax * Byzo -
      Axyz * Bo +
      Ay * Bxzo -
      Az * Bxyo
    )
    const scalar = 0
    return new Even3P(scalar, xy, xz, xo, yz, yo, zo, xyzo)
  }

  wedge(other: Odd3P): Odd3P
  wedge(other: Even3P): Even3P
  wedge(other: Even3P | Odd3P): Even3P | Odd3P {
    if (other instanceof Odd3P) {
      return this.#wedge_odd(other)
    }

    return this.#wedge_even(other)
  }

  #vee_even(even: Even3P): Odd3P {
    const { x: Ax, y: Ay, z: Az, o: Ao, xyz: Axyz, xyo: Axyo, xzo: Axzo, yzo: Ayzo } = this
    const { scalar: Bs, xy: Bxy, xz: Bxz, xo: Bxo, yz: Byz, yo: Byo, zo: Bzo, xyzo: Bxyzo } = even
    const o = Ao * -Bxyzo + Axyo * -Bzo - Axzo * -Byo + Ayzo * -Bxo
    const x = Axyo * Bxz - Axzo * Bxy + Ax * -Bxyzo + Axyz * -Bxo
    const y = Axyo * Byz - Ayzo * Bxy + Axyz * -Byo + Ay * -Bxyzo
    const z = Axzo * Byz - Ayzo * Bxz + Axyz * -Bzo + Az * -Bxyzo
    const xyo = Axyo * -Bxyzo
    const xzo = Axzo * -Bxyzo
    const yzo = Ayzo * -Bxyzo
    const xyz = Axyz * -Bxyzo
    return new Odd3P(x, y, z, o, xyz, xyo, xzo, yzo)
  }
  #vee_odd(odd: Odd3P): Even3P {
    const { x: Ax, y: Ay, z: Az, o: Ao, xyz: Axyz, xyo: Axyo, xzo: Axzo, yzo: Ayzo } = this
    const { x: Bx, y: By, z: Bz, o: Bo, xyz: Bxyz, xyo: Bxyo, xzo: Bxzo, yzo: Byzo } = odd
    const scalar =
      Ao * Bxyz + Axyo * Bz - Axzo * By + Ayzo * Bx - Ax * Byzo - Axyz * Bo + Ay * Bxzo - Az * Bxyo
    const xo = -(Axyo * Bxzo - Axzo * Bxyo)
    const yo = -(Axyo * Byzo - Ayzo * Bxyo)
    const zo = -(Axzo * Byzo - Ayzo * Bxzo)
    const xy = Axyo * Bxyz - Axyz * Bxyo
    const xz = Axzo * Bxyz - Axyz * Bxzo
    const yz = Ayzo * Bxyz - Axyz * Byzo
    const xyzo = 0
    return new Even3P(scalar, xy, xz, xo, yz, yo, zo, xyzo)
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
