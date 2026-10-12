import { describe, it, expect } from 'vitest'
import { Direction2P, VS2P } from './Direction2P.ts'
import { Point2P } from './Point2P.ts'
import { Line2P } from './Line2P.ts'
import { vector_space_tests } from '../../test-helpers/vector_space_tests.ts'

describe('Direction2P', () => {
  it('from_point with Direction2P returns same object', () => {
    const direction = new Direction2P(1, 2)

    const result = Direction2P.from_vec2(direction)

    expect(result).toBe(direction)
  })

  it('from_point with other pointlike returns Direction2P', () => {
    const point = { x: 3, y: 4 }

    const result = Direction2P.from_vec2(point)

    const expected = new Direction2P(3, 4)
    expect(result).toBeDirection2P(expected)
  })

  it('from_dimensions with Direction2P returns same object', () => {
    const direction = new Direction2P(1, 2)

    const result = Direction2P.from_dimensions(direction)

    expect(result).toBe(direction)
  })

  it('from_dimensions with other dimensionlike returns Direction2P', () => {
    const dimensions = { width: 3, height: 4 }

    const result = Direction2P.from_dimensions(dimensions)

    const expected = new Direction2P(3, 4)
    expect(result).toBeDirection2P(expected)
  })

  it('converts to point', () => {
    const a = new Direction2P(2, -5)

    const result = a.to_point()

    const expected = new Point2P(2, -5)
    expect(result).toBePoint2P(expected)
  })

  it('dir_from_angle computes cosine and sine', () => {
    const angle = (2 * Math.PI) / 3

    const result = Direction2P.from_angle(angle)

    const expected = new Direction2P(-0.5, Math.sqrt(3) / 2)
    expect(result).toBeDirection2P(expected)
  })

  it('gets the underlying x and y components', () => {
    const a = new Direction2P(-3, 5)

    expect(a.x).toBe(-3)
    expect(a.y).toBe(5)
  })

  it('dual returns the orthogonal line', () => {
    const a = new Direction2P(2, 1)

    const result = a.dual()

    const expected = new Line2P(2, 1, 0)
    expect(result).toBeLine2P(expected)
  })

  it('neg negates the components', () => {
    const a = new Direction2P(1, -3)

    const result = a.neg()

    const expected = new Direction2P(-1, 3)
    expect(result).toBeDirection2P(expected)
  })

  it('mag_sqr returns squared magnitude', () => {
    const a = new Direction2P(3, 4)

    const result = a.mag_sqr()

    // 3^2 + 4^2
    expect(result).toBe(25)
  })

  it('mag returns the magnitude of the Direction2P', () => {
    const a = new Direction2P(3, 4)

    const result = a.mag()

    // sqrt(3^2 + 4^2) = sqrt(25) = 5
    expect(result).toBeCloseTo(5)
  })

  it('limit_length with short Direction2P does not change vector', () => {
    const a = new Direction2P(1, 2)
    const max_length = 100

    const result = a.limit_length(max_length)

    expect(result).toBeDirection2P(a)
  })

  it('limit_length with long Direction2P snaps to max length', () => {
    const a = new Direction2P(300, 400)
    const max_length = 100

    const result = a.limit_length(max_length)

    // original vector has magnitude 500 (3-4-5 triangle scaled by 100)
    // the new magnitude is 100, which is 1/5 exactly.
    // 300 / 5  = 60
    // 400 / 5  = 80
    const expected = new Direction2P(60, 80)
    expect(result).toEqual(expected)
  })

  it('set_length with zero length Direction2P throws error', () => {
    const a = Direction2P.ZERO
    const length = 100

    expect(() => {
      a.set_length(length)
    }).toThrowError('null vector')
  })

  it('set_length with short Direction2P snaps to length', () => {
    const a = new Direction2P(3, 4)
    const length = 100

    const result = a.set_length(length)

    // original vector has magnitude 5 (3-4-5 triangle)
    // the new magnitude is 100, which is 1/5 exactly.
    // 300 / 5  = 60
    // 400 / 5  = 80
    const expected = new Direction2P(60, 80)
    expect(result).toBeDirection2P(expected)
  })

  it('set_length with long Direction2P snaps to max length', () => {
    const a = new Direction2P(300, 400)
    const max_length = 100

    const result = a.set_length(max_length)

    // original vector has magnitude 500 (3-4-5 triangle scaled by 100)
    // the new magnitude is 100, which is 1/5 exactly.
    // 300 / 5  = 60
    // 400 / 5  = 80
    const expected = new Direction2P(60, 80)
    expect(result).toBeDirection2P(expected)
  })

  it('scale performs scalar multiplication', () => {
    const dir = new Direction2P(4, -3)

    const result = dir.scale(2)

    const expected = new Direction2P(8, -6)
    expect(result).toBeDirection2P(expected)
  })

  it('flip_y flips y coordinate of directions', () => {
    const dir = new Direction2P(3, -4)

    const result = dir.flip_y()

    const expected = new Direction2P(3, 4)
    expect(result).toBeDirection2P(expected)
  })

  it('dot of two directions computes the dot product of components', () => {
    const a = new Direction2P(1, 2)
    const b = new Direction2P(3, 4)

    const result = a.dot(b)

    // 1 * 3 + 2 * 4 = 3 + 8 = 11
    const expected = 11
    expect(result).toBe(expected)
  })

  it('lerp interpolates two directions', () => {
    const a = new Direction2P(1, 2)
    const b = new Direction2P(-2, -8)

    const result = Direction2P.lerp(a, b, 0.25)

    // 3/4 * 1 + 1/4 * -2 = 1/4(3 -2) = 1/4
    // 3/4 * 2 + 1/4 * -8 = 1/4(6 - 8) = -2/4 = -1/2
    const expected = new Direction2P(0.25, -0.5)
    expect(result).toBeDirection2P(expected)
  })

  it('toString formats as Direction2P', () => {
    const a = new Direction2P(0.00012345, 2.98763)

    const result = a.toString()

    const expected = 'Direction2P(0.000123, 2.99)'
    expect(result).toBe(expected)
  })

  it('mul_components does component-wise multiplication', () => {
    const a = new Direction2P(1, 2)
    const b = new Direction2P(-2, 0.5)

    const result = a.mul_components(b)

    const expected = new Direction2P(-2, 1)
    expect(result).toBeDirection2P(expected)
  })

  it('div_components does component-wise division', () => {
    const a = new Direction2P(1, 2)
    const b = new Direction2P(-2, 0.5)

    const result = a.div_components(b)

    const expected = new Direction2P(-0.5, 4)
    expect(result).toBeDirection2P(expected)
  })

  describe('roots_of_unity', () => {
    /**
     * Compare two arrays of points
     * @param {Direction2P[]} result
     * @param {Direction2P[]} expected
     */
    function expect_direction_array(result: Direction2P[], expected: Direction2P[]) {
      expect(result.length).toBe(expected.length)

      for (const [i, res] of result.entries()) {
        expect(res).toBeDirection2P(expected[i])
      }
    }

    it('with N < 1 throws error', () => {
      expect(() => {
        return Direction2P.roots_of_unity(0)
      }).toThrowError('n must be a positive integer')
    })

    it('with N = 1 produces single point', () => {
      const result = Direction2P.roots_of_unity(1)

      const expected = [Direction2P.DIR_X]

      expect_direction_array(result, expected)
    })

    it('with N = 2 produces 1 and -1', () => {
      const result = Direction2P.roots_of_unity(2)

      const expected = [Direction2P.DIR_X, Direction2P.DIR_X.neg()]

      expect_direction_array(result, expected)
    })

    it('with N = 4 produces cardinal directions', () => {
      const result = Direction2P.roots_of_unity(4)

      const expected = [
        Direction2P.DIR_X,
        Direction2P.DIR_Y,
        Direction2P.DIR_X.neg(),
        Direction2P.DIR_Y.neg(),
      ]
      expect_direction_array(result, expected)
    })
    it('with N = 8 produces 8 ordinal directions', () => {
      const result = Direction2P.roots_of_unity(8)

      // cos(45 deg) = sin(45 deg) = sqrt(2)/2 = sqrt(1/2)
      const xy45 = Math.SQRT1_2
      const ne = new Direction2P(xy45, xy45)
      const nw = new Direction2P(-xy45, xy45)
      const expected = [
        Direction2P.DIR_X,
        ne,
        Direction2P.DIR_Y,
        nw,
        Direction2P.DIR_X.neg(),
        ne.neg(), // southwest
        Direction2P.DIR_Y.neg(),
        nw.neg(), // southeast
      ]

      expect_direction_array(result, expected)
    })

    it('with N = 3 produces correct trig values', () => {
      const result = Direction2P.roots_of_unity(3)

      const sin60 = Math.sqrt(3) / 2

      const expected = [
        Direction2P.DIR_X,
        new Direction2P(-0.5, sin60),
        new Direction2P(-0.5, -sin60),
      ]
      expect_direction_array(result, expected)
    })
  })

  describe('4-fold rotations', () => {
    it('rot90 returns Direction2P rotated 90 degrees in the positive Direction2P', () => {
      const dir = new Direction2P(3, 4)

      const result = dir.rot90()

      const expected = new Direction2P(-4, 3)
      expect(result).toBeDirection2P(expected)
    })

    it('rot180 returns the same result as neg', () => {
      const dir = new Direction2P(3, 4)

      const rot = dir.rot180()
      const neg = dir.rot180()

      const expected = new Direction2P(-3, -4)
      expect(rot).toBeDirection2P(expected)
      expect(neg).toBeDirection2P(expected)
    })

    it('rot270 returns Direction2P rotated 90 degrees in the negative Direction2P', () => {
      const dir = new Direction2P(3, 4)

      const result = dir.rot270()

      const expected = new Direction2P(4, -3)
      expect(result).toBeDirection2P(expected)
    })
  })
})

// see interface definition
vector_space_tests({
  label: 'Direction2P',
  vector_space: VS2P,
  add_commutativity: [
    new Direction2P(3, -1),
    new Direction2P(1, 2),
    // expected sum
    new Direction2P(4, 1),
  ],
  add_associativity: [
    new Direction2P(1, 2),
    new Direction2P(-3, -4),
    new Direction2P(10, 7),
    // expected sum
    new Direction2P(8, 5),
  ],
  add_identity: new Direction2P(-5, 7),
  add_inverse: [new Direction2P(3, -4), new Direction2P(-3, 4)],
  sub: [new Direction2P(10, -10), new Direction2P(2, 2), new Direction2P(8, -12)],
  scalar_associativity: [3, 5, new Direction2P(-6, 2), new Direction2P(-90, 30)],
  distributivity: [4, new Direction2P(3, -2), new Direction2P(4, 7), new Direction2P(28, 20)],
  scalar_identity: new Direction2P(-7, 11),
  combo: [
    [1, 0.5, -3],
    [new Direction2P(1, 2), new Direction2P(-3, 4), new Direction2P(5, -6)],
    new Direction2P(-15.5, 22),
  ],
})
