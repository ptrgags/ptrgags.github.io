function parse_parentheses(cycle_str: string): string[] {
  const slices: string[] = []
  let start_index = 0
  let inside = false
  const chars = [...cycle_str]
  chars.forEach((c, i) => {
    if (c === '(' && inside) {
      throw new Error(`nested cycle detected: ${cycle_str}`)
    }

    if (c === ')' && !inside) {
      throw new Error(`unmatched parenthesis detected: ${cycle_str}`)
    }

    if (c === '(') {
      start_index = i + 1
      inside = true
    } else if (c === ')') {
      slices.push(cycle_str.substring(start_index, i))
      inside = false
    } else if (c !== ' ' && !inside) {
      throw new Error(`value outside of parentheses ${cycle_str}`)
    }
  })

  // Unfinished cycle
  if (inside) {
    throw new Error(`unmatched parenthesis ${cycle_str}`)
  }

  return slices
}

function parse_cycle(cycle_str: string): number[] {
  const values = cycle_str
    .trim()
    .split(' ')
    .map((x) => parseInt(x))

  if (values.some((x) => isNaN(x))) {
    throw new Error('values must be integers')
  }
  return values
}

export class DisjointCycles {
  n: number
  cycles: number[][]
  constructor(n: number, cycles: number[][]) {
    const unique_values: Set<number> = new Set()
    let value_count = 0

    for (const cycle of cycles) {
      for (const x of cycle) {
        if (x >= n) {
          throw new Error(`value out of range: ${x}, n= ${n}`)
        }

        value_count++
        unique_values.add(x)
      }
    }

    if (unique_values.size < value_count) {
      throw new Error('overlapping cycles detected')
    }

    this.n = n
    this.cycles = cycles
  }

  /**
   * Grammar:
   * disjoint_cycle = cycle*
   * cycle = '(' USIZE* ')'
   */
  static from_str(n: number, str: string): DisjointCycles {
    const cycles = parse_parentheses(str).map(parse_cycle)

    return new DisjointCycles(n, cycles)
  }

  toString(): string {
    const { cycles } = this

    // Identity
    if (cycles.length === 0) {
      return 'I'
    }

    let result = ''
    for (const cycle of cycles) {
      // cycles like (3) are not written in cycle notation
      if (cycle.length === 1) {
        continue
      }

      const numbers = cycle.map((x) => x.toString()).join(' ')
      result += `(${numbers})`
    }
    return result
  }
}
