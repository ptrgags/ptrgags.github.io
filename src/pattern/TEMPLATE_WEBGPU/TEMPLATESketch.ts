import { SWATCH } from '../../core/dimensions.js'
import { QuadUVMode, type QuadMachineSketch } from '../../lib/webgpu/machines/QuadMachine.js'
import { make_quad_sketch } from '../../lib/webgpu/sketches.js'
import SHADER from './TEMPLATE.wgsl?url'

export class TEMPLATESketch implements QuadMachineSketch {
  uv_mode: QuadUVMode = QuadUVMode.Basic
  shader_url: string = SHADER
  imports = [/*SHADER_LIBRARY.sdf2d*/]
}

export const WEBGPU_SKETCHES = {
  template: make_quad_sketch(SWATCH.dimensions, new TEMPLATESketch()),
}
