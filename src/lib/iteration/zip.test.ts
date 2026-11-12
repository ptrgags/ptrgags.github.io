import { describe, it, expect } from 'vitest'
import { zip } from './zip.ts'

describe('zip', () => {
  it('with empty iterables returns empty sequence', () => {
    const gen = zip([], [])

    const result = gen.toArray()

    const expected: [number, number][] = []
    expect(result).toEqual(expected)
  })

  it('with two iterables of the same length returns pairs', () => {
    const gen = zip([1, 2, 3], ['a', 'b', 'c'])

    const result = gen.toArray()

    const expected = [
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]
    expect(result).toEqual(expected)
  })

  it('with iterables of different length returns pairs based on the shorter length', () => {
    const gen = zip([1, 2, 3, 4, 5], ['a', 'b', 'c'])

    const result = gen.toArray()

    const expected = [
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]
    expect(result).toEqual(expected)
  })
})
