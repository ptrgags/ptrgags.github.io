import 'vitest'

declare module 'vitest' {
  interface Matchers<R, T> {
    // Geometry matchers
    toBeRigid: (expected: T) => R

    // 2D Projective Geometric Algebra matchers
    toBeEven2P: (expected: T) => R
    toBeOdd2P: (expected: T) => R
    toBePoint2P: (expected: T) => R
    toBeDirection2P: (expected: T) => R
    toBeLine2P: (expected: T) => R

    // 2D Conformal Geometric Algebra matchers
    toBeEven2C: (expected: T) => R
    toBeOdd2C: (expected: T) => R

    // Complex number matchers
    toBeComplex: (expected: T) => R
  }
}
