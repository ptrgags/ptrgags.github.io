import { describe, it, expect } from 'vitest'
import type { VectorSpace } from '../math/VectorSpace.ts'
import type { Equals } from '../types/Equals.ts'

export interface VectorTestOptions<V> {
  label: string
  vector_space: VectorSpace<V>
  // (a, b, expected_sum)
  add_commutativity: [V, V, V]
  // (a, b, c, expected_sum)
  add_associativity: [V, V, V, V]
  // Vector to use for additive identity
  add_identity: V
  // (v, expected_neg)
  add_inverse: [V, V]
  // (a, b, expected_diff)
  sub: [V, V, V]
  // (r, s, v, expected)
  scalar_associativity: [number, number, V, V]
  // (r, a, b, expected)
  distributivity: [number, V, V, V]
  // Vector to use for scalar identity
  scalar_identity: V
  // (weights, vectors, expected_sum)
  combo: [[number, number, number], [V, V, V], V]
}

/**
 * Set up vector space tests for a specific type following the VS axioms
 * @see {@link https://mathworld.wolfram.com/VectorSpace.html | Worlfram MathWorld: VectorSpace}
 * @param options data for test cases
 */
export function vector_space_tests<V>(options: VectorTestOptions<V>) {
  const vs = options.vector_space

  describe(`Vector Space for ${options.label}`, () => {
    it('addition is commutative', () => {
      const [a, b, expected_sum] = options.add_commutativity

      const ab = vs.add(a, b)
      const ba = vs.add(b, a)

      expect(vs.equals(ab, ba)).toBe(true)
      expect(vs.equals(ab, expected_sum)).toBe(true)
    })

    it('addition is associative', () => {
      const [a, b, c, expected_sum] = options.add_associativity

      const ab_c = vs.add(vs.add(a, b), c)
      const a_bc = vs.add(a, vs.add(b, c))

      expect(vs.equals(ab_c, a_bc)).toBe(true)
      expect(vs.equals(ab_c, expected_sum)).toBe(true)
    })

    it('zero() is the additive identity', () => {
      const zero = vs.zero()
      const a = options.add_identity

      const result = vs.add(zero, a)

      expect(vs.equals(result, a)).toBe(true)
    })

    it('neg() returns additive inverse', () => {
      const [a, expected_neg] = options.add_inverse

      const result = vs.neg(a)

      expect(vs.equals(result, expected_neg)).toBe(true)
    })

    it('sub is the same as adding neg', () => {
      const [a, b, expected_diff] = options.sub

      const result_sub = vs.sub(a, b)
      const result_a_neg_b = vs.add(a, vs.neg(b))

      expect(vs.equals(result_sub, result_a_neg_b)).toBe(true)
      expect(vs.equals(result_sub, expected_diff)).toBe(true)
    })

    it('scalar multiplication is associative', () => {
      const [r, s, v, expected] = options.scalar_associativity

      const r_sv = vs.scale(r, vs.scale(s, v))
      const rs_v = vs.scale(r * s, v)

      expect(vs.equals(r_sv, rs_v)).toBe(true)
      expect(vs.equals(r_sv, expected)).toBe(true)
    })

    it('scalar multiplciation distributes over addition', () => {
      const [r, a, b, expected_sum] = options.distributivity

      const r_ab = vs.scale(r, vs.add(a, b))
      const ra_rb = vs.add(vs.scale(r, a), vs.scale(r, b))

      expect(vs.equals(r_ab, ra_rb)).toBe(true)
      expect(vs.equals(r_ab, expected_sum)).toBe(true)
    })

    it('1 is the scalar identity', () => {
      const v = options.scalar_identity

      const result = vs.scale(1, v)

      expect(vs.equals(result, v)).toBe(true)
    })

    it('combo computes a linear combination', () => {
      const [weights, vectors, expected_sum] = options.combo

      const result = vs.combo(weights, vectors)

      expect(vs.equals(result, expected_sum)).toBe(true)
    })
  })
}
