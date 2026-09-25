/**
 * Inspired by Python's collections.defaultdict
 */
export class DefaultDict<T> {
  construct_func: () => T
  dict: { [key: string]: T }

  constructor(construct_func: () => T) {
    this.construct_func = construct_func
    this.dict = {}
  }

  get(key: string): T {
    if (!(key in this.dict)) {
      this.dict[key] = this.construct_func()
    }

    return this.dict[key]
  }

  set(key: string, value: T) {
    this.dict[key] = value
  }
}
