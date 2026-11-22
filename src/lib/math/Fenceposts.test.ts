import { describe, it, expect } from 'vitest'
import { Fenceposts } from './Fenceposts.ts'

describe('Fenceposts', () => {
  it('sets num_posts directly', () => {
    const fenceposts = new Fenceposts(5, 2)

    const result = fenceposts.num_posts

    const expected = 5
    expect(result).toEqual(expected)
  })

  it('computes_num_gaps correctly', () => {
    const fenceposts = new Fenceposts(5, 2)

    const result = fenceposts.num_gaps

    const expected = 4
    expect(result).toEqual(expected)
  })

  it('sets spacing directly', () => {
    const fenceposts = new Fenceposts(5, 2)

    const result = fenceposts.spacing

    const expected = 2
    expect(result).toEqual(expected)
  })

  it('computes length correctly', () => {
    const fenceposts = new Fenceposts(5, 2)

    const result = fenceposts.length

    // 5 posts = 4 gaps
    // 4 gaps * 2 units/gap = 8 units
    const expected = 8
    expect(result).toEqual(expected)
  })

  it('from_posts_length computes correct fenceposts', () => {
    const result = Fenceposts.from_posts_length(5, 8)

    const expected = new Fenceposts(5, 2)
    expect(result).toEqual(expected)
  })

  it('from_gaps_spacing computes correct fenceposts', () => {
    const result = Fenceposts.from_gaps_spacing(4, 2)

    const expected = new Fenceposts(5, 2)
    expect(result).toEqual(expected)
  })

  it('from_gaps_length computes correct fenceposts', () => {
    const result = Fenceposts.from_gaps_length(4, 8)

    const expected = new Fenceposts(5, 2)
    expect(result).toEqual(expected)
  })

  it('iter_posts computes correct values', () => {
    const fenceposts = new Fenceposts(5, 2)

    const result = fenceposts.iter_posts().toArray()

    const expected = [
      { i: 0, u: 0, x: 0 },
      { i: 1, u: 1 / 4, x: 2 },
      { i: 2, u: 1 / 2, x: 4 },
      { i: 3, u: 3 / 4, x: 6 },
      { i: 4, u: 1, x: 8 },
    ]
    expect(result).toEqual(expected)
  })

  it('iter_gaps computes correct values', () => {
    const fenceposts = new Fenceposts(5, 2)

    const result = fenceposts.iter_gaps().toArray()

    const expected = [
      { i: 0, u: 1 / 8, x: 1 },
      { i: 1, u: 3 / 8, x: 3 },
      { i: 2, u: 5 / 8, x: 5 },
      { i: 3, u: 7 / 8, x: 7 },
    ]
    expect(result).toEqual(expected)
  })
})
