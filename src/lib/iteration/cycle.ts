/**
 * Cycle through the
 * @param values
 */
export function* cycle<T>(values: T[]): Generator<T> {
  while (true) {
    for (const value of values) {
      yield value
    }
  }
}
