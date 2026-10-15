import { is_nearly } from '../math/is_nearly.ts'
import { VectorSpace } from '../math/VectorSpace.ts'

/**
 * For drawing purposes, we often only care that an object has (x, y)
 * coordinates. There will be multiple possible implementations depending on
 * what area of math I'm exploring. My most common implementation will be
 * 2D Projective Geometric Algebra (see `lib/math/pga2d/`), but there will
 * be others.
 */
export interface Vec2 {
  get x(): number
  get y(): number
}

export function is_vec2(v: any): v is Vec2 {
  return v.x !== undefined && v.y !== undefined
}

export const VSVec2 = new VectorSpace<Vec2>({
  equals: (a: Vec2, b: Vec2) => is_nearly(a.x, b.x) && is_nearly(a.y, b.y),
  zero: () => {
    return { x: 0, y: 0 }
  },
  add: (a: Vec2, b: Vec2) => {
    const { x: ax, y: ay } = a
    const { x: bx, y: by } = b
    return { x: ax + bx, y: ay + by }
  },
  neg: (v: Vec2) => {
    const { x, y } = v
    return { x: -x, y: -y }
  },
  scale: (k: number, v: Vec2) => {
    const { x, y } = v
    return { x: k * x, y: k * y }
  },
  efficient_combo(scalars: number[], vecs: Vec2[]): Vec2 {
    let x = 0
    let y = 0
    for (let i = 0; i < scalars.length; i++) {
      const k = scalars[i]
      const { x: vx, y: vy } = vecs[i]
      x += k * vx
      y += k * vy
    }

    return { x, y }
  },
})
