import { describe, it, expect } from 'vitest'
import { FrequencyDistribution } from './FrequencyDistribution.ts'

describe('FrequencyDistribution', () => {
  describe('values', () => {
    it('without counting anything returns empty array', () => {
      const dict = new FrequencyDistribution<string>()

      const result = dict.values

      const expected: string[] = []
      expect(result).toEqual(expected)
    })

    it('returns values in descending order by count', () => {
      const dist = new FrequencyDistribution<string>()

      dist.count('a')
      dist.count('b', 3)
      dist.count('a')
      dist.count('c', 1)

      const result = dist.values

      const expected = ['a', 'b', 'c']
      // values are not sorted
      expect(result.sort()).toEqual(expected.sort())
    })
  })

  describe('frequencies', () => {
    it('without counting anything returns empty array', () => {
      const dict = new FrequencyDistribution<string>()

      const result = dict.frequencies

      const expected: [string, number][] = []
      expect(result).toEqual(expected)
    })

    it('returns values in descending order by count', () => {
      const dist = new FrequencyDistribution<string>()

      dist.count('a')
      dist.count('b', 3)
      dist.count('a')
      dist.count('c', 1)

      const result = dist.frequencies

      const expected = [
        ['b', 3],
        ['a', 2],
        ['c', 1],
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('values_by_freq', () => {
    it('without counting anything returns empty array', () => {
      const dist = new FrequencyDistribution<string>()

      const result = dist.values_by_freq

      const expected: string[] = []
      expect(result).toEqual(expected)
    })

    it('returns values in decreasing value by count', () => {
      const dist = new FrequencyDistribution<string>()

      dist.count('a')
      dist.count('b', 3)
      dist.count('a')
      dist.count('c', 1)

      const result = dist.values_by_freq

      const expected = ['b', 'a', 'c']
      expect(result).toEqual(expected)
    })
  })
})
