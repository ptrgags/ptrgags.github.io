/**
 * Set of functions from [0, 1] -> [0, 1]
 * for use with Tween
 *
 * Easing curve functions are taken from {@link https://easings.net}
 */
export class Ease {
  /**
   * Default linear progression
   * @param {number} t Time parameter
   * @returns {number} Progress value
   */
  static identity(t: number): number {
    return t
  }

  /**
   * Speed up at the beginning, near linear at the end. Uses a cubic curve.
   * @param {number} t Time parameter
   * @returns {number} Progress value
   */
  static in_cubic(t: number): number {
    return t * t * t
  }

  /**
   * Near linear at the beginning, slow down at the end. Uses a cubic curve.
   * @param {number} t Time parameter
   * @returns {number} Progress value
   */
  static out_cubic(t: number): number {
    return 1 - Math.pow(1 - t, 3)
  }

  /**
   * Speed up at the beginning, slow down at the end. Uses a cubic curve.
   * @param {number} t Time parameter
   * @returns {number} Progress value
   */
  static in_out_cubic(t: number): number {
    if (t < 0.5) {
      return 4 * t * t * t
    }

    return 1 - Math.pow(-2 * t + 2, 3) / 2
  }
}
