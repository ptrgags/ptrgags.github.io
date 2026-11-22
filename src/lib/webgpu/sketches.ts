import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import { QuadMachine, type QuadMachineSketch } from './machines/QuadMachine.ts'
import { ShapeMachine, type ShapeMachineSketch } from './machines/ShapeMachine.ts'

export function make_quad_sketch(dimensions: Dimensionlike, sketch: QuadMachineSketch) {
  return {
    machine: new QuadMachine(sketch),
    dimensions,
  }
}

export function make_shape_sketch(dimensions: Dimensionlike, sketch: ShapeMachineSketch) {
  return {
    machine: new ShapeMachine(sketch),
    dimensions,
  }
}
