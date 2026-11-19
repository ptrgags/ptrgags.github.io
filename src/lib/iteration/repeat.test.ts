import { describe, it, expect } from 'vitest'
import { repeat } from './repeat.ts'
import { take } from './take.ts'

describe('repeat', () => {
  it('repeats value over and over', () => {
    const result = take(5, repeat(42)).toArray()

    const expected = [42, 42, 42, 42, 42]
    expect(result).toEqual(expected)
  })
})
