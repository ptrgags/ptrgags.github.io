import { describe, it, expect } from 'vitest'
import { take } from './take.ts'
import { count_up } from './count_up.ts'

describe('count_up', () => {
  it('with no arguments counts from 0', () => {
    const result = take(5, count_up()).toArray()

    const expected = [0, 1, 2, 3, 4]
    expect(result).toEqual(expected)
  })

  it('with start value counts up from start value', () => {
    const start_value = -1

    const result = take(5, count_up(start_value)).toArray()

    const expected = [-1, 0, 1, 2, 3]
    expect(result).toEqual(expected)
  })
})
