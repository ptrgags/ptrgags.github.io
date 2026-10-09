export interface GroupOps<G> {
  // Not part of the math group definition, but necessary for unit tests
  equals(a: G, b: G): boolean
  identity(): G
  mul(a: G, b: G): G
  inv(g: G): G
}

export class Group<G> {
  ops: GroupOps<G>

  constructor(ops: GroupOps<G>) {
    this.ops = ops
  }

  identity(): G {
    return this.ops.identity()
  }

  mul(a: G, b: G): G {
    return this.ops.mul(a, b)
  }

  inv(g: G): G {
    return this.ops.inv(g)
  }

  /**
   * a * b^-1
   * @param a
   * @param b
   * @returns
   */
  diff(a: G, b: G): G {
    return this.ops.mul(a, this.ops.inv(b))
  }

  /**
   * a * b * a^-1
   * @param a
   * @param b
   * @returns
   */
  sandwich(a: G, b: G): G {
    const ab = this.ops.mul(a, b)
    return this.ops.mul(ab, this.ops.inv(a))
  }

  /**
   * a * b * a^-1 * b^-1
   * @param a
   * @param b
   * @returns
   */
  commutator(a: G, b: G): G {
    const ab = this.ops.mul(a, b)
    return this.diff(ab, this.ops.inv(ab))
  }
}
