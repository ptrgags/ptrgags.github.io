import { describe, it, expect } from 'vitest'
import { divmod } from './divmod.ts'

describe('divmod', () => {
  it('computes integer division and remainder', () => {
    const result = divmod(7, 3)

    const expected = [2, 1]
    expect(result).toEqual(expected)
  })

  it('uses correct mod', () => {
    const result = divmod(-2, 5)

    const expected = [-1, 3]
    expect(result).toEqual(expected)
  })
})
