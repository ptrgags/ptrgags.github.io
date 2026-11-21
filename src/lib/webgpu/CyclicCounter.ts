import { mod } from '../math/mod.ts'

/**
 * A counter that can be incremented or decremented but eventually loops.
 */
export class CyclicCounter {
  #value: number
  readonly length: number

  /**
   * Constructor
   * @param initial_value
   */
  constructor(initial_value: number, length: number) {
    this.#value = initial_value
    this.length = length
  }

  get value() {
    return this.#value
  }

  set value(val: number) {
    this.#value = mod(val, this.length)
  }

  /**
   * Cycle the counter by the number of places
   * @param places How much to add to the counter. The counter can be negative
   */
  cycle(places: number) {
    this.#value = mod(this.#value + places, this.length)
  }

  static readonly CONSTANT: CyclicCounter = new CyclicCounter(0, 1)
}
