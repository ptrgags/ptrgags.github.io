/**
 * Like python's zip(), pair up values from two iterables.
 *
 * If the iterables have different lengths, pairs will be yielded up to
 * the shorter length
 * @param as First iterable
 * @param bs Second iterable
 */
export function* zip<A, B>(as: Iterable<A>, bs: Iterable<B>): Generator<[A, B]> {
  const iter_a = as[Symbol.iterator]()
  const iter_b = bs[Symbol.iterator]()

  while (true) {
    const result_a = iter_a.next()
    const result_b = iter_b.next()
    if (result_a.done || result_b.done) {
      break
    }
    yield [result_a.value, result_b.value]
  }
}
