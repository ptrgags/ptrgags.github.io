import { describe, it, expect } from 'vitest'
import { take } from './take.ts'

describe('take', () => {
  it('with n=0 returns empty sequence', () => {
    const seq = [2, 4, 6, 1, 8]

    const result = take(0, seq).toArray()

    const expected: number[] = []
    expect(result).toEqual(expected)
  })

  it('with n=1 returns first element in an array', () => {
    const seq = [2, 4, 6, 1, 8]

    const result = take(1, seq).toArray()

    const expected = [2]
    expect(result).toEqual(expected)
  })

  it('with n returns first n elements', () => {
    const seq = [2, 4, 6, 1, 8]

    const result = take(3, seq).toArray()

    const expected = [2, 4, 6]
    expect(result).toEqual(expected)
  })

  it('with n longer than sequence returns all elements', () => {
    const seq = [2, 4, 6, 1, 8]

    const result = take(10, seq).toArray()

    const expected = [2, 4, 6, 1, 8]
    expect(result).toEqual(expected)
  })

  it('with empty sequence returns empty sequence', () => {
    const seq: number[] = []

    const result = take(10, seq).toArray()

    const expected: number[] = []
    expect(result).toEqual(expected)
  })
})
