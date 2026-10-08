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
