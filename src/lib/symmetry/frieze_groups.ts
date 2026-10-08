import type { CRS12 } from '../math/CRS12.ts'
import type { Drawable } from '../primitives/Drawable.ts'

interface TranslationSlot {
  i: number
}

interface FlipXSlot {
  flip_x: boolean
}

interface FlipYSlot {
  flip_y: boolean
}

interface GlideSlot {
  glide: boolean
}

interface RotateSlot {
  rotate: boolean
}

export type FriezeP1Slot = TranslationSlot
export type FriezeP11GSlot = TranslationSlot & GlideSlot
export type FriezeP11MSlot = TranslationSlot & FlipYSlot
export type FriezeP1M1Slot = TranslationSlot & FlipXSlot
export type FriezeP2Slot = TranslationSlot & RotateSlot
export type FriezeP2MGSlot = TranslationSlot & FlipXSlot & GlideSlot
export type FriezeP2MMSlot = TranslationSlot & FlipXSlot & FlipYSlot

export class FriezeP1 {}
export class FriezeP11G {}
export class FriezeP11M {}
export class FriezeP1M1 {}
export class FriezeP2 {}
export class FriezeP2MG {}

export interface FriezeP2MMOptions {
  crs: CRS12
  x_range: [number, number]
  children: Drawable | ((slot: FriezeP2MMSlot) => Drawable)
}

export class FriezeP2MM {
  constructor(options: FriezeP2MMOptions) {
    const crs = options.crs
    const [first, last] = options.x_range
  }
}
