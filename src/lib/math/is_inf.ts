export function is_inf(x: number): boolean {
  return !isFinite(x) && !isNaN(x)
}
