import { describe, it, expect } from 'vitest'
import { AngleOrientation, ArcAngles } from './ArcAngles.ts'

describe('ArcAngles', () => {
  describe('angle', () => {
    it('with 0 returns reduced start angle', () => {
      const angles = new ArcAngles(-Math.PI / 2, Math.PI / 4, AngleOrientation.POSITIVE)

      const result = angles.angle(0)

      const expected = (3 * Math.PI) / 2
      expect(result).toBeCloseTo(expected)
    })

    it('with 1 returns end angle', () => {
      const angles = new ArcAngles(-Math.PI / 2, Math.PI / 4, AngleOrientation.POSITIVE)

      const result = angles.angle(1)

      const expected = Math.PI / 4
      expect(result).toBeCloseTo(expected)
    })

    it('with 0.5 returns angle in between', () => {
      const angles = new ArcAngles(-Math.PI / 2, Math.PI / 4, AngleOrientation.POSITIVE)

      const result = angles.angle(0.5)

      const expected = (15 * Math.PI) / 8
      expect(result).toBeCloseTo(expected)
    })

    it('with negative orientation returns correct value', () => {
      const angles = new ArcAngles(-Math.PI / 2, Math.PI / 4, AngleOrientation.NEGATIVE)

      const result = angles.angle(0.5)

      const expected = (7 * Math.PI) / 8
      expect(result).toEqual(expected)
    })
  })

  describe('subtended_angle', () => {
    it('with identical endpoints returns 0', () => {
      const angles = new ArcAngles(Math.PI, Math.PI, AngleOrientation.POSITIVE)

      const result = angles.subtended_angle

      const expected = 0
      expect(result).toBeCloseTo(expected)
    })

    it('with angles in positive order and POSITIVE returns correct angle', () => {
      const angles = new ArcAngles(-Math.PI / 2, Math.PI / 4, AngleOrientation.POSITIVE)

      const result = angles.subtended_angle

      const expected = (3 * Math.PI) / 4
      expect(result).toBeCloseTo(expected)
    })

    it('with angles in negative order and POSITIVE returns correct angle', () => {
      const angles = new ArcAngles(Math.PI / 4, -Math.PI / 2, AngleOrientation.POSITIVE)

      const result = angles.subtended_angle

      const expected = (5 * Math.PI) / 4
      expect(result).toBeCloseTo(expected)
    })

    it('with angles in negative order and NEGATIVE returns correct angle', () => {
      const angles = new ArcAngles(Math.PI / 4, -Math.PI / 2, AngleOrientation.NEGATIVE)

      const result = angles.subtended_angle

      const expected = (3 * Math.PI) / 4
      expect(result).toBeCloseTo(expected)
    })

    it('with angles in positive order and NEGATIVE returns correct angle', () => {
      const angles = new ArcAngles(-Math.PI / 2, Math.PI / 4, AngleOrientation.NEGATIVE)

      const result = angles.subtended_angle

      const expected = (5 * Math.PI) / 4
      expect(result).toEqual(expected)
    })
  })
})
