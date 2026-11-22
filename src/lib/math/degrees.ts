export function degrees_to_radians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

export function radians_to_degrees(radians: number): number {
  return (radians * 180) / Math.PI
}
