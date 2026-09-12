/**
 * Modulus that cycles around for negative numbers. This is how modular
 * arithmetic usually works in math.
 * @param x The value (can be negative)
 * @param modulus The modulus
 * @returns x mod modulus always in [0, modulus)
 */
export function mod(x: number, modulus: number): number {
  return ((x % modulus) + modulus) % modulus
}
