import type { AnalogSignal, DigitalSignal } from './Signal'

export class DigitalConst implements DigitalSignal {
  readonly value: boolean

  constructor(value: boolean) {
    this.value = value
  }

  update() {}
}

export class AnalogConst implements AnalogSignal {
  readonly value: number

  constructor(value: number) {
    this.value = value
  }

  update() {}
}
