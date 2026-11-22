import { lcm } from '../math/gcd.ts'
import { Rational } from '../math/Rational.ts'

export class PatternGrid<T> {
  values: T[]
  step_size: Rational
  /**
   * Constructor
   * @param {T[]} values Values for each step
   * @param {Rational} step_size The size of each step. E.g. 1/4 for quarter notes
   */
  constructor(values: T[], step_size: Rational) {
    this.values = values
    this.step_size = step_size
  }

  *[Symbol.iterator]() {
    yield* this.values
  }

  /**
   * The number of steps in this pattern
   * @type {number}
   */
  get length() {
    return this.values.length
  }

  /**
   * The duration of this pattern in time (usually in measures of 4/4 time)
   * @type {Rational}
   */
  get duration() {
    return this.step_size.mul(new Rational(this.values.length))
  }

  /**
   * Keep the grid values the same, but scale the step size. This is like
   * stretching/squishing the pattern in time without changing the structure
   * @example
   * // returns PatternGrid([1, 2, 3], 1/2)
   * new PatternGrid([1, 2, 3], new Rational(1, 4)).scale(2);
   * @param {Rational} factor Scale factor to multiply the step size
   * @returns {PatternGrid<T>}
   */
  scale(factor: Rational): PatternGrid<T> {
    return new PatternGrid(this.values, this.step_size.mul(factor))
  }

  /**
   * Subdivide the grid so each value is repeated a number of times, while
   * keeping the overall duration constant
   * @param {number} factor Positive integer factor for how many times to repeat each element
   * @returns {PatternGrid<T>}
   */
  subdivide(factor: number): PatternGrid<T> {
    if (factor < 1) {
      throw new Error('factor must be a positive integer')
    }

    if (factor === 1) {
      return this
    }

    const repeated = new Array(factor * this.values.length)
    for (const [i, x] of this.values.entries()) {
      for (let j = 0; j < factor; j++) {
        repeated[i * factor + j] = x
      }
    }

    const step_size = this.step_size.div(new Rational(factor))
    return new PatternGrid(repeated, step_size)
  }

  /**
   * Repeat the pattern grid a specific number of times.
   * @param {number} count Integer number of repeats
   * @returns {PatternGrid<T>} A PatternGrid with the repeated values
   */
  repeat(count: number): PatternGrid<T> {
    if (count < 1) {
      throw new Error('count must be a positive integer')
    }

    if (count === 1) {
      return this
    }

    const repeated = new Array(count * this.values.length)
    for (let i = 0; i < count * this.values.length; i++) {
      repeated[i] = this.values[i % this.values.length]
    }
    return new PatternGrid(repeated, this.step_size)
  }

  /**
   * Map a function over each step of the pattern. This is just like Array.map()
   * but for PatternGrids.
   * @template U
   * @param {function(T, number): U} f a function from (x: T, i: number) to some new type U
   * @returns {PatternGrid<U>} New grid with the same size but transformed values
   */
  map<U>(f: (arg0: T, arg1: number) => U): PatternGrid<U> {
    return new PatternGrid(this.values.map(f), this.step_size)
  }

  /**
   * Return the empty pattern
   * @template T
   * @returns {PatternGrid<T>}
   */
  static empty<T>(): PatternGrid<T> {
    return new PatternGrid([], Rational.ONE)
  }

  /**
   * Concatenate pattern grids. They must have the same type and step size
   * @template T
   * @param  {...PatternGrid<T>} grids
   * @returns {PatternGrid<T>} result
   */
  static concat<T>(...grids: PatternGrid<T>[]): PatternGrid<T> {
    if (grids.length === 0) {
      return PatternGrid.empty()
    }

    if (grids.length === 1) {
      return grids[0]
    }

    if (!grids.every((x) => x.step_size.equals(grids[0].step_size))) {
      throw new Error('grids must have the same step size')
    }

    const values = grids.map((x) => x.values).flat()
    return new PatternGrid(values, grids[0].step_size)
  }

  /**
   * Take two patterns and merge them together with a function applied
   * component-wise. The patterns must have the same duration in time, though
   * they can have different step sizes. The result will be subdivided as
   * needed so there's a common grid
   * @template A
   * @template B
   * @template C
   * @param {PatternGrid<A>} a First pattern
   * @param {PatternGrid<B>} b Second pattern.
   * @param {function(A, B): C} merge_func Function for combining elements
   * @returns {PatternGrid<C>} The merged pattern grid.
   */
  static merge<A, B, C>(
    a: PatternGrid<A>,
    b: PatternGrid<B>,
    merge_func: (arg0: A, arg1: B) => C,
  ): PatternGrid<C> {
    if (!a.duration.equals(b.duration)) {
      throw new Error('grids must have the same duration in time')
    }

    if (a.length !== b.length) {
      const common_length = lcm(a.length, b.length)
      const factor_a = common_length / a.length
      const factor_b = common_length / b.length
      a = a.subdivide(factor_a)
      b = b.subdivide(factor_b)
    }

    const merged_values = a.values.map((x, i) => merge_func(x, b.values[i]))
    return new PatternGrid(merged_values, a.step_size)
  }
}
