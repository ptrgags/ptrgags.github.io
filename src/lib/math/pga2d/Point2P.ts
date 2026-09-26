import { is_nearly } from '../is_nearly.js'
import { Direction2P } from './Direction2P.js'
import { Even2P } from './Even2P.js'
import { Line2P } from './Line2P.js'

/**
 * A generalzed point that can be either a Euclidean point, or an ideal
 * point (i.e. a direction).
 *
 * This is a wrapper around a bivector (an Even object) that normalizes
 * the representation so the xy component is either 1 or 0.
 *
 * Because this is a bivector, some operations like reflection might have
 * a different sign than you expect.
 *
 * @implements {Primitive}
 */
export class Point2P {
  bivec: Even2P

  /**
   * Create a Euclidean point, i.e. the xy component is 1
   * @param {number} x The x coordinate
   * @param {number} y The y coordinate
   */
  constructor(x: number, y: number) {
    const xy = 1
    const xo = -y
    const yo = x
    this.bivec = new Even2P(0, xy, xo, yo)
  }

  /**
   * Construct from a bivector
   * @param {Even} bivec The bivector that represents this point.
   */
  static from_bivec(bivec: Even2P): Point2P {
    const { xy, xo, yo } = bivec
    if (is_nearly(xy, 0)) {
      throw new Error('Trying to create a Point from a direction!')
    }

    const x = yo / xy
    const y = -xo / xy
    return new Point2P(x, y)
  }

  /**
   * Switch from a Point to a Direction representation (for convenience)
   * @returns
   */
  to_direction() {
    return new Direction2P(this.x, this.y)
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
   * Add a direction to a Point, producing a new point.
   * @param {Direction} dir The direction to add
   */
  add(dir: Direction2P): Point2P {
    // the xy component will always be 1 + 0 = 1, so always a Point.
    const { xo, yo } = this.bivec.add(dir.bivec)
    const x = yo
    const y = -xo
    return new Point2P(x, y)
  }

  /**
   * Subtract two generalized points. This produces a direction from
   * other to self
   * @param {Point2P} other The other point
   * @returns {Direction} A direction from other to self
   */
  sub(other: Point2P): Direction2P {
    const { xo, yo } = this.bivec.sub(other.bivec)
    const x = yo
    const y = -xo
    return new Direction2P(x, y)
  }

  /**
   * Join this point to another point or direction, producing a line through
   * both.
   * @param {Point2P | Direction} other The other point or direction
   * @returns {Line} The line through the two points
   */
  join(other: Point2P | Direction2P): Line2P {
    const vec = this.bivec.vee(other.bivec)
    return Line2P.from_vec(vec)
  }

  /**
   * Compute the squared distance between this point and another one
   * @param {Point2P} point another point
   * @returns {number}
   */
  dist_sqr(point: Point2P): number {
    return this.sub(point).mag_sqr()
  }

  /**
   * Compute distance to a point
   * @param {Point2P} point another point
   * @returns {number}
   */
  dist(point: Point2P): number {
    return Math.sqrt(this.dist_sqr(point))
  }

  /**
   * Return a point of the same type
   * @returns {Point2P} The result of flipping the y-coordinate
   */
  flip_y(): Point2P {
    return new Point2P(this.x, -this.y)
  }

  /**
   *
   * @returns {string}
   */
  toString(): string {
    const x_str = this.x.toPrecision(3)
    const y_str = this.y.toPrecision(3)
    return `Point(${x_str}, ${y_str})`
  }

  /**
   * @param {Point2P} other The point to check
   * @returns {boolean} true if objects are equal
   */
  equals(other: Point2P): boolean {
    return this.bivec.equals(other.bivec)
  }

  // TODO: think about rendering details
  /*
   * Draw the point as a small circle
   * @param {import("p5")} p The p5.js library
   
  draw(p: import('p5')) {
    const POINT_RADIUS = 4
    p.circle(this.x, this.y, 2 * POINT_RADIUS)
  }
  */

  /**
   * Linearly interpolate between two points
   * @param {Point2P} a The first point
   * @param {Point2P} b The second point
   * @param {number} t The interpolation factor
   */
  static lerp(a: Point2P, b: Point2P, t: number) {
    const bivector = Even2P.lerp(a.bivec, b.bivec, t)
    return Point2P.from_bivec(bivector)
  }

  static readonly ORIGIN = new Point2P(0, 0)
}
