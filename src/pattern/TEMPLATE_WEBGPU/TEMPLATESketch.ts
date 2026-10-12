import type { Machine } from '../../webgpu/Engine.js'
import { SHADER_LIBRARY } from '../../webgpu/ShaderLibrary'
import { QuadMachine, QuadUVMode, type QuadMachineSketch } from '../../webgpu/machines/QuadMachine'
import SHADER from './TEMPLATE.wgsl?url'

export class TEMPLATESketch implements QuadMachineSketch {
  uv_mode: QuadUVMode = QuadUVMode.Basic
  shader_url: string = SHADER
  imports = [SHADER_LIBRARY.sdf2d]

  static make_machine(): Machine {
    return new QuadMachine(new TEMPLATESketch())
  }
}
