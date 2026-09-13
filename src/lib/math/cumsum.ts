/**
 * Compute a cumulative sum of an array of values
 * @param values Values to sum
 */
export function cumsum(values: number[]) {
  let sum = 0
  const result = []
  for (const x of values) {
    sum += x
    result.push(sum)
  }
  return result
}
