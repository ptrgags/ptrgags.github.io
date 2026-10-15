import { describe, it, expect } from 'vitest'
import type { Group } from '../math/Group'

export interface GroupTestOptions<G> {
  label: string
  group: Group<G>
  associativity: [G, G, G, G]
  identity_law: G
  // (g, expected_inv)
  inverse: [G, G]
  // (a, b, expected_product)
  abelian?: [G, G, G]
  // (a, b, expected_diff)
  diff: [G, G, G]
  // (a, b, expected_sandwich)
  sandwich: [G, G, G]
  // (a, b, expected_commutator)
  commutator: [G, G, G]
}

export function group_tests<G>(options: GroupTestOptions<G>) {
  const group = options.group

  describe(`Group for ${options.label}`, () => {
    it('mul() is associative', () => {
      const [a, b, c, expected] = options.associativity

      const ab_c = group.mul(group.mul(a, b), c)
      const a_bc = group.mul(a, group.mul(b, c))

      expect(group.equals(ab_c, a_bc)).toBe(true)
      expect(group.equals(ab_c, expected)).toBe(true)
    })

    it('identity() is the group identity', () => {
      const id = group.identity()
      const g = options.identity_law

      const id_g = group.mul(id, g)
      const g_id = group.mul(g, id)
      expect(group.equals(id_g, g_id)).toBe(true)
      expect(group.equals(id_g, g)).toBe(true)
    })

    it('inv() computes the inverse of an element', () => {
      const [g, expected] = options.inverse

      const result = group.inv(g)
      const g_inv = group.mul(g, result)
      const inv_g = group.mul(result, g)

      expect(group.equals(result, expected)).toBe(true)
      // check that gg^-1 = I = g^-1g
      expect(group.equals(g_inv, inv_g)).toBe(true)
      expect(group.equals(g_inv, group.identity())).toBe(true)
    })

    // TODO: diff, sandwich, commutator
  })
}
