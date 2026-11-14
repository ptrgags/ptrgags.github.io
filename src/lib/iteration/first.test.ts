import { describe, it, expect } from 'vitest'
import { first } from './first.ts'

describe('first', () => {
  it('works with finite sequence', () => {
    const seq = (function* (): Generator<number> {
      yield 1
      yield 2
      yield 3
    })()

    const result = first(seq)

    const expected = 1
    expect(result).toEqual(expected)
  })

  it('Works for infinite sequence without hanging', () => {
    const seq = (function* (): Generator<number> {
      while (true) {
        yield 42
      }
    })()

    const result = first(seq)

    const expected = 42
    expect(result).toEqual(expected)
  })

  it('with empty iterator returns undefined', () => {
    const seq = (function* (): Generator<Number> {})()

    const result = first(seq)

    expect(result).toBeUndefined()
  })
})
