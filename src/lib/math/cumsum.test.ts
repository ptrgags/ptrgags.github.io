import { describe, it, expect } from 'vitest'

import { cumsum } from './cumsum.ts'

describe('cumsum', () => {
  it('with empty array returns empty array', () => {
    const values: number[] = []

    const result = cumsum(values)

    const expected: number[] = []
    expect(result).toEqual(expected)
  })

  it('with array of numbers returns correct cumulative sum', () => {
    const values = [1, 2, 3, 4, 5]

    const result = cumsum(values)

    const expected = [1, 3, 6, 10, 15]
    expect(result).toEqual(expected)
  })
})
