import type { Dimensionlike } from './Dimensionlike.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Pointlike } from './Pointlike.ts'

export type RectHorizontalAlign = 'left' | 'center' | 'right' | number
export type RectVerticalAlign = 'top' | 'center' | 'bottom' | number

function parse_h_align(align: RectHorizontalAlign): number {
  if (align === 'left') {
    return 0
  } else if (align === 'center') {
    return 0.5
  } else if (align === 'right') {
    return 1.0
  }

  return align
}

function parse_v_align(align: RectVerticalAlign): number {
  if (align === 'top') {
    return 0
  } else if (align === 'center') {
    return 0.5
  } else if (align === 'bottom') {
    return 1.0
  }

  return align
}

export class Rect implements Drawable {
  dimensions: Dimensionlike
  position: Pointlike

  constructor(position: Pointlike, dimensions: Dimensionlike) {
    this.position = position
    this.dimensions = dimensions
  }

  align(
    other_dimensions: Dimensionlike,
    horizontal_align: RectHorizontalAlign,
    vertical_align: RectVerticalAlign,
  ): Rect {
    const { width, height } = this.dimensions
    const { width: other_width, height: other_height } = other_dimensions

    const margin_x = width - other_width
    const margin_y = height - other_height

    const u = parse_h_align(horizontal_align)
    const v = parse_v_align(vertical_align)

    const { x, y } = this.position

    const position = {
      x: x + u * margin_x,
      y: y + v * margin_y,
    }

    return new Rect(position, other_dimensions)
  }

  draw(lib: DrawingLibrary): void {
    const { x, y } = this.position
    const { width, height } = this.dimensions
    lib.rect(x, y, width, height)
  }

  static from_center(center: Pointlike, dimensions: Dimensionlike): Rect {
    const { x, y } = center
    const { width, height } = dimensions
    const position = {
      x: x - 0.5 * width,
      y: y - 0.5 * height,
    }
    return new Rect(position, dimensions)
  }
}
