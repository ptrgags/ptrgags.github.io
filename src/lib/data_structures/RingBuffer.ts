/**
 * Data structure that accesses an array in cyclic manner. You can push
 * entries to the end, but only up to the capacity. Then the oldest entry
 *
 * I mainly use this for rendering trajectories
 */
export class RingBuffer<T> {
  private values: T[]
  private capacity: number
  private length: number
  private start: number
  private end: number

  constructor(capacity: number) {
    if (capacity < 1) {
      throw new Error('capacity must be positive')
    }

    this.values = new Array(capacity)
    this.capacity = capacity
    this.length = 0
    this.start = 0
    this.end = 0
  }

  #push_one(value: T) {
    this.values[this.end] = value
    this.end = (this.end + 1) % this.capacity

    if (this.length === this.capacity) {
      this.start = (this.start + 1) % this.capacity
    } else {
      this.length++
    }
  }

  push(...values: T[]) {
    values.forEach((x) => this.#push_one(x))
  }

  *[Symbol.iterator](): Generator<T> {
    for (let i = 0; i < this.length; i++) {
      const index = (this.start + i) % this.capacity
      yield this.values[index]
    }
  }
}
