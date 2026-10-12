import { InputSystem } from '../input/InputSystem'
import { BindGroup } from './BindGroup'
import { Uniform, UniformStruct, UniformType } from './UniformBuffer'
import { get_canvas, get_context, get_device } from './setup'

export interface Machine {
  create_resources(
    device: GPUDevice,
    canvas: HTMLCanvasElement,
    context: GPUCanvasContext,
    bind_group: BindGroup,
  ): Promise<void>

  configure_input(input: InputSystem): void

  update(time: number): void

  configure_passes(
    encoder: GPUCommandEncoder,
    context: GPUCanvasContext,
    bind_group: BindGroup,
  ): void
}

export class Engine {
  input: InputSystem
  machine: Machine
  u_frame: UniformStruct
  bind_group: BindGroup
  canvas: HTMLCanvasElement

  constructor(machine: Machine, use_midi: boolean) {
    this.canvas = get_canvas('webgpu-canvas')
    this.input = new InputSystem(this.canvas, use_midi)
    this.machine = machine

    const time = new Uniform(UniformType.F32, new Float32Array([0.0]))
    this.u_frame = new UniformStruct(0, [
      {
        name: 'time',
        value: time,
      },
    ])

    this.bind_group = new BindGroup('per_frame', [this.u_frame, this.input.u_input])
  }

  async main() {
    this.input.init()

    const device = await get_device()
    const context = get_context(this.canvas)

    await this.create_resources(device, context)

    this.configure_input()

    // Configure the render loop
    const start = performance.now()
    const render = () => {
      const elapsed_time = (performance.now() - start) / 1000.0

      // Update state
      this.update(device, elapsed_time)

      // Queue up compute and render passes
      const encoder = device.createCommandEncoder()
      this.configure_passes(encoder, context)
      device.queue.submit([encoder.finish()])

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }

  async create_resources(device: GPUDevice, context: GPUCanvasContext) {
    this.u_frame.create(device)
    this.input.create_resources(device)
    this.bind_group.create(device)

    await this.machine.create_resources(device, this.canvas, context, this.bind_group)
  }

  configure_input() {
    this.machine.configure_input(this.input)
  }

  update(device: GPUDevice, time: number) {
    this.input.update(device, time)

    // Update the current time
    this.u_frame.get_uniform('time').value = new Float32Array([time])
    this.u_frame.update(device)

    this.machine.update(time)
  }

  configure_passes(encoder: GPUCommandEncoder, context: GPUCanvasContext) {
    this.machine.configure_passes(encoder, context, this.bind_group)
  }
}
