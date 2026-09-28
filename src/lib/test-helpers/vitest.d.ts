import 'vitest'

declare module 'vitest' {
  interface Matchers<R, T> {
    toBeEven2P: (expected: T) => R
    toBeOdd2P: (expected: T) => R
    toBeRigid: (expected: T) => R
  }
}
