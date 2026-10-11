import { describe, it, expect } from 'vitest'
import { AngleOrientation, ArcAngles } from './ArcAngles.ts'

describe('ArcAgnles', () => {
  describe('angle', () => {
    it('with 0 returns start angle', () => {
      const angles = new ArcAngles(-Math.PI / 2, Math.PI / 4, AngleOrientation.POSITIVE)

      const result = angles.angle(0)

      // or should it be reduced mod 2pi? need to think about this...
      const expected = -Math.PI / 2
      expect(result).toBe(expected)
    })
  })
})
