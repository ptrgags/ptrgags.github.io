export class MeasureNumber {
  // Internally these are stored starting at 0
  measures: number
  beats: number
  is_pickup: boolean

  constructor(measures: number, beats: number = 0) {
    this.measures = measures
    this.beats = beats
    this.is_pickup = measures < 0
  }

  /**
   * Humans start counting at 1. Weird.
   * @returns <measure>.<beat> starting at 1.1
   */
  get measure_number(): string {
    const measure = this.measures + 1
    const beat = Math.floor(this.beats) + 1
    return `${measure}.${beat}`
  }
}
