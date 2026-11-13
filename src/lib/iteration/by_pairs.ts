/**
 * Iterate over each pair of adjacent values. E.g. [1, 2, 3, 4] yields
 * the pairs (1, 2), (2, 3), (3, 4)
 * @param values Array of values
 * @returns pairs of adjacent values
 */
export function* by_pairs<T>(values: T[]): Generator<[T, T]> {
  if (values.length < 2) {
    return []
  }

  for (let i = 0; i < values.length - 1; i++) {
    const a = values[i]
    const b = values[i + 1]
    yield [a, b]
  }
}
