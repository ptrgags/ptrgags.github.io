import type p5 from 'p5'

/**
 * Object that can be drawn to the screen using p5.js
 */
export interface DrawP5 {
  draw_p5(p: p5): void
}

/**
 * Check if an object can be drawn as a P5 primitive
 * @param x Any object
 * @returns True if x has a draw_p5() method
 */
export function is_p5_compatible(x: any): x is DrawP5 {
  return x.draw_p5 !== undefined
}
