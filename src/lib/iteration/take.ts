/**
 * Take the first n values from an iterable
 *
 * If the sequence has less than n elements, the result may have less than n
 * elements
 * @param n Number of values to take
 * @param seq Sequence of values
 */
export function* take<T>(n: number, seq: Iterable<T>): Generator<T> {
  const iter = seq[Symbol.iterator]()

  for (let i = 0; i < n; i++) {
    const result = iter.next()
    if (result.done) break

    yield result.value
  }
}
