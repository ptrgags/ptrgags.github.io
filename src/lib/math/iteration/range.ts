export function* range(n: number): Generator<number> {
  for (let i = 0; i < n; i++) {
    yield i
  }
}
