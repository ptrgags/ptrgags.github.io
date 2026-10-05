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
