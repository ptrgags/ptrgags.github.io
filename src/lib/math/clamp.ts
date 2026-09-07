/**
 * Clamp x within the range `[min_val, max_val]`
 * @param x The value to clamp
 * @param min_val The minimum value
 * @param max_val The maximum value
 * @returns The clamped value
 */
export function clamp(x: number, min_val: number, max_val: number): number {
  return Math.max(Math.min(x, max_val), min_val)
}
