import p5 from 'p5'
import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import { DrawP5 } from './DrawP5.ts'
import type { Drawable } from '../primitives/Drawable.ts'

export interface SceneP5 {
  // No setup() function, just use the constructor!
  update(p: p5): void
  draw(lib: DrawP5): void
}

export function make_sketch(canvas_size: Dimensionlike, scene: SceneP5) {
  return (p: p5) => {
    const lib = new DrawP5(p)
    p.setup = () => {
      const { width, height } = canvas_size
      p.createCanvas(width, height)
      p.pixelDensity(1)
    }

    p.draw = () => {
      p.background(0)
      scene.update(p)
      scene.draw(lib)
    }
  }
}

// Similar to make_sketch but for a sketch that will only render once
export function make_static_sketch(canvas_size: Dimensionlike, scene: Drawable) {
  return (p: p5) => {
    const lib = new DrawP5(p)
    p.setup = () => {
      const { width, height } = canvas_size
      p.createCanvas(width, height)
      p.pixelDensity(1)
      p.noLoop()

      // Only render once
      p.background(0)
      scene.draw(lib)
    }
  }
}
