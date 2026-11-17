import type p5 from 'p5'
import { ATC_SCREEN } from '../../core/dimensions.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Clock } from '../../lib/animation/Clock.ts'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { SpineWave } from './SpineWave.ts'
import type { Animated } from '../../lib/animation/Animated.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'

const CLOCK = new Clock()

class SpineWaveAnimation implements SceneP5 {
  primitive: Drawable & Animated

  constructor() {
    this.primitive = new SpineWave({
      unit_circle: new Circle(
        ATC_SCREEN.center.to_direction().mul_components(new Direction2P(1, 0.25)),
        64,
      ),
      num_vertebrae: 9,
      spacing: 48,
    })
  }

  update(p: p5): void {
    const t = CLOCK.elapsed_time
    this.primitive.update(t)
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  spine_wave: make_sketch(ATC_SCREEN.dimensions, new SpineWaveAnimation()),
}
