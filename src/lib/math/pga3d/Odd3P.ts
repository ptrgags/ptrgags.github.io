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
    (As*Bs - Axy*Bxy - Axz*Bxz - Ayz*Byz)
(Aox*Bs - Aoxyz*Byz - Aoy*Bxy - Aoz*Bxz + As*Box + Axy*Boy + Axz*Boz - Ayz*Boxyz) 𝐞₀₁ 
(Aox*Bxy + Aoxyz*Bxz + Aoy*Bs - Aoz*Byz + As*Boy - Axy*Box + Axz*Boxyz + Ayz*Boz) 𝐞₀₂ 
(Aox*Bxz - Aoxyz*Bxy + Aoy*Byz + Aoz*Bs + As*Boz - Axy*Boxyz - Axz*Box - Ayz*Boy) 𝐞₀₃ 
(As*Bxy + Axy*Bs - Axz*Byz + Ayz*Bxz) 𝐞₁₂ 
(As*Bxz + Axy*Byz + Axz*Bs - Ayz*Bxy) 𝐞₁₃ 
(As*Byz - Axy*Bxz + Axz*Bxy + Ayz*Bs) 𝐞₂₃
(Aox*Byz + Aoxyz*Bs - Aoy*Bxz + Aoz*Bxy + As*Boxyz + Axy*Boz - Axz*Boy + Ayz*Box) 𝐞₀₁₂₃
  }

  #gp_even(even: Even3P): Odd3P {
    (Ao*Bs - Aoxy*Bxy - Aoxz*Bxz - Aoyz*Byz - Ax*Box + Axyz*Boxyz - Ay*Boy - Az*Boz) 𝐞₀ 
(Ax*Bs - Axyz*Byz - Ay*Bxy - Az*Bxz) 𝐞₁ 
(Ax*Bxy + Axyz*Bxz + Ay*Bs - Az*Byz) 𝐞₂ 
(Ax*Bxz - Axyz*Bxy + Ay*Byz + Az*Bs) 𝐞₃
(Ao*Bxy + Aoxy*Bs - Aoxz*Byz + Aoyz*Bxz - Ax*Boy - Axyz*Boz + Ay*Box - Az*Boxyz) 𝐞₀₁₂ 
(Ao*Bxz + Aoxy*Byz + Aoxz*Bs - Aoyz*Bxy - Ax*Boz + Axyz*Boy + Ay*Boxyz + Az*Box) 𝐞₀₁₃ 
(Ao*Byz - Aoxy*Bxz + Aoxz*Bxy + Aoyz*Bs - Ax*Boxyz - Axyz*Box - Ay*Boz + Az*Boy) 𝐞₀₂₃ 
(Ax*Byz + Axyz*Bs - Ay*Bxz + Az*Bxy) 𝐞₁₂₃
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
