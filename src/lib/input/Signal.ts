export type SignalType = boolean | number

/**
 * Readonly signal value
 */
export interface Signal<T extends SignalType> {
  get value(): T
  update(time: number): void
}

export type DigitalSignal = Signal<boolean>
export type AnalogSignal = Signal<number>

/**
 * Simple signal that observes a property via a callback
 */
export class ObserverSignal<T extends SignalType> implements Signal<T> {
  observe: () => T
  constructor(callback: () => T) {
    this.observe = callback
  }

  update() {}

  get value(): T {
    return this.observe()
  }
}
