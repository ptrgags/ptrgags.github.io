import { Direction2P } from '../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../lib/math/pga2d/Point2P.ts'
import { Rect } from '../lib/primitives/Rect.ts'

// Storing these as `Rect` objects allows us to compute the center easily

// Pattern swatches and blog thumbnails use this size
export const SWATCH = new Rect(Point2P.ORIGIN, new Direction2P(256, 256))
// For frieze patterns and other things that need some length, this is the
// same area as SWATCH but twice as wide.
export const SWATCH_WIDE = new Rect(Point2P.ORIGIN, new Direction2P(512, 128))

// Art Trading card displayed on the screen
export const ATC_SCREEN = new Rect(Point2P.ORIGIN, new Direction2P(500, 700))
