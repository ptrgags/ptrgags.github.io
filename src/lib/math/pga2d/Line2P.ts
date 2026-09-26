import { is_nearly } from '../is_nearly.js'
import { Direction2P } from './Direction2P.js'
import { Odd2P } from './Odd2P.js'
import { Point2P } from './Point2P.js'

/**
 * a line in PGA is represented by a unit normal and distance from origin
 *
 * @implements {Primitive}
 */
export class Line2P {
  vec: Odd2P
  is_infinite: boolean

  /**
   * @param {number} nx The x-component of the normal
   * @param {number} ny The y-component of the normal
   * @param {number} d The distance of the line from the origin in the direction of the normal with units of the normal's length
   */
  constructor(nx: number, ny: number, d: number) {
    const mag_sqr = nx * nx + ny * ny

    this.is_infinite = is_nearly(mag_sqr, 0)

    if (this.is_infinite) {
      this.vec = new Odd2P(0, 0, -d, 0)
    } else {
      const mag = Math.sqrt(mag_sqr)
      this.vec = new Odd2P(nx / mag, ny / mag, -d / mag, 0)
    }
  }

  /**
   * The x component of the normal
   * @type {number}
   */
  get nx() {
    return this.vec.x
  }

  /**
   * The y-component of the normal
   * @type {number}
   */
  get ny() {
    return this.vec.y
  }

  /**
   * The distance from the origin in the direction of the normal
   * @type {number}
   */
  get d() {
    return -this.vec.o
  }

  /**
   * Find the meet of two lines. This is their point of intersection, or for parallel lines
   * an ideal point in the direction the lines point (this is 90 degrees clockwise of their normals)
   * @param {Line2P} other The line to intersect with
   * @returns {Point | Direction}
   */
  meet(other: Line2P): Direction2P | Point2P {
    const bivec = this.vec.wedge_odd(other.vec)
    if (is_nearly(bivec.xy, 0)) {
      return Direction2P.from_bivec(bivec)
    }

    return Point2P.from_bivec(bivec)
  }

  /**
   * Get the dot product of lines - the cosine of the angle between them
   * @param {Line2P} other Another line
   * @returns {number} The dot product of the lines.
   */
  dot(other: Line2P): number {
    return this.vec.dot(other.vec)
  }

  /**
   * Get the sin of the angle between two lines without using trig functions. This is
   * the magnitude of the wedge product
   * @param {Line2P} other The other line
   * @returns {number} Sine of the angle between the two lines
   */
  sin_angle_to(other: Line2P): number {
    return this.vec.wedge(other.vec).xy
  }

  /**
   * Check if this line is equivalent to another. This uses is_nearly()
   * due to floating point calculations
   * @param {Line2P} other Another line
   * @returns {boolean} true if the lines are equivalent (up to epsilon)
   */
  equals(other: Line2P): boolean {
    // The constructor normalizes the vector, so we
    // can use an equality test here.
    return this.vec.equals(other.vec)
  }

  toString(): string {
    if (this.is_infinite) {
      return `LineAtInfinity(${this.vec.o})`
    }

    return `Line(${this.nx}, ${this.ny}, ${this.d})`
  }

  // TODO: think about how rendering should work
  /*
   * Draw the line as a line segment that goes past the canvas bounds
   * @param {import('p5')} p p5 library
   
  draw(p) {
    const { nx, ny, d } = this

    // Draw a super long line so it goes outside the bounds of the canvas
    const RADIUS = 1000

    // Center point is in the direction n a distance d
    const cx = d * nx
    const cy = d * ny
    // rotate the normal to get a tangent
    // via (x, y) -> (-y, x)
    const tx = -ny
    const ty = nx

    // the points are
    // center +/- radius * tangent
    const x1 = cx + RADIUS * tx
    const y1 = cy + RADIUS * ty
    const x2 = cx - RADIUS * tx
    const y2 = cy - RADIUS * ty
    p.line(x1, y1, x2, y2)
  }
  */

  /**
   * Create a line from a vector object
   * @param {Odd} vec
   */
  static from_vec(vec: Odd2P): Line2P {
    const { x: nx, y: ny, o: d } = vec
    return new Line2P(nx, ny, -d)
  }

  // TODO: how do I want to implement this?
  /*
   * Construct a line from a line segment
   * @param {LineSegment} segment
   *
  static from_segment(segment: LineSegment) {
    const { start, end } = segment
    if (a.equals(b)) {
      throw new Error('line segment must have two different end points')
    }

    const dir = b.sub(a)
    const normal = dir.rot90().normalize()
    const dist = normal.dot(a.to_direction())

    return new Line2P(normal.x, normal.y, dist)
  }
    */

  X_AXIS = new Line2P(0, 1, 0)
  Y_AXIS = new Line2P(1, 0, 0)
}
