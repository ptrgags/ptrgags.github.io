import type { Machine } from '../../lib/webgpu/Engine.js'
import { SHADER_LIBRARY } from '../../lib/webgpu/ShaderLibrary.js'
import {
  QuadMachine,
  QuadUVMode,
  type QuadMachineSketch,
} from '../../lib/webgpu/machines/QuadMachine.js'
import SHADER from './TEMPLATE.wgsl?url'

export class TEMPLATESketch implements QuadMachineSketch {
  uv_mode: QuadUVMode = QuadUVMode.Basic
  shader_url: string = SHADER
  imports = [SHADER_LIBRARY.sdf2d]

  static make_machine(): Machine {
    return new QuadMachine(new TEMPLATESketch())
  }
}
