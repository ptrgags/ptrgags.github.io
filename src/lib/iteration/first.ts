export function first<T>(iter: Iterable<T>): T | undefined {
  for (const x of iter) {
    return x
  }

  return undefined
}
