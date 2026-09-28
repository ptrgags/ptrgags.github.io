/**
 * For drawing purposes, we often only care that an object has (x, y)
 * coordinates.
 */
export interface Pointlike {
  get x(): number
  get y(): number
}
