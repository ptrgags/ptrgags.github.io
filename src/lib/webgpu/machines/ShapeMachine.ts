import { fetch_text } from '../../fetch_text.ts'
import type { InputSystem } from '../../input/InputSystem.ts'
import type { BindGroup } from '../BindGroup.ts'
import { compile_shader } from '../compile_shader.ts'
import type { CyclicCounter } from '../CyclicCounter.ts'
import type { Machine } from '../Engine.ts'
import type { GPUPackedMesh } from '../GPUPackedMesh.ts'
import { IndexBuffer } from '../IndexBuffer.ts'
import { LazyShader } from '../LazyShader.ts'
import { RenderPipeline } from '../RenderPipeline.ts'
import { MACHINE_LIBRARY } from '../ShaderLibrary.ts'
import { VertexBuffer } from '../VertexBuffer.ts'
import URL_SHAPE_SHADER from './shape_machine.wgsl?url'

export interface ShapeMachineSketch {
  shader_url: string
  imports?: LazyShader[]
  meshes: GPUPackedMesh[]
  current_mesh: CyclicCounter

  configure_input?: (input: InputSystem) => void
  update?: (time: number) => void
}

interface Model {
  label: string
  vertex_buffer: VertexBuffer
  index_buffer: IndexBuffer
}

const SHAPE_SHADER = new LazyShader(URL_SHAPE_SHADER)

export class ShapeMachine implements Machine {
  private sketch: ShapeMachineSketch
  private models: Model[]
  private render_pipeline: RenderPipeline

  constructor(sketch: ShapeMachineSketch) {
    this.sketch = sketch

    this.render_pipeline = new RenderPipeline()

    if (sketch.meshes.length === 0) {
      throw new Error('there must be at least one mesh')
    }

    this.models = sketch.meshes.map((mesh) => {
      const vertex_buffer = new VertexBuffer(`${mesh.label}_vertices`, [
        mesh.positions,
        mesh.normals,
        mesh.uvs,
      ])
      const index_buffer = new IndexBuffer(`${mesh.label}_indices`, mesh.indices)
      return {
        label: mesh.label,
        vertex_buffer,
        index_buffer,
      }
    })
  }

  async create_resources(
    device: GPUDevice,
    canvas: HTMLCanvasElement,
    context: GPUCanvasContext,
    bind_group: BindGroup,
  ): Promise<void> {
    context.configure({
      device,
      alphaMode: 'opaque',
      format: 'bgra8unorm',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    })

    this.models.forEach((m) => {
      m.vertex_buffer.create(device)
      m.index_buffer.create(device)
    })

    const imports = this.sketch.imports ?? []
    const import_promises = imports.map((x) => x.fetch_wgsl())
    const shader_module = await compile_shader(device, [
      MACHINE_LIBRARY.input_uniforms.fetch_wgsl(),
      SHAPE_SHADER.fetch_wgsl(),
      ...import_promises,
      fetch_text(this.sketch.shader_url),
    ])

    const vertex_state: GPUVertexState = {
      module: shader_module,
      entryPoint: 'vertex_main',
      // all the vertex buffers share the same layout
      buffers: [this.models[0].vertex_buffer.buffer_layout],
    }

    const fragment_state: GPUFragmentState = {
      module: shader_module,
      entryPoint: 'fragment_main',
      targets: [
        {
          format: 'bgra8unorm',
        },
      ],
    }

    await this.render_pipeline.create(device, vertex_state, fragment_state, bind_group)
  }

  configure_input(input: InputSystem): void {
    if (!this.sketch.configure_input) {
      return
    }
    this.sketch.configure_input(input)
  }

  update(time: number): void {
    if (!this.sketch.update) {
      return
    }

    this.sketch.update(time)
  }

  configure_passes(
    encoder: GPUCommandEncoder,
    context: GPUCanvasContext,
    bind_group: BindGroup,
  ): void {
    const model_index = this.sketch.current_mesh.value
    const model = this.models[model_index]

    this.render_pipeline.render(encoder, context, bind_group, (pass) => {
      model.vertex_buffer.attach(pass)
      model.index_buffer.attach(pass)
      pass.drawIndexed(model.index_buffer.count)
    })
  }
}
