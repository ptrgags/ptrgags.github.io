function by_frequency_desc(a: [any, number], b: [any, number]): number {
  return b[1] - a[1]
}

export class FrequencyCounter<T> {
  counts: Map<T, number>
  constructor() {
    this.counts = new Map()
  }

  get values(): T[] {
    return [...this.counts.keys()]
  }

  get frequencies(): [T, number][] {
    return [...this.counts.entries()].sort(by_frequency_desc)
  }

  get values_by_freq(): T[] {
    return [...this.counts.entries()].sort(by_frequency_desc).map(([x]) => x)
  }

  /**
   * Add to one of the counters
   * @param key The key to increment
   * @param amount The amount to add (default 1)
   */
  count(key: T, amount: number = 1) {
    const prev_val = this.counts.get(key) ?? 0

    this.counts.set(key, prev_val + amount)
  }
}
