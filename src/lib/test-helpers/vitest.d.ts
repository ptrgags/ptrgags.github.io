import 'vitest'

declare module 'vitest' {
  interface Matchers<R, T> {
    toBeEven2P: (expected: T) => R
    toBeOdd2P: (expected: T) => R
    toBePoint2P: (expected: T) => R
    toBeDirection2P: (expected: T) => R
    toBeLine2P: (expected: T) => R
  }
}
