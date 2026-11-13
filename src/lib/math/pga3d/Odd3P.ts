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
      Aoxy * By +
      Aoxz * Bz -
      Aoyz * Bxyz -
      Ax * Bo +
      Axyz * Boyz +
      Ay * Boxy +
      Az * Boxz
    )
    const yo = -(
      Ao * By -
      Aoxy * Bx +
      Aoxz * Bxyz +
      Aoyz * Bz -
      Ax * Boxy -
      Axyz * Boxz -
      Ay * Bo +
      Az * Boyz
    )
    const zo = -(
      Ao * Bz -
      Aoxy * Bxyz -
      Aoxz * Bx -
      Aoyz * By -
      Ax * Boxz +
      Axyz * Boxy -
      Ay * Boyz -
      Az * Bo
    )
    const xy = Ax * By + Axyz * Bz - Ay * Bx + Az * Bxyz
    const xz = Ax * Bz - Axyz * By - Ay * Bxyz - Az * Bx
    const yz = Ax * Bxyz + Axyz * Bx + Ay * Bz - Az * By
    const xyzo = -(
      Ao * Bxyz +
      Aoxy * Bz -
      Aoxz * By +
      Aoyz * Bx -
      Ax * Boyz -
      Axyz * Bo +
      Ay * Boxz -
      Az * Boxy
    )
    return new Even3P(scalar, xy, xz, xo, yz, yo, zo, xyzo)
  }

  #gp_even(even: Even3P): Odd3P {
    const { x: Ax, y: Ay, z: Az, o: Ao, xyz: Axyz, xyo: Axyo, xzo: Axzo, yzo: Ayzo } = this
    const { scalar: Bs, xy: Bxy, xz: Bxz, xo: Bxo, yz: Byz, yo: Byo, zo: Bzo, xyzo: Bxyzo } = even
    const o =
      Ao * Bs - Aoxy * Bxy - Aoxz * Bxz - Aoyz * Byz - Ax * Box + Axyz * Boxyz - Ay * Boy - Az * Boz
    const x = Ax * Bs - Axyz * Byz - Ay * Bxy - Az * Bxz
    const y = Ax * Bxy + Axyz * Bxz + Ay * Bs - Az * Byz
    const z = Ax * Bxz - Axyz * Bxy + Ay * Byz + Az * Bs
    const xyo =
      Ao * Bxy + Aoxy * Bs - Aoxz * Byz + Aoyz * Bxz - Ax * Boy - Axyz * Boz + Ay * Box - Az * Boxyz
    const xzo =
      Ao * Bxz + Aoxy * Byz + Aoxz * Bs - Aoyz * Bxy - Ax * Boz + Axyz * Boy + Ay * Boxyz + Az * Box
    const yzo =
      Ao * Byz - Aoxy * Bxz + Aoxz * Bxy + Aoyz * Bs - Ax * Boxyz - Axyz * Box - Ay * Boz + Az * Boy
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
    const xyo = Ao * Bxy + Aoxy * Bs - Ax * Boy + Ay * Box
    const xzo = Ao * Bxz + Aoxz * Bs - Ax * Boz + Az * Box
    const yzo = Ao * Byz + Aoyz * Bs - Ay * Boz + Az * Boy
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
      Aoxy * Bz -
      Aoxz * By +
      Aoyz * Bx -
      Ax * Boyz -
      Axyz * Bo +
      Ay * Boxz -
      Az * Boxy
    )
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
    const o = Ao * Boxyz + Aoxy * Boz - Aoxz * Boy + Aoyz * Box
    const x = Aoxy * Bxz - Aoxz * Bxy + Ax * Boxyz + Axyz * Box
    const y = Aoxy * Byz - Aoyz * Bxy + Axyz * Boy + Ay * Boxyz
    const z = Aoxz * Byz - Aoyz * Bxz + Axyz * Boz + Az * Boxyz
    const xyo = Aoxy * Boxyz
    const xzo = Aoxz * Boxyz
    const yzo = Aoyz * Boxyz
    const xyz = Axyz * Boxyz
    return new Odd3P(x, y, z, o, xyz, xyo, xzo, yzo)
  }
  #vee_odd(odd: Odd3P): Even3P {
    const { x: Ax, y: Ay, z: Az, o: Ao, xyz: Axyz, xyo: Axyo, xzo: Axzo, yzo: Ayzo } = this
    const { x: Bx, y: By, z: Bz, o: Bo, xyz: Bxyz, xyo: Bxyo, xzo: Bxzo, yzo: Byzo } = odd
    const scalar =
      Ao * Bxyz + Aoxy * Bz - Aoxz * By + Aoyz * Bx - Ax * Boyz - Axyz * Bo + Ay * Boxz - Az * Boxy
    const xo = -(Aoxy * Boxz - Aoxz * Boxy)
    const yo = -(Aoxy * Boyz - Aoyz * Boxy)
    const zo = -(Aoxz * Boyz - Aoyz * Boxz)
    const xy = Aoxy * Bxyz - Axyz * Boxy
    const xz = Aoxz * Bxyz - Axyz * Boxz
    const yz = Aoyz * Bxyz - Axyz * Boyz
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
