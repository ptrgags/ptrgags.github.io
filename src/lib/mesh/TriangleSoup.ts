import type { Vec3 } from '../math/vector/Vec3.ts'

export interface Triangle {
  normal: Vec3
  a: Vec3
  b: Vec3
  c: Vec3
}

export type TriangleSoup = Triangle[]
