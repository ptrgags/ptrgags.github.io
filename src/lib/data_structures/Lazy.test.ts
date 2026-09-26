import { describe, it, expect } from 'vitest'
import { Lazy } from './Lazy.ts'

describe('Lazy', () => {
  it('Before first value does not call init function', () => {
    let called = false
    const lazy = new Lazy(() => {
      called = true
      return 3
    })

    expect(called).toBe(false)
    expect(lazy.initialized).toBe(false)
  })

  it('Accessing value calls initialization function', () => {
    let called = false
    const lazy = new Lazy(() => {
      called = true
      return 3
    })

    const result = lazy.value

    expect(called).toBe(true)
    expect(lazy.initialized).toBe(true)
    expect(result).toBe(3)
  })

  it('setting value bypasses init function', () => {
    let called = false
    const lazy = new Lazy(() => {
      called = true
      return 3
    })

    lazy.value = 5
    const result = lazy.value

    expect(result).toBe(5)
    expect(lazy.initialized).toBe(true)
    expect(called).toBe(false)
  })

  it('Works with type that allows undefined', () => {
    let called = false
    const lazy: Lazy<number | undefined> = new Lazy(() => {
      called = true
      return undefined
    })

    // Setting the value should initialize the
    lazy.value = undefined

    const result = lazy.value
    expect(result).toBe(undefined)
    expect(lazy.initialized).toBe(true)
    expect(called).toBe(false)
  })
})
