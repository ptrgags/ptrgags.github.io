import { describe, it, expect } from 'vitest'
import { range } from './range.ts'

describe('range', () => {
  it('with one argument produces integers in [0, n)', () => {
    const result = range(10).toArray()

    const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    expect(result).toEqual(expected)
  })

  it('with two arguments produces integers in [start, end)', () => {
    const result = range(3, 7).toArray()

    const expected = [3, 4, 5, 6]
    expect(result).toEqual(expected)
  })
})
