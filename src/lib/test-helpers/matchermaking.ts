import type { Constructor } from '../types/Constructor.ts'
import type { Equals } from '../types/Equals.ts'

export function objects_equal<T extends Equals<T>>(
  Type: Constructor<T>,
  received: unknown,
  expected: unknown,
): boolean {
  return received instanceof Type && expected instanceof Type && received.equals(expected)
}
