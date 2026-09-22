export function circ(angle: number): { cos: number; sin: number } {
  return {
    cos: Math.cos(angle),
    sin: Math.sin(angle),
  }
}
