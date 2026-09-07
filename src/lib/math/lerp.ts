/**
 * linear interpolation for numbers
 * @param a The first number
 * @param b The second number
 * @param t The time value
 * @returns The blend of a and b proportional to t
 */
export function lerp(a: number, b: number, t: number): number {
  return (1 - t) * a + t * b
}
