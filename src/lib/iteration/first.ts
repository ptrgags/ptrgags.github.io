/**
 * Get the first element of an iterable
 * @param seq The sequence
 * @returns The first element, or undefined if it doesn't exist
 */
export function first<T>(seq: Iterable<T>): T | undefined {
  for (const x of seq) {
    return x
  }

  return undefined
}
