import { describe, it, expect } from 'vitest'
import { Permutation, permutation_group } from './Permutation'
import { DisjointCycles } from './DisjointCycles'
import { group_tests } from '../test-helpers/group_tests.ts'

describe('Permutation', () => {
  it('constructor with out of range element throws error', () => {
    expect(() => {
      return new Permutation([0, 1, 2, 10])
    }).toThrow('out of range')
  })

  it('constructor with duplicate element throws error', () => {
    expect(() => {
      return new Permutation([0, 2, 2, 1])
    }).toThrow('repeat element')
  })

  it('from_disjoint_cycles computes correct permutation', () => {
    // (0 2)(3 4)(1 5)
    // is the same as
    // [0 1 2 3 4 5]
    // [2 5 0 4 3 1]
    const cycles = new DisjointCycles(6, [
      [0, 2],
      [3, 4],
      [1, 5],
    ])
    const result = Permutation.from_disjoint_cycles(cycles)
    const expected = new Permutation([2, 5, 0, 4, 3, 1])
    expect(result).toEqual(expected)
  })

  it('multiplication applies_a after_b', () => {
    const a = new Permutation([0, 2, 3, 1])
    const b = new Permutation([0, 1, 3, 2])

    const result = a.mul(b)

    // a = (1 2 3)
    // b = (2 3)
    // ab = (1 2 3)(2 3) = (1 2) <-- we want this one
    // ba = (2 3)(1 2 3) = (1 3)
    const expected = new Permutation([0, 2, 1, 3])
    expect(result).toEqual(expected)
  })
})

const S4 = permutation_group(4)

group_tests({
  label: 'Permutation',
  group: S4,
  associativity: [
    new Permutation([1, 3, 0, 2]),
    new Permutation([1, 2, 3, 0]),
    new Permutation([1, 0, 2, 3]),
    new Permutation([0, 3, 2, 1]),
  ],
  identity_law: new Permutation([1, 0, 2, 3]),
  inverse: [new Permutation([1, 3, 0, 2]), new Permutation([2, 0, 3, 1])],
  inv_product: [
    new Permutation([1, 3, 0, 2]),
    new Permutation([1, 2, 3, 0]),
    new Permutation([1, 3, 2, 0]),
  ],
  diff: [
    new Permutation([1, 0, 2, 3]),
    new Permutation([1, 2, 3, 0]),
    new Permutation([3, 1, 0, 2]),
  ],
  sandwich: [
    new Permutation([1, 0, 2, 3]),
    new Permutation([1, 2, 3, 0]),
    new Permutation([2, 0, 3, 1]),
  ],
  commutator: [
    new Permutation([1, 0, 2, 3]),
    new Permutation([1, 2, 3, 0]),
    new Permutation([1, 2, 0, 3]),
  ],
})
