import { describe, it, expect } from 'vitest'
import { DefaultDict } from './DefaultDict.ts'

describe('DefaultDict', () => {
  it('get with unused key calls constructor', () => {
    const dict = new DefaultDict(() => 3)

    const result = dict.get('foo')

    const expected = 3
    expect(result).toEqual(expected)
  })

  it('get with array constructor returns distinct arrays', () => {
    const dict: DefaultDict<number[]> = new DefaultDict(() => [])

    const result1 = dict.get('foo')
    const result2 = dict.get('bar')

    expect(result1).toEqual([])
    expect(result2).toEqual([])
    expect(result1).not.toBe(result2)
  })

  it('sets and retrieves value', () => {
    const dict = new DefaultDict(() => 0)

    dict.set('foo', 4)
    const result = dict.get('foo')

    const expected = 4
    expect(result).toEqual(expected)
  })
})
