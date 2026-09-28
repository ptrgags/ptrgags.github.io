import { is_nearly } from '../is_nearly.js'
import { Even2P } from './Even2P.js'
import { Line2P } from './Line2P.js'
import { Point2P } from './Point2P.js'

/**
 * An ideal point in geometric algebra, representing a direction. This
 * implementation has additional methods to have vector operations that
 * aren't usually included in the GA definition.
 *
 * This is a wrapper around a bivector (an Even object) that normalizes
 * the representation so the xy component 0. However, this is hidden to the
 * caller.
 */
export class Direction2P {
  bivec: Even2P

  /**
   * Create an ideal point, i.e. the xy component is 0. This represents a
   * point at infinity in the given direction
   * @param {number} x The x direction
   * @param {number} y The y direction
   */
  constructor(x: number, y: number) {
    const xy = 0
    const xo = -y
    const yo = x
    this.bivec = new Even2P(0, xy, xo, yo)
  }

  /**
   * Get a direction from an angle
   * @param {number} theta Counterclockwise angle in radians
   * @returns {Direction2P} A direction with the coordinates (cos(theta), sin(theta))
   */
  static from_angle(theta: number): Direction2P {
    return new Direction2P(Math.cos(theta), Math.sin(theta))
  }

  /**
   * Construct from a bivector
   * @param {Even} bivec The bivector that represents this point.
   * @return {Direction2P}
   */
  static from_bivec(bivec: Even2P): Direction2P {
    const { xy, xo, yo } = bivec
    if (!is_nearly(xy, 0)) {
      throw new Error('Trying to create Direction from a point!')
    }
    const x = yo
    const y = -xo
    return new Direction2P(x, y)
  }

  to_point() {
    return new Point2P(this.x, this.y)
  }

  /**
   * @type {number}
   */
  get x() {
    return this.bivec.yo
  }

  /**
   * @type {number}
   */
  get y() {
    return -this.bivec.xo
  }

  /**
   * Get the dual line
   * @returns {Line} The dual line
   */
  dual(): Line2P {
    const vec = this.bivec.dual()
    return Line2P.from_vec(vec)
  }

  /**
   * Rotate the vector 90 degrees in the positive direction
   * (from +x to +y) using the coordinate transform (x, y) -> (-y, x)
   * instead of using a Motor.
   *
   * This is handy for computing a normal from a tangent.
   * @returns {Direction2P} The rotated vector.
   */
  rot90(): Direction2P {
    return new Direction2P(-this.y, this.x)
  }

  /**
   * For a direction, this reverses the orientation. For a point, this
   * is a no-op due to homogeneity
   * @returns {Direction2P} The direction to negate
   */
  neg(): Direction2P {
    return new Direction2P(-this.x, -this.y)
  }

  /**
   * Rotate the direction 180 degrees. Alias for neg()
   * @returns {Direction2P}
   */
  rot180 = this.neg

  /**
   * Rotate the direction 90 degrees in the negative direction
   * without using a Motor
   * @returns {Direction2P}
   */
  rot270(): Direction2P {
    return new Direction2P(this.y, -this.x)
  }

  /**
   * Get the magnitude of the direction, i.e. x^2 + y^2. In GA confusingly
   * this is called the ideal norm. I'm ignoring that for clarity.
   * @returns {number} The ideal norm squared
   */
  mag_sqr(): number {
    // this is the euclidean norm of the dual, but computed without allocating
    // the dual line
    const { yo: x, xo: y } = this.bivec
    return x * x + y * y
  }

  /**
   * The ideal norm, sqrt(x^2 + y^2)
   * @returns {number} The ideal norm squared
   */
  mag(): number {
    return Math.sqrt(this.mag_sqr())
  }

  /**
   * Normalize the point (if possible) by dividing by the norm
   * @returns {Direction2P} The point with unit length, or the original point for points with 0 norm
   */
  normalize(): Direction2P {
    const { x, y } = this
    const length = this.mag()
    if (is_nearly(length, 0)) {
      return this
    }

    return new Direction2P(x / length, y / length)
  }

  /**
   * Add another direction. This works like vector addition
   * @param {Direction2P} other
   * @returns {Direction2P} The sum of the two points
   */
  add(other: Direction2P): Direction2P {
    const { xo, yo } = this.bivec.add(other.bivec)
    const x = yo
    const y = -xo
    return new Direction2P(x, y)
  }

