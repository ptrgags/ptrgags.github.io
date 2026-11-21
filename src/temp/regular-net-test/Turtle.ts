import { degrees_to_radians } from '../../lib/math/degrees.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'

export class Turtle {
  position: Point2P
  angle_degrees: number

  constructor(position: Point2P = Point2P.ORIGIN, angle_degrees: number = 0) {
    this.position = position
    this.angle_degrees = angle_degrees
  }

  clone(): Turtle {
    return new Turtle(this.position, this.angle_degrees)
  }

  forward(length: number) {
    const offset = Direction2P.from_angle(degrees_to_radians(this.angle_degrees)).scale(length)
    this.position = this.position.add(offset)
  }

  rotate(angle_degrees: number) {
    this.angle_degrees += angle_degrees
  }

  get_transform(): Rigid {
    return new Rigid({
      translation: this.position,
      rotation: degrees_to_radians(this.angle_degrees),
    })
  }
}
