/**
 * Cycle through the list of values, repeating forever
 * @param values
 */
export function* cycle<T>(values: T[]): Generator<T> {
  if (values.length === 0) {
    return
  }

  while (true) {
    for (const value of values) {
      yield value
    }
  }
}
