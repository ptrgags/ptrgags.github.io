import { describe, it, expect } from 'vitest'
import { compute_normal } from './compute_normal.ts'

describe('compute_normal', () => {
  it('with axis-aligned triangle computes correct normal', () => {
    const a = { x: 0, y: 0, z: 0 }
    const b = { x: 1, y: 0, z: 0 }
    const c = { x: 0, y: 0, z: 1 }

    const result = compute_normal(a, b, c)

    const expected = { x: 0, y: -1, z: 0 }
    expect(result).toEqual(expected)
  })

  it('with angled triangle computes correct normal', () => {
    const a = { x: 1, y: 0, z: 0 }
    const b = { x: 0, y: 1, z: 0 }
    const c = { x: 0, y: 0, z: 1 }

    const result = compute_normal(a, b, c)

    const radius = 1 / Math.sqrt(3)
    const expected = { x: radius, y: radius, z: radius }
    expect(result).toEqual(expected)
  })
})
