import type { CRS12 } from '../math/CRS12.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import { Repeat1D } from './Repeat1D.ts'

export interface FriezeP1Slot {
  i: number
}

export class FriezeP1 {}

export interface FriezeP11GSlot {
  i: number
  glide: boolean
}

export class FriezeP11G {}

export interface FriezeP11MSlot {
  i: number
  flip_y: boolean
}

export class FriezeP11M {}

export interface FriezeP1M1Slot {
  i: number
  flip_x: boolean
}

export class FriezeP1M1 {}

export interface FriezeP2Slot {
  i: number
  rotate: boolean
}

export class FriezeP2 {}

export interface FriezeP2MGSlot {
  i: number
  glide: boolean
  flip_x: boolean
}

export class FriezeP2MG {}

export interface FriezeP2MMSlot {
  i: number
  flip_x: boolean
  flip_y: boolean
}

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