  /**
   * Subtract two directions, this produces a new Direction
   * @param {Direction2P} other The other point
   * @returns {Direction2P} The result of the subtraction
   */
  sub(other: Direction2P): Direction2P {
    const { xo, yo } = this.bivec.sub(other.bivec)
    const x = yo
    const y = -xo
    return new Direction2P(x, y)
  }

  /**
   * Join two points into a line
   * @param {Point | Direction2P} other The other point to join into a line
   * @returns {Line} The line through the two points
   */
  join(other: Point2P | Direction2P): Line2P {
    const vec = this.bivec.vee_even(other.bivec)
    return Line2P.from_vec(vec)
  }

  /**
   * Make a new Direction in the same direction as this one but with
   * a different magnitude
   * @param {number} length Desired length
   * @returns {Direction2P}
   */
  set_length(length: number): Direction2P {
    const curr_length = this.mag()
    if (curr_length === 0) {
      throw new Error('Trying to set length of null vector')
    }

    const scale_factor = length / curr_length
    return this.scale(scale_factor)
  }

  /**
   * Limit the length of a direction
   * @param {number} max_length
   * @returns {Direction2P} The same direction with updated magnitude
   */
  limit_length(max_length: number): Direction2P {
    const curr_length = this.mag()
    if (curr_length === 0) {
      return this
    }

    const next_length = Math.min(curr_length, max_length)
    const scale_factor = next_length / curr_length
    return this.scale(scale_factor)
  }

  /**
   * Uniformly scale the point.
   * @param {number} scalar The scale factor
   * @returns {Direction2P} the result of scaling
   */
  scale(scalar: number): Direction2P {
    return new Direction2P(scalar * this.x, scalar * this.y)
  }

  /**
   * Component-wise multiplication of x and y coordinates. Not really
   * something done in geometric algebra, but very handy for computing
   * positions and dimensions in 2D grpahics
   * @param {Direction2P} other Another direction to multiply by
   * @returns {Direction2P} the product
   */
  mul_components(other: Direction2P): Direction2P {
    return new Direction2P(this.x * other.x, this.y * other.y)
  }

  /**
   * Component-wise division
   * @param {Direction2P} other
   * @returns {Direction2P} the quotient
   */
  div_components(other: Direction2P): Direction2P {
    return new Direction2P(this.x / other.x, this.y / other.y)
  }

  /**
   * Flip the y-coordinate (useful since p5 is y-down)
   * @returns {Direction2P} The result of flipping the y-coordinate
   */
  flip_y(): Direction2P {
    return new Direction2P(this.x, -this.y)
  }

  /**
   * Compute the dot product of the x and y components of the points.
   * Technically this is the dot product of the duals
   * @param {Direction2P} other The other direction
   * @returns {number} The dot product.
   */
  dot(other: Direction2P): number {
    return this.x * other.x + this.y * other.y
  }

  toString() {
    const x_str = this.x.toPrecision(3)
    const y_str = this.y.toPrecision(3)
    return `Direction(${x_str}, ${y_str})`
  }

  /**
   * @param {Direction2P} other The direction
   * @returns {boolean} true if objects are equal
   */
  equals(other: Direction2P): boolean {
    return this.bivec.equals(other.bivec)
  }

  /**
   * Linearly interpolate between two directions
   * @param {Direction2P} a The first point
   * @param {Direction2P} b The second point
   * @param {number} t The interpolation factor
   */
  static lerp(a: Direction2P, b: Direction2P, t: number) {
    const bivector = Even2P.lerp(a.bivec, b.bivec, t)
    return Direction2P.from_bivec(bivector)
  }

  /**
   * Generate the N n-th roots of unity, i.e. N evenly spaced points around
   * the unit circle exp(2 * pi * i * k / N), except expressed as
   * direction objects, not complex numbers.
   * @param {number} n A positive integer number of roots to generate
   * @return {Direction2P[]} An array of the N roots
   */
  static roots_of_unity(n: number): Direction2P[] {
    if (n < 1) {
      throw new Error('n must be a positive integer')
    }

    const roots = new Array(n)

    for (let i = 0; i < n; i++) {
      const angle = ((2 * Math.PI) / n) * i
      roots[i] = Direction2P.from_angle(angle)
    }

    return roots
  }

  static readonly DIR_X = new Direction2P(1, 0)
  static readonly DIR_Y = new Direction2P(0, 1)
  static readonly ZERO = new Direction2P(0, 0)
}
