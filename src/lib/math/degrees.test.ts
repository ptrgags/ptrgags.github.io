import { describe, it, expect } from 'vitest'
import { degrees_to_radians, radians_to_degrees } from './degrees.ts'

describe('degrees and radians', () => {
  it('degrees_to_radians computes radians correctly', () => {
    const result = degrees_to_radians(45)

    const expected = Math.PI / 4
    expect(result).toBeCloseTo(expected)
  })

  it('radians_to_degrees computes degrees correctly', () => {
    const result = radians_to_degrees(Math.PI / 4)

    const expected = 45
    expect(result).toBeCloseTo(expected)
  })
})
