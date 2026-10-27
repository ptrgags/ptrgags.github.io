import { describe, it, expect } from 'vitest'
import { by_pairs } from './by_pairs.ts'

describe('by_pairs', () => {
  it('with empty array returns empty sequence', () => {
    const values: number[] = []

    const result = by_pairs(values).toArray()

    const expected: number[][] = []
    expect(result).toEqual(expected)
  })

  it('with array with one element returns empty sequence', () => {
    const values = [1]

    const result = by_pairs(values).toArray()

    const expected: number[][] = []
    expect(result).toEqual(expected)
  })

  it('with array with two elements returns sequence with single pair', () => {
    const values = [2, 5]

    const result = by_pairs(values).toArray()

    const expected = [[2, 5]]
    expect(result).toEqual(expected)
  })

  it('with array with several elements returns sequence of pairs', () => {
    const values = [2, 5, 3, 7]

    const result = by_pairs(values).toArray()

    const expected = [
      [2, 5],
      [5, 3],
      [3, 7],
    ]
    expect(result).toEqual(expected)
  })
})
