import { describe, it, expect } from 'vitest'
import { make_atc } from './next_1000_cards.ts'

describe('make_atc', () => {
  it('formats descriptor correctly', () => {
    const result = make_atc('2026-01-25', 39)

    const expected = {
      id: '2026-01-25_Card0039',
      title: 'Card 39/1000',
      date: '2026-01-25',
      timeline_desc: `Yet another doodle.`,
      sort_key: '2026-01-25:01',
      project_id: 'next-1000-cards',
      img_format: 'jpg',
    }
    expect(result).toEqual(expected)
  })
})
