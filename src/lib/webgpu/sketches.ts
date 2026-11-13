import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import { QuadMachine, type QuadMachineSketch } from './machines/QuadMachine.ts'

export function make_quad_sketch(dimensions: Dimensionlike, sketch: QuadMachineSketch) {
  return {
    machine: new QuadMachine(sketch),
    dimensions,
  }
}
