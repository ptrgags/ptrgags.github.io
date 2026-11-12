import { is_nearly } from '../is_nearly.ts'
import { VectorSpace } from '../VectorSpace.ts'

export interface Vec3 {
  get x(): number
  get y(): number
  get z(): number
}

export function is_vec3(v: any): v is Vec3 {
  return v.x !== undefined && v.y !== undefined && v.z !== undefined
}

export const VSVec3 = new VectorSpace<Vec3>({
  equals: (a: Vec3, b: Vec3) => is_nearly(a.x, b.x) && is_nearly(a.y, b.y) && is_nearly(a.z, b.z),
  zero: () => {
    return { x: 0, y: 0, z: 0 }
  },
  add: (a: Vec3, b: Vec3) => {
    const { x: ax, y: ay, z: az } = a
    const { x: bx, y: by, z: bz } = b
    return { x: ax + bx, y: ay + by, z: az + bz }
  },
  neg: (v: Vec3) => {
    const { x, y, z } = v
    return { x: -x, y: -y, z: -z }
  },
  scale: (k: number, v: Vec3) => {
    const { x, y, z } = v
    return { x: k * x, y: k * y, z: k * z }
  },
  efficient_combo(scalars: number[], vecs: Vec3[]): Vec3 {
    let x = 0
    let y = 0
    let z = 0
    for (let i = 0; i < scalars.length; i++) {
      const k = scalars[i]
      const { x: vx, y: vy, z: vz } = vecs[i]
      x += k * vx
      y += k * vy
      z += k * vz
    }

    return { x, y, z }
  },
})
