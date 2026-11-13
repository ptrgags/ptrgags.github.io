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

  #gp_odd() {
    (Aox*Bx - Aoxyz*Bxyz + Aoy*By + Aoz*Bz + As*Bo - Axy*Boxy - Axz*Boxz - Ayz*Boyz) 𝐞₀ 
(As*Bx + Axy*By + Axz*Bz - Ayz*Bxyz) 𝐞₁ 
(As*By - Axy*Bx + Axz*Bxyz + Ayz*Bz) 𝐞₂ 
(As*Bz - Axy*Bxyz - Axz*Bx - Ayz*By) 𝐞₃
(Aox*By + Aoxyz*Bz - Aoy*Bx + Aoz*Bxyz + As*Boxy + Axy*Bo - Axz*Boyz + Ayz*Boxz) 𝐞₀₁₂ 
(Aox*Bz - Aoxyz*By - Aoy*Bxyz - Aoz*Bx + As*Boxz + Axy*Boyz + Axz*Bo - Ayz*Boxy) 𝐞₀₁₃ 
(Aox*Bxyz + Aoxyz*Bx + Aoy*Bz - Aoz*By + As*Boyz - Axy*Boxz + Axz*Boxy + Ayz*Bo) 𝐞₀₂₃ 
(As*Bxyz + Axy*Bz - Axz*By + Ayz*Bx) 𝐞₁₂₃
  }

  #gp_even() {
    (As*Bs - Axy*Bxy - Axz*Bxz - Ayz*Byz)
(Aox*Bs - Aoxyz*Byz - Aoy*Bxy - Aoz*Bxz + As*Box + Axy*Boy + Axz*Boz - Ayz*Boxyz) 𝐞₀₁ 
(Aox*Bxy + Aoxyz*Bxz + Aoy*Bs - Aoz*Byz + As*Boy - Axy*Box + Axz*Boxyz + Ayz*Boz) 𝐞₀₂ 
(Aox*Bxz - Aoxyz*Bxy + Aoy*Byz + Aoz*Bs + As*Boz - Axy*Boxyz - Axz*Box - Ayz*Boy) 𝐞₀₃ 
(As*Bxy + Axy*Bs - Axz*Byz + Ayz*Bxz) 𝐞₁₂ 
(As*Bxz + Axy*Byz + Axz*Bs - Ayz*Bxy) 𝐞₁₃ 
(As*Byz - Axy*Bxz + Axz*Bxy + Ayz*Bs) 𝐞₂₃
(Aox*Byz + Aoxyz*Bs - Aoy*Bxz + Aoz*Bxy + As*Boxyz + Axy*Boz - Axz*Boy + Ayz*Box) 𝐞₀₁₂₃
  }

  gp(other: Odd3P): Even3P
  gp(other: Even3P): Odd3P
  gp(other: Odd3P | Even3P): Odd3P | Even3P {
    if (other instanceof Odd3P) {
      return this.#gp_odd(other)
    }

    return this.#gp_even(other)
  }

  #wedge_even() {
    (As*Bs)
(Aox*Bs + As*Box) 𝐞₀₁ 
(Aoy*Bs + As*Boy) 𝐞₀₂ 
(Aoz*Bs + As*Boz) 𝐞₀₃ 
(As*Bxy + Axy*Bs) 𝐞₁₂ 
(As*Bxz + Axz*Bs) 𝐞₁₃ 
(As*Byz + Ayz*Bs) 𝐞₂₃
(Aox*Byz + Aoxyz*Bs - Aoy*Bxz + Aoz*Bxy + As*Boxyz + Axy*Boz - Axz*Boy + Ayz*Box) 𝐞₀₁₂₃
  }
  #wedge_odd() {
    (As*Bo) 𝐞₀ 
(As*Bx) 𝐞₁ 
(As*By) 𝐞₂ 
(As*Bz) 𝐞₃
(Aox*By - Aoy*Bx + As*Boxy + Axy*Bo) 𝐞₀₁₂ 
(Aox*Bz - Aoz*Bx + As*Boxz + Axz*Bo) 𝐞₀₁₃ 
(Aoy*Bz - Aoz*By + As*Boyz + Ayz*Bo) 𝐞₀₂₃ 
(As*Bxyz + Axy*Bz - Axz*By + Ayz*Bx) 𝐞₁₂₃
  }

  wedge(other: Odd3P): Odd3P
  wedge(other: Even3P): Even3P
  wedge(other: Even3P | Odd3P): Even3P | Odd3P {
    throw new Error('not implemented')
  }

  #vee_even() {
(Aox*Byz + Aoxyz*Bs - Aoy*Bxz + Aoz*Bxy + As*Boxyz + Axy*Boz - Axz*Boy + Ayz*Box)
(Aox*Boxyz + Aoxyz*Box) 𝐞₀₁ 
(Aoxyz*Boy + Aoy*Boxyz) 𝐞₀₂ 
(Aoxyz*Boz + Aoz*Boxyz) 𝐞₀₃ 
(Aoxyz*Bxy + Axy*Boxyz) 𝐞₁₂ 
(Aoxyz*Bxz + Axz*Boxyz) 𝐞₁₃ 
(Aoxyz*Byz + Ayz*Boxyz) 𝐞₂₃
(Aoxyz*Boxyz) 𝐞₀₁₂₃
  }
  #vee_odd() {
(Aox*Boyz + Aoxyz*Bo - Aoy*Boxz + Aoz*Boxy) 𝐞₀ 
(Aox*Bxyz + Aoxyz*Bx - Axy*Boxz + Axz*Boxy) 𝐞₁ 
(Aoxyz*By + Aoy*Bxyz - Axy*Boyz + Ayz*Boxy) 𝐞₂ 
(Aoxyz*Bz + Aoz*Bxyz - Axz*Boyz + Ayz*Boxz) 𝐞₃
(Aoxyz*Boxy) 𝐞₀₁₂ 
(Aoxyz*Boxz) 𝐞₀₁₃ 
(Aoxyz*Boyz) 𝐞₀₂₃ 
(Aoxyz*Bxyz) 𝐞₁₂₃
  }

  vee(other: Even3P | Odd3P): Even3P | Odd3P {

  }
}
