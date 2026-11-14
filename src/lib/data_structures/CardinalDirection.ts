import { Direction2P } from '../math/pga2d/Direction2P.ts'

/**
 * One of the 4 cardinal directions. They're ordered from the right in CCW
 * order (so they correspond to 90 degree angles in radians)
 * @readonly
 * @enum {Number}
 */
export enum CardinalDirection {
  RIGHT,
  UP,
  LEFT,
  DOWN,
  COUNT,
}

/**
 * Get the opposite direction
 * @param {CardinalDirection} direction The direction
 * @returns {CardinalDirection} The opposite direction
 */
export function opposite(direction: CardinalDirection): CardinalDirection {
  switch (direction) {
    case CardinalDirection.LEFT:
      return CardinalDirection.RIGHT
    case CardinalDirection.RIGHT:
      return CardinalDirection.LEFT
    case CardinalDirection.UP:
      return CardinalDirection.DOWN
    case CardinalDirection.DOWN:
      return CardinalDirection.UP
    default:
      throw new Error('invalid direction')
  }
}

/**
 * Return a (y-up) PGA direction. This is helpful when working with math
 * If you need y-down, use to_direction().flip_y()
 * @param {CardinalDirection | undefined} direction The direction constant
 * @returns {Direction2P} A PGA direction object corresponding to the same direction
 */
export function to_direction(direction: CardinalDirection | undefined): Direction2P {
  switch (direction) {
    case CardinalDirection.LEFT:
      return Direction2P.DIR_X.neg()
    case CardinalDirection.RIGHT:
      return Direction2P.DIR_X
    case CardinalDirection.UP:
      return Direction2P.DIR_Y
    case CardinalDirection.DOWN:
      return Direction2P.DIR_Y.neg()
  }

  return Direction2P.ZERO
}
