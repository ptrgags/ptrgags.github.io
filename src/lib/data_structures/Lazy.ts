export class Lazy<T> {
  init_func: () => T
  initialized: boolean
  #value?: T = undefined

  constructor(init_func: () => T) {
    this.init_func = init_func
    this.initialized = false
  }

  get value(): T {
    // Check `this.initialized` rather than `this.#value`
    // to ensure this works
    if (!this.initialized) {
      this.#value = this.init_func()
      this.initialized = true
    }

    // `#value` gets set at the same time as `initialized` so the result
    // will always be T, not undefined (unless T is a type that allows undefined)
    return this.#value as T
  }

  set value(val: T) {
    this.#value = val
    this.initialized = true
  }
}
