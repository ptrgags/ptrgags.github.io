import type { CRS12 } from '../math/CRS12.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { Rigid } from '../primitives/Rigid.ts'
import type { Repeat1D } from './Repeat1D.ts'
import { SymmetryNode } from './SymmetryNode.ts'

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

// Options are mostly the same, but the callback has a different signature
interface FriezeOptions<S> {
  crs: CRS12
  x_range: [number, number]
  children: Drawable | ((slot: S) => Drawable)
}

export class FriezeP1 {}
export class FriezeP11G {}
export class FriezeP11M {}
export class FriezeP1M1 {}
export class FriezeP2 {}

export class FriezeP2MG {
  primitive: SymmetryNode

  constructor(options: FriezeOptions<FriezeP2MGSlot>) {
    const crs = options.crs
    const [first, last] = options.x_range
    const count = last - first + 1

    const transformations = new Array(4 * count)
    for (let i = 0; i < count; i++) {
      const x = first + i
      const offset = 4 * i
      // TODO: This could be done more easily once we can compose transformations
      const origin = crs.origin
      const d = crs.offset(x)
      const half_d = crs.basis_x.scale(0.5)
      transformations[offset] = Rigid.translation(origin.add(d))
      transformations[offset + 1] = new Rigid({
        translation: origin.add(d),
        rotation: Math.PI,
        flip: true,
      })
      transformations[offset + 2] = new Rigid({
        translation: origin.add(d).add(half_d),
        flip: true,
      })
      transformations[offset + 3] = new Rigid({
        translation: origin.add(d).add(half_d),
        rotation: Math.PI,
      })
    }

    let children: Drawable | Drawable[]
    if (typeof options.children === 'function') {
      children = new Array(4 * count)
      for (let i = 0; i < count; i++) {
        const offset = 4 * i
        children[offset] = options.children({ i, flip_x: false, glide: false })
        children[offset + 1] = options.children({ i, flip_x: true, glide: false })
        children[offset + 2] = options.children({ i, flip_x: false, glide: true })
        children[offset + 3] = options.children({ i, flip_x: true, glide: true })
      }
    } else {
      children = options.children
    }

    this.primitive = new SymmetryNode(transformations, children)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}

export class FriezeP2MM implements Drawable {
  primitive: SymmetryNode

  constructor(options: FriezeOptions<FriezeP2MMSlot>) {
    const crs = options.crs
    const [first, last] = options.x_range
    const count = last - first + 1

    const transformations = new Array(4 * count)
    for (let i = 0; i < count; i++) {
      const x = first + i
      const offset = 4 * i
      // TODO: This could be done more easily once we can compose transformations
      const d = crs.position(x)
      transformations[offset] = Rigid.translation(d)
      transformations[offset + 1] = new Rigid({ translation: d, flip: true })
      transformations[offset + 2] = new Rigid({ translation: d, rotation: Math.PI, flip: true })
      transformations[offset + 3] = new Rigid({ translation: d, rotation: Math.PI })
    }

    let children: Drawable | Drawable[]
    if (typeof options.children === 'function') {
      children = new Array(4 * count)
      for (let i = 0; i < count; i++) {
        const offset = 4 * i
        children[offset] = options.children({ i, flip_x: false, flip_y: false })
        children[offset + 1] = options.children({ i, flip_x: true, flip_y: false })
        children[offset + 2] = options.children({ i, flip_x: false, flip_y: true })
        children[offset + 3] = options.children({ i, flip_x: true, flip_y: true })
      }
    } else {
      children = options.children
    }

    this.primitive = new SymmetryNode(transformations, children)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }
}
