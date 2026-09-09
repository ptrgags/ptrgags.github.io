import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Rect } from './Rect.ts'

export interface GridAxisOptions {
  spacing: number
  // Phase of the lines in [0, 1)
  phase: number
}

export interface GridlinesOptions {
  bounds: Rect
  x_axis?: GridAxisOptions
  y_axis?: GridAxisOptions
  draw_bounds?: boolean
}

export class Gridlines implements Drawable {
  bounds: Rect
  x_axis?: GridAxisOptions
  y_axis?: GridAxisOptions
  draw_bounds: boolean

  constructor(options: GridlinesOptions) {
    this.bounds = options.bounds
    this.x_axis = options.x_axis
    this.y_axis = options.y_axis

    this.draw_bounds = options.draw_bounds ?? false
  }

  draw(lib: DrawingLibrary): void {
    if (this.draw_bounds) {
      this.bounds.draw(lib)
    }

    if (this.x_axis) {
      const { spacing, phase } = this.x_axis
      const { x, y } = this.bounds.position
      const { width, height } = this.bounds.dimensions
      const num_lines = Math.floor(width / spacing)
      for (let i = 0; i < num_lines; i++) {
        const line_x = x + (i + phase) * spacing
        lib.segment(line_x, y, line_x, y + height)
      }
    }

    if (this.y_axis) {
      const { spacing, phase } = this.y_axis
      const { x } = this.bounds.position
      const { width, height } = this.bounds.dimensions
      const num_lines = Math.floor(height / spacing)
      for (let i = 0; i < num_lines; i++) {
        const y = (i + phase) * spacing
        lib.segment(x, y, x + width, y)
      }
    }
  }
}
