import { is_nearly } from '../math/is_nearly.js'
import { lerp } from '../math/lerp.js'
import { mod } from '../math/mod.js'
import { Direction2P } from '../math/pga2d/Direction2P.js'
import type { DrawingLibrary } from './DrawingLibrary.js'
import type { Pointlike } from './Pointlike.js'
import type { Transformation } from './TransformationOp.js'

export interface RigidOptions {
  translation?: Pointlike
  rotation?: number
  flip?: boolean
}

/**
 * Rigid transformation in the form:
 *
 * translate(offset) * rotate(angle) * flip_y?
 *
 * The rotation angle will always be reduced to be in [0, 2pi]
 */
export class Rigid implements Transformation {
  translation: Direction2P
  rotation: number
  flip: boolean

  /**
   * Constructor
   * @param {RigidOptions} options Settings for the rigid transformation
   */
  constructor(options: RigidOptions) {
    this.translation = Direction2P.from_point(options.translation ?? Direction2P.ZERO)
    this.rotation = mod(options.rotation ?? 0, 2 * Math.PI)
    this.flip = options.flip ?? false
  }

  equals(other: Rigid) {
    return (
      is_nearly(this.rotation, other.rotation) &&
      this.flip === other.flip &&
      this.translation.equals(other.translation)
    )
  }

  /**
  inverse() {
    // (T * R * Y?)^-1 = Y? * R^-1 * T^-1
    // = Y? * R^-1 * T(-d)
    // = Y? * T(R^-1 * -d) * R^-1
    // = T(Y? * R^-1 * -d) * Y? * R^-1
    // = T(Y? * R^-1 * -d) * R^(+/-1) * Y?

    const angle = this.flip ? this.rotation : -this.rotation

    const inv_rot = Motor.rotation(Point.ORIGIN, -this.rotation)
    const rotated_offset = inv_rot.transform_dir(this.translation.neg())
    const translation = this.flip ? rotated_offset.flip_y() : rotated_offset

    return new Rigid({
      translation: translation,
      rotation: angle,
      flip: this.flip,
    })
  }

  /**
   * Compose two transformations this * other
   * @param {Rigid} other Another transformation
   * @returns {Rigid} The transformation that represents applying other, then
   * applying this

  compose(other: Rigid): Rigid {
    // T1 * R1 * Y1? * T2 * R2 * Y2?
    // = T1 * T(R1 * Y1 * d2) * R1 * Y1? * R2 * Y2?
    // = T1 * T(R1 * Y1 * d2) * R1 * R2^(+/-1) * Y1? * Y2?
    const motor = Motor.rotation(Point.ORIGIN, this.rotation)

    const flipped_offset = this.flip
      ? new Direction2P(other.translation.x, -other.translation.y)
      : other.translation
    const translation = this.translation.add(motor.transform_dir(flipped_offset))

    const r2_sign = this.flip ? -1 : 1
    const rotation = this.rotation + r2_sign * other.rotation

    return new Rigid({
      translation,
      rotation,
      // using !== as logical XOR
      flip: this.flip !== other.flip,
    })
  }

  /**
   * Compute the rigid transformation that takes other to this transformation.
   * i.e. difference = A * B^-1
   * @param {Rigid} other
   * @returns {Rigid}
   
  difference(other: Rigid): Rigid {
    // PERFORMANCE IDEA: this can be written out explicitly and simplified
    // instead of making temporaries, similar to compose()
    return this.compose(other.inverse())
  }

  /**
   * Use this rigid transformation to conjugate another one,
   * i.e. compute A * B * A^-1
   * @param {Rigid} other
   * @returns {Rigid}
   
  conjugate(other: Rigid): Rigid {
    // PERFORMANCE IDEA: this can be written out explicitly and simplified
    // instead of making temporaries, similar to compose()
    return this.compose(other).compose(this.inverse())
  }
    */

  /**
   * Convenience constructor for a translation
   * @param offset
   * @returns
   */
  static translation(offset: Pointlike): Rigid {
    return new Rigid({ translation: offset })
  }

  /**
   * Convenience constructor for a rotation transformation
   * @param {number} angle Rotation angle in radians
   * @returns {Rigid}
   */
  static rotation(angle: number): Rigid {
    return new Rigid({ rotation: angle })
  }

  /**
   * Convenience constructor for reflection in a line through the origin
   * but potentially rotated
   * @param {number} theta
   * @returns {Rigid}
   */
  static reflection(theta: number): Rigid {
    // R(theta) * flip_y * R(theta)^(-1)
    // = R(theta)^2 * flip_y
    return new Rigid({ flip: true, rotation: 2 * theta })
  }

  /**
   * Interpolate between rigid transformations. this interpolates the
   * translation amount and rotation angle separately.
   *
   * NOTE: this will throw an error if a and b have opposite orientations,
   * as intermediate transformations are not rigid
   * @param {Rigid} a First transformation
   * @param {Rigid} b Second transformation. It must have the same orientation as a
   * @param {number} t interpolation factor, usually in [0, 1]
   * @return {Rigid} Rigid transformation
   */
  static interpolate(a: Rigid, b: Rigid, t: number): Rigid {
    if (a.flip !== b.flip) {
      throw new Error('a and b must have the same orientation')
    }

    const translation = Direction2P.lerp(a.translation, b.translation, t)
    const rotation = lerp(a.rotation, b.rotation, t)
    const flip = a.flip

    return new Rigid({ translation, rotation, flip })
  }

  apply_transformation(lib: DrawingLibrary): void {
    lib.apply_rigid(this.translation.x, this.translation.y, this.rotation, this.flip)
  }

  static readonly IDENTITY = new Rigid({})
  static readonly FLIP_Y = new Rigid({ flip: true })
}
