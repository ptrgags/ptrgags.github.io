import QUAD_MACHINE_SHADER from '../shaders/machines/quad_machine.wgsl?url'
import SDF3D_SHADER from '../shaders/libraries/sdf3d.wgsl?url'
import SDF2D_SHADER from '../shaders/libraries/sdf2d.wgsl?url'
import SRGB_SHADER from '../shaders/libraries/srgb.wgsl?url'
import CSG_SHADER from '../shaders/libraries/csg.wgsl?url'
import OKLCH_SHADER from '../shaders/libraries/oklch.wgsl?url'
import CONST_SHADER from '../shaders/libraries/constants.wgsl?url'
import SHAPE_MACHINE_SHADER from '../shaders/machines/shape_machine.wgsl?url'
import RECT_MASK_SHADER from '../shaders/libraries/rect_mask.wgsl?url'
import SPHERE_TRACER_MACHINE_SHADER from '../shaders/machines/sphere_tracer_machine.wgsl?url'
import BITWISE_COLOR_SHADER from '../shaders/libraries/bitwise_color.wgsl?url'
import COLORS_SRGB_SHADER from '../shaders/libraries/colors_srgb.wgsl?url'
import XFORM_SHADER from '../shaders/libraries/transformations.wgsl?url'
import CAMERA_SHADER from '../shaders/libraries/camera.wgsl?url'
import ORTHO_SHADER from '../shaders/libraries/ortho.wgsl?url'
import INPUT_UNIFORMS_SHADER from '../shaders/machines/input_uniforms.wgsl?url'
import { fetch_text } from '../lib/fetch_text.ts'

export class LazyShader {
  url: string
  wgsl?: string
  fetch_promise?: Promise<string>

  constructor(url: string) {
    this.url = url
  }

  async fetch_wgsl(): Promise<string> {
    // we have a result
    if (this.wgsl !== undefined) {
      return this.wgsl
    }

    if (this.fetch_promise === undefined) {
      this.fetch_promise = fetch_text(this.url).then((wgsl) => (this.wgsl = wgsl))
    }

    return await this.fetch_promise
  }
}

// Machines will use these shaders internally
export const MACHINE_LIBRARY = {
  // common code for defining input signals
  input_uniforms: new LazyShader(INPUT_UNIFORMS_SHADER),
  quad: new LazyShader(QUAD_MACHINE_SHADER),
  sphere_tracer: new LazyShader(SPHERE_TRACER_MACHINE_SHADER),
  shape: new LazyShader(SHAPE_MACHINE_SHADER),
}

// Shader libraries that can be manually imported by a sketch
export const SHADER_LIBRARY = {
  sdf3d: new LazyShader(SDF3D_SHADER),
  sdf2d: new LazyShader(SDF2D_SHADER),
  oklch: new LazyShader(OKLCH_SHADER),
  srgb: new LazyShader(SRGB_SHADER),
  csg: new LazyShader(CSG_SHADER),
  constants: new LazyShader(CONST_SHADER),
  rect_mask: new LazyShader(RECT_MASK_SHADER),
  bitwise_color: new LazyShader(BITWISE_COLOR_SHADER),
  colors_srgb: new LazyShader(COLORS_SRGB_SHADER),
  camera: new LazyShader(CAMERA_SHADER),
  ortho: new LazyShader(ORTHO_SHADER),
  xforms: new LazyShader(XFORM_SHADER),
}
