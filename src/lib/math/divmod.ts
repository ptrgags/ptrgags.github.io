import { mod } from './mod.ts'

/**
 * Compute integer division and modulo at once
 * @param a Numerator
 * @param b Denominator
 * @returns (a // b, a % b)
 */
export function divmod(a: number, b: number): [number, number] {
  return [Math.floor(a / b), mod(a, b)]
}
