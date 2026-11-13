/**
 * Count up from the start value start, start+1, start+2, ...
 * @param start
 */
export function* count_up(start: number = 0) {
  for (let i = start; i < Infinity; i++) {
    yield i
  }
}
