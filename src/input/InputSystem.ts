import { UniformArray, UniformStruct, UniformType } from '../webgpu/UniformBuffer'
import { GamepadInput } from './GamepadInput'
import type { AnalogSignal, DigitalSignal } from './Signal'
import { KeyboardInput } from './KeyboardInput'
import { MidiInput } from './MidiInput'
import { PointerInput } from './PointerInput'
import { LocalClock } from './LocalClock.js'

const DIGITAL_VECTORS = 2
const DIGITAL_COMPONENTS = DIGITAL_VECTORS * 4

const ANALOG_VECTORS = 4
const ANALOG_COMPONENTS = ANALOG_VECTORS * 4

function set_bit(flags: number, bit: number, value: boolean) {
  return (flags & ~(1 << bit)) | (Number(value) << bit)
}

export interface UniformConfigDescriptor {
  analog?: AnalogSignal[]
  digital?: DigitalSignal[]
}

export class InputSystem {
  midi: MidiInput
  use_midi: boolean
  gamepad: GamepadInput
  keyboard: KeyboardInput
  pointer: PointerInput
  clock: LocalClock

  u_input: UniformStruct
  digital_signals: DigitalSignal[] = []
  analog_signals: AnalogSignal[] = []

  constructor(canvas: HTMLCanvasElement, use_midi: boolean) {
    this.midi = new MidiInput()
    this.use_midi = use_midi
    this.gamepad = new GamepadInput()
    this.keyboard = new KeyboardInput()
    this.pointer = new PointerInput(canvas)
    this.clock = new LocalClock()

    const digital = new UniformArray(
      UniformType.VEC4U,
      DIGITAL_VECTORS,
      new Uint32Array(DIGITAL_COMPONENTS),
    )
    const analog = new UniformArray(
      UniformType.VEC4F,
      ANALOG_VECTORS,
      new Float32Array(ANALOG_COMPONENTS),
    )
    this.u_input = new UniformStruct(1, [
      {
        name: 'digital',
        value: digital,
      },
      {
        name: 'analog',
        value: analog,
      },
    ])
  }

  init() {
    if (this.use_midi) {
      this.midi.request_midi()
    }

    this.gamepad.init()
    this.keyboard.init()
    this.pointer.init()
  }

  update_digital(time: number) {
    const buffer = new Uint32Array(DIGITAL_COMPONENTS)
    for (let i = 0; i < this.digital_signals.length; i++) {
      const signal = this.digital_signals[i]
      signal.update(time)

      // the digital signal can be interpreted as an address
      // ccc bbbbb
      // c = component
      // b = bit
      const bit = i & 0b11111
      const component = i >> 5

      buffer[component] = set_bit(buffer[component], bit, signal.value)
    }

    this.u_input.get_uniform('digital').value = buffer
  }

  update_analog(time: number) {
    const buffer = new Float32Array(ANALOG_COMPONENTS)
    for (let i = 0; i < this.analog_signals.length; i++) {
      const signal = this.analog_signals[i]
      signal.update(time)

      buffer[i] = signal.value
    }

    this.u_input.get_uniform('analog').value = buffer
  }

  update(device: GPUDevice, time: number) {
    this.gamepad.update()

    this.update_digital(time)
    this.update_analog(time)
    this.clock.update()
    this.u_input.update(device)
  }

  create_resources(device: GPUDevice) {
    this.u_input.create(device)
  }

  configure_uniforms(descriptor: UniformConfigDescriptor) {
    if (descriptor.digital) {
      this.digital_signals.push(...descriptor.digital)
    }

    if (descriptor.analog) {
      this.analog_signals.push(...descriptor.analog)
    }
  }
}
