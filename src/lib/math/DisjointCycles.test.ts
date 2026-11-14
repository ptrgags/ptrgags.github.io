import { describe, it, expect } from 'vitest'
import { DisjointCycles } from './DisjointCycles'

describe('DisjointCycles', () => {
  it('constructor with out of range element throws error', () => {
    expect(() => {
      return new DisjointCycles(4, [[1, 2, 10]])
    }).toThrow('out of range')
  })

  it('constructor with overlapping cycles throws error', () => {
    expect(() => {
      return new DisjointCycles(4, [
        [1, 2, 3],
        [0, 2],
      ])
    }).toThrow('overlapping cycles')
  })

  describe('from_str', () => {
    it('parse with empty string returns identity', () => {
      const result = DisjointCycles.from_str(4, '')

      const expected = new DisjointCycles(4, [])
      expect(result).toEqual(expected)
    })

    it('with missing left parenthesis throws error', () => {
      expect(() => {
        return DisjointCycles.from_str(4, '1 2)')
      }).toThrow('value outside of parentheses')
    })

    it('with missing right parenthesis throws error', () => {
      expect(() => {
        return DisjointCycles.from_str(4, '(1 2')
      }).toThrow('unmatched parenthesis')
    })

    it('with top level number throws error', () => {
      expect(() => {
        return DisjointCycles.from_str(4, '1(2 3)')
      }).toThrow('value outside of parentheses')
    })

    it('with whitespace between cycles is handled gracefully', () => {
      const result = DisjointCycles.from_str(4, '(0 3) (1 2)')

      const expected = new DisjointCycles(4, [
        [0, 3],
        [1, 2],
      ])
      expect(result).toEqual(expected)
    })

    it('with whitespace before first element is handled gracefully', () => {
      const result = DisjointCycles.from_str(4, '( 1 2)')

      const expected = new DisjointCycles(4, [[1, 2]])
      expect(result).toEqual(expected)
    })

    it('with whitespace after last element is handled gracefully', () => {
      const result = DisjointCycles.from_str(4, '(1 2 )')

      const expected = new DisjointCycles(4, [[1, 2]])
      expect(result).toEqual(expected)
    })

    it('with nested parentheses returns error', () => {
      expect(() => {
        return DisjointCycles.from_str(4, '(1 (2 3) 4)')
      }).toThrow('nested cycle')
    })

    it('with non-digit value throws error', () => {
      expect(() => {
        return DisjointCycles.from_str(4, '(1 2 a 3)')
      }).toThrow('values must be integers')
    })

    it('parse with single cycle parses correctly', () => {
      const result = DisjointCycles.from_str(4, '(0 2 3)')

      const expected = new DisjointCycles(4, [[0, 2, 3]])
      expect(result).toEqual(expected)
    })

    it('with multiple cycles parses correctly', () => {
      const result = DisjointCycles.from_str(5, '(0 3 4)(1 2)')

      const expected = new DisjointCycles(5, [
        [0, 3, 4],
        [1, 2],
      ])
      expect(result).toEqual(expected)
    })
  })

  describe('toString', () => {
    it('with empty cycle returns identity', () => {
      const cycles = new DisjointCycles(5, [])

      const result = cycles.toString()

      const expected = 'I'
      expect(result).toEqual(expected)
    })

    it('formats cycles nicely', () => {
      const cycles = new DisjointCycles(5, [
        [0, 1, 2],
        [3, 4],
      ])

      const result = cycles.toString()
      const expected = '(0 1 2)(3 4)'
      expect(result).toEqual(expected)
    })

    it('ignores 1-cycles', () => {
      const cycles = new DisjointCycles(5, [[0, 2], [1], [3, 4]])

      const result = cycles.toString()

      const expected = '(0 2)(3 4)'
      expect(result).toEqual(expected)
    })
  })
})
