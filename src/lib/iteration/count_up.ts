export function* count_up(start: number = 0) {
  for (let i = start; i < Infinity; i++) {
    yield i
  }
}
