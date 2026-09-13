/**
 * An object that updates to a specific animation time
 */
export interface Animated {
  /**
   * Update the animation's state
   * @param t Current timeline time. This is a number that increments from 0
   */
  update(t: number): void
}
