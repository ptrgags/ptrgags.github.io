import { describe, it, expect } from 'vitest'
import { Wave } from './Wave.ts'

// Power curve but with signed output
// see https://www.desmos.com/calculator/u3vgzcsrfb
function custom_wave(t: number): number {
  return 2 * t * t - 1
}

describe('Wave', () => {
  describe('bipolar', () => {
    it('with default settings returns values between -1 and 1', () => {
      const wave = new Wave(custom_wave)

      expect(wave.bipolar(0)).toEqual(-1)
      expect(wave.bipolar(1 / 4)).toEqual(-7 / 8)
      expect(wave.bipolar(1 / 2)).toEqual(-1 / 2)
      expect(wave.bipolar(3 / 4)).toEqual(1 / 8)
    })

    it('loops starting at time 1', () => {
      const wave = new Wave(custom_wave)

      expect(wave.bipolar(1)).toEqual(-1)
      expect(wave.bipolar(5 / 4)).toEqual(-7 / 8)
      expect(wave.bipolar(3 / 2)).toEqual(-1 / 2)
      expect(wave.bipolar(7 / 4)).toEqual(1 / 8)
    })

    it('with amp scales values', () => {
      const wave = new Wave(custom_wave, { amp: 2 })

      expect(wave.bipolar(1 / 4)).toEqual(-7 / 4)
    })

    it('with bias increases values', () => {
      const wave = new Wave(custom_wave, { bias: 0.5 })

      expect(wave.bipolar(1 / 4)).toEqual(-3 / 8)
    })

    it('with freq changes looping', () => {
      const wave = new Wave(custom_wave, { freq: 2 })

      expect(wave.bipolar(0)).toEqual(-1)
      expect(wave.bipolar(1 / 4)).toEqual(-1 / 2)
      expect(wave.bipolar(1 / 2)).toEqual(-1)
      expect(wave.bipolar(3 / 4)).toEqual(-1 / 2)
      expect(wave.bipolar(1)).toEqual(-1)
      expect(wave.bipolar(5 / 4)).toEqual(-1 / 2)
      expect(wave.bipolar(3 / 2)).toEqual(-1)
      expect(wave.bipolar(7 / 4)).toEqual(-1 / 2)
    })

    it('with phase cycles values', () => {
      const wave = new Wave(custom_wave, { phase: 1 / 4 })

      expect(wave.bipolar(0)).toEqual(-7 / 8)
      expect(wave.bipolar(1 / 4)).toEqual(-1 / 2)
      expect(wave.bipolar(1 / 2)).toEqual(1 / 8)
      expect(wave.bipolar(3 / 4)).toEqual(-1)
    })
  })

  describe('unipolar', () => {
    it('with default settings returns values in [0, 1]', () => {
      const wave = new Wave(custom_wave)

      // the unipolar curve is just t^2!
      expect(wave.unipolar(0)).toEqual(0)
      expect(wave.unipolar(1 / 4)).toEqual(1 / 16)
      expect(wave.unipolar(1 / 2)).toEqual(1 / 4)
      expect(wave.unipolar(3 / 4)).toEqual(9 / 16)
    })

    it('loops starting at time 1', () => {
      const wave = new Wave(custom_wave)

      expect(wave.unipolar(1)).toEqual(0)
      expect(wave.unipolar(5 / 4)).toEqual(1 / 16)
      expect(wave.unipolar(3 / 2)).toEqual(1 / 4)
      expect(wave.unipolar(7 / 4)).toEqual(9 / 16)
    })

    it('with amp scales values', () => {
      const wave = new Wave(custom_wave, { amp: 2 })

      expect(wave.unipolar(1 / 4)).toEqual(1 / 8)
    })

    it('with bias increases values', () => {
      const wave = new Wave(custom_wave, { bias: 0.5 })

      expect(wave.unipolar(1 / 4)).toEqual(9 / 16)
    })

    it('with freq changes looping', () => {
      const wave = new Wave(custom_wave, { freq: 2 })

      expect(wave.unipolar(0)).toEqual(0)
      expect(wave.unipolar(1 / 4)).toEqual(1 / 4)
      expect(wave.unipolar(1 / 2)).toEqual(0)
      expect(wave.unipolar(3 / 4)).toEqual(1 / 4)
      expect(wave.unipolar(1)).toEqual(0)
      expect(wave.unipolar(5 / 4)).toEqual(1 / 4)
      expect(wave.unipolar(3 / 2)).toEqual(0)
      expect(wave.unipolar(7 / 4)).toEqual(1 / 4)
    })

    it('with phase cycles values', () => {
      const wave = new Wave(custom_wave, { phase: 1 / 4 })

      expect(wave.unipolar(0)).toEqual(1 / 16)
      expect(wave.unipolar(1 / 4)).toEqual(1 / 4)
      expect(wave.unipolar(1 / 2)).toEqual(9 / 16)
      expect(wave.unipolar(3 / 4)).toEqual(0)
    })
  })

  describe('sine', () => {
    it('at time 0 returns 0', () => {
      const sine = Wave.sine()

      const result = sine.bipolar(0)

      const expected = 0
      expect(result).toBeCloseTo(expected)
    })

    it('at 1/8 cycle returns sqrt(2)/2', () => {
      const sine = Wave.sine()

      const result = sine.bipolar(1 / 8)

      const expected = Math.SQRT1_2
      expect(result).toBeCloseTo(expected)
    })

    it('at 1/4 cycle returns 1', () => {
      const sine = Wave.sine()

      const result = sine.bipolar(0.25)

      const expected = 1
      expect(result).toEqual(expected)
    })

    it('at 1/2 cycle returns 0', () => {
      const sine = Wave.sine()

      const result = sine.bipolar(0.5)

      const expected = 0
      expect(result).toBeCloseTo(expected)
    })

    it('at 3/4 cycle returns -1', () => {
      const sine = Wave.sine()

      const result = sine.bipolar(0.75)

      const expected = -1
      expect(result).toBeCloseTo(expected)
    })

    it('at 1 1/4 cycles returns 1', () => {
      const sine = Wave.sine()

      const result = sine.bipolar(1.25)

      const expected = 1.0
      expect(result).toBeCloseTo(expected)
    })
  })

  describe('square', () => {
    it('at 0 cycles returns -1', () => {
      const square = Wave.square()

      const result = square.bipolar(0)

      const expected = -1
      expect(result).toEqual(expected)
    })

    it('at 1/8 cycle returns -1', () => {
      const square = Wave.square()

      const result = square.bipolar(1 / 8)

      const expected = -1
      expect(result).toEqual(expected)
    })

    it('at 1/4 cycle returns -1', () => {
      const square = Wave.square()

      const result = square.bipolar(0.25)

      const expected = -1
      expect(result).toEqual(expected)
    })

    it('at 1/2 cycles returns 1', () => {
      const square = Wave.square()

      const result = square.bipolar(0.5)

      const expected = 1
      expect(result).toEqual(expected)
    })

    it('at 3/4 cycles returns 1', () => {
      const square = Wave.square()

      const result = square.bipolar(0.75)

      const expected = 1
      expect(result).toEqual(expected)
    })

    it('at 2 cycles returns -1', () => {
      const square = Wave.square()

      const result = square.bipolar(2)

      const expected = -1
      expect(result).toEqual(expected)
    })
  })
})
