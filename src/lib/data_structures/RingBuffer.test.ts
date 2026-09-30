import { describe, it, expect } from 'vitest'
import { RingBuffer } from './RingBuffer.ts'

describe('RingBuffer', () => {
  it('with 0 capacity throws error', () => {
    expect(() => {
      return new RingBuffer<number>(0)
    }).toThrow('capacity must be positive')
  })

  describe('iterator', () => {
    it('with no pushes returns an empty iterator', () => {
      const buffer = new RingBuffer<number>(10)

      const result = [...buffer]

      const expected: number[] = []
      expect(result).toEqual(expected)
    })

    it('with a single push returns value', () => {
      const buffer = new RingBuffer<number>(10)

      buffer.push(3)
      const result = [...buffer]

      const expected = [3]
      expect(result).toEqual(expected)
    })

    it('with a small number of pushes returns values', () => {
      const buffer = new RingBuffer<number>(10)

      buffer.push(3, 4, 5, 6)
      const result = [...buffer]

      const expected = [3, 4, 5, 6]
      expect(result).toEqual(expected)
    })

    it('with more pushes than capacity stores the most recent values only', () => {
      const buffer = new RingBuffer<number>(3)

      buffer.push(3, 4, 5, 6, 7, 8, 9, 10)
      const result = [...buffer]

      const expected = [8, 9, 10]
      expect(result).toEqual(expected)
    })
  })
})
