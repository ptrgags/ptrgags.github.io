/**
 * Generate a sequence of numbers, like a simpler version of Python's
 * range() function
 * if b is undefined, returns 0, 1, ..., a - 1 (so a = n)
 * if b is defined, returns a, a+1, ..., a + b - 1 (so a = start, b = end)
 *
 * I would have done an overload, but TypeScript complained :P
 * @param a
 * @param b
 */
export function* range(a: number, b?: number): Generator<number> {
  let start = 0
  let end = 0
  if (b != undefined) {
    start = a
    end = b
  } else {
    end = a
  }

  for (let i = start; i < end; i++) {
    yield i
  }
}
