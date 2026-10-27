/**
 * Cycle through the list of values, repeating forever
 * @param values
 */
export function* cycle<T>(values: T[]): Generator<T> {
  while (true) {
    for (const value of values) {
      yield value
    }
  }
}
