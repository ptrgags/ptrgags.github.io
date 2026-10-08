import type { Equals } from '../types/Equals.ts'

/**
 * Vector operations for a given type
 */
export interface VectorOps<V> {
  // returns true if two vectors are considered equal.
  // this is not strictly required for a vector space, but necessary for
  // unit tests.
  equals(a: V, b: V): boolean
  // The null vector
  zero(): V
  // Vectoral sum. It must be commutative and associative
  add(a: V, b: V): V
  // optional space-efficient subtraction
  efficient_sub?: (a: V, b: V) => V
  // Additive inverse
  neg(v: V): V
  // Scalar Multiplication
  scale(k: number, v: V): V
  // If defined, this should be a space-efficient linear combination
  // that avoids making temporaries like the generic implementation.
  //
  // Do not include the length check here, VectorSpace.combo will handle that!
  efficient_combo?: (scalars: number[], vectors: V[]) => V
}

/**
 * Generic class that implements
 */
export class VectorSpace<V> {
  ops: VectorOps<V>

  constructor(ops: VectorOps<V>) {
    this.ops = ops
  }

  equals(a: V, b: V): boolean {
    return this.ops.equals(a, b)
  }

  zero(): V {
    return this.ops.zero()
  }

  add(a: V, b: V): V {
    return this.ops.add(a, b)
  }

  neg(a: V): V {
    return this.ops.neg(a)
  }

  sub(a: V, b: V): V {
    if (this.ops.efficient_sub) {
      return this.ops.efficient_sub(a, b)
    }

    return this.ops.add(a, this.ops.neg(b))
  }

  scale(k: number, v: V): V {
    return this.ops.scale(k, v)
  }

  combo(scalars: number[], vectors: V[]): V {
    if (scalars.length !== vectors.length) {
      throw new Error('arrays must have the same length')
    }

    if (this.ops.efficient_combo) {
      return this.ops.efficient_combo(scalars, vectors)
    }

    // Generic version. This creates temporaries
    let result = this.ops.zero()
    for (let i = 0; i < scalars.length; i++) {
      const scaled = this.ops.scale(scalars[i], vectors[i])
      result = this.ops.add(result, scaled)
    }
    return result
  }
}
