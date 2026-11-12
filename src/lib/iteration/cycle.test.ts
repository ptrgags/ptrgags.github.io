import { describe, it, expect } from 'vitest'
import { cycle } from './cycle.ts'
import { take } from './take.ts'

describe('cycle', () => {
  it('with empty array returns empty sequence', () => {
    const seq: number[] = []

    const result = cycle(seq).toArray()

    const expected: number[] = []
    expect(result).toEqual(expected)
  })

  it('with one element repeats it over and over', () => {
    const seq = [1]

    const result = take(5, cycle(seq)).toArray()

    const expected = [1, 1, 1, 1, 1]
    expect(result).toEqual(expected)
  })

  it('with multiple elements cycles through them', () => {
    const seq = [1, 2, 3]

    const result = take(10, cycle(seq)).toArray()

    const expected = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
    expect(result).toEqual(expected)
  })
})
