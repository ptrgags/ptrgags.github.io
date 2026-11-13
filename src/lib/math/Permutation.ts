import { count_up } from '../iteration/count_up.ts'
import { DisjointCycles } from './DisjointCycles.ts'
import { Group } from './Group.ts'

/**
 * Mathematical permutation of N elements. An element of the symmetric group S_N
 */
export class Permutation {
  values: number[]

  constructor(values: number[]) {
    const unique_values = [...new Set(values)]
    if (unique_values.length < values.length) {
      throw new Error('values must not include repeat elements')
    }

    const n = values.length
    for (const value of values) {
      if (value >= n) {
        throw new Error(`permutation<${n}> value out of range: ${value}`)
      }
    }

    this.values = values
  }

  get n(): number {
    return this.values.length
  }

  equals(other: Permutation) {
    return this.order === other.order && this.values.every((x, i) => x === other.values[i])
  }

  static from_str(n: number, str: string): Permutation {
    const disjoint_cycles = DisjointCycles.from_str(n, str)
    return Permutation.from_disjoint_cycles(disjoint_cycles)
  }

  static from_disjoint_cycles(disjoint_cycles: DisjointCycles): Permutation {
    const n = disjoint_cycles.n
    const combined = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
      combined[i] = i
    }

    for (const cycle of disjoint_cycles.cycles.toReversed()) {
      cycle.forEach((x, i) => {
        combined[x] = cycle[(i + 1) % cycle.length]
      })
    }

    return new Permutation(combined)
  }

  /**
   * Get the order of this element, i.e. how many times to repeat it until
   * returning to the start.
   *
   * NOTE: this method is potentially expensive. The worst case is
   * O(|G|) = O(n!). However, this depends heavily on the particular element.
   * many will be much less than this
   * @returns The power n in the equation this^n = I
   */
  order(): number {
    const id = Permutation.identity(this.n)

    let current: Permutation = this
    for (const power of count_up(1)) {
      if (current.equals(id)) {
        return power
      }

      current = current.mul(this)
    }
    throw new Error('unreachable')
  }

  count_out_of_place(): number {
    return this.values.filter((x, i) => x !== i).length
  }

  cycle_decomposition(): DisjointCycles {
    const visited = new Array(4).fill(false)
    const result = []

    const n = this.n

    for (let i = 0; i < n; i++) {
      if (visited[i]) {
        continue
      }
      visited[i] = true

      const cycle = [i]
      for (let current = this.values[i]; current !== i; current = this.values[current]) {
        visited[current] = true
        cycle.push(current)
      }

      // Only include nontrivial cycles
      if (cycle.length > 1) {
        result.push(cycle)
      }
    }

    return new DisjointCycles(n, result)
  }

  mul(rhs: Permutation): Permutation {
    if (rhs.n !== this.n) {
      throw new Error('mismatched number of elements')
    }

    const product = new Array(this.n).fill(0)
    rhs.values.forEach((x, i) => {
      product[i] = this.values[x]
    })
    return new Permutation(product)
  }

  static identity(n: number): Permutation {
    const values = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
      values[i] = i
    }
    return new Permutation(values)
  }

  inverse(): Permutation {
    const result = new Array(this.n).fill(0)
    this.values.forEach((x, i) => {
      result[x] = i
    })

    return new Permutation(result)
  }

  toString(): string {
    return this.cycle_decomposition().toString()
  }
}

/**
 * Create the permutation group (i.e. symmetric group) S_n
 * @param n Number of elements that can be permuted
 * @returns group S_n
 */
export function permutation_group(n: number) {
  return new Group<Permutation>({
    equals(a, b) {
      return a.equals(b)
    },
    identity() {
      return Permutation.identity(n)
    },
    mul(a, b) {
      return a.mul(b)
    },
    inv(g) {
      return g.inverse()
    },
  })
}
