import { describe, it, expect } from 'vitest'
import { Rect } from './Rect.ts'

function make_container(): Rect {
  return new Rect({ x: 0, y: 0 }, { width: 100, height: 100 })
}

describe('Rect', () => {
  describe('align', () => {
    it('aligns smaller rectangle top-left', () => {
      const container = make_container()

      const result = container.align({ width: 25, height: 25 }, 'left', 'top')

      const expected = new Rect({ x: 0, y: 0 }, { width: 25, height: 25 })

      expect(result).toEqual(expected)
    })

    it('aligns smaller rectangle in the center', () => {
      const container = make_container()

      const result = container.align({ width: 50, height: 50 }, 'center', 'center')

      const expected = new Rect({ x: 25, y: 25 }, { width: 50, height: 50 })
      expect(result).toEqual(expected)
    })

    it('aligns smaller rectangle bottom-center', () => {
      const container = make_container()

      const result = container.align({ width: 50, height: 50 }, 'center', 'bottom')

      const expected = new Rect({ x: 25, y: 50 }, { width: 50, height: 50 })
      expect(result).toEqual(expected)
    })

    it('aligns smaller rectangle by percents', () => {
      const container = make_container()

      const result = container.align({ width: 50, height: 50 }, 0.75, 0.25)

      // margin is (50, 50)
      // (0.75, 0.25) * margin = (37.5, 12.5)
      const expected = new Rect({ x: 37.5, y: 12.5 }, { width: 50, height: 50 })
      expect(result).toEqual(expected)
    })

    it('aligns larger rectangle top-left correctly', () => {
      const container = make_container()

      const result = container.align({ width: 400, height: 400 }, 'left', 'top')

      const expected = new Rect({ x: 0, y: 0 }, { width: 400, height: 400 })
      expect(result).toEqual(expected)
    })

    it('aligns larger rectangle in the center', () => {
      const container = make_container()

      const result = container.align({ width: 400, height: 400 }, 'center', 'center')

      const expected = new Rect({ x: -150, y: -150 }, { width: 400, height: 400 })
      expect(result).toEqual(expected)
    })

    it('aligns larger rectangle center-right', () => {
      const container = make_container()

      const result = container.align({ width: 400, height: 400 }, 'right', 'center')

      const expected = new Rect({ x: -300, y: -150 }, { width: 400, height: 400 })
      expect(result).toEqual(expected)
    })

    it('aligns larger rectangle by percents', () => {
      const container = make_container()

      const result = container.align({ width: 400, height: 400 }, 0.75, 0.25)

      const expected = new Rect({ x: -225, y: -75 }, { width: 400, height: 400 })
      expect(result).toEqual(expected)
    })
  })

  it('from_center computes rectangle correctly', () => {
    const result = Rect.from_center({ x: 100, y: 100 }, { width: 200, height: 200 })

    const expected = new Rect(
      {
        x: 0,
        y: 0,
      },
      { width: 200, height: 200 },
    )

    expect(result).toEqual(expected)
  })
})
