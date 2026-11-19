import { ATC_SCREEN } from '../../core/dimensions.ts'
import { make_static_sketch } from '../../lib/p5-helpers/sketches.ts'
import { Circle } from '../../lib/primitives/Circle.ts'

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, new Circle(ATC_SCREEN.center, 100)),
}
