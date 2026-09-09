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
  // Spacing and count are mutually exclusive
  // If both are undefined, the lines along that axis will be
  // turned off
  x_spacing?: number
  x_count?: number
  y_spacing?: number
  y_count?: number
  // phase defaults to 0
  x_phase?: number
  y_phase?: number
  draw_bounds?: boolean
}

function parse_spacing_count(
  label: string,
  length: number,
  spacing: number | undefined,
  count: number | undefined,
): [number, number] {
  if (spacing === undefined && count === undefined) {
    return [0, 0]
  } else if (spacing !== undefined && count !== undefined) {
    throw new Error(`options.${label}_spacing and options.${label}_count are mutually exclusive`)
  } else if (spacing !== undefined) {
    return [spacing, Math.floor(length / spacing)]
  } else if (count !== undefined) {
    return [length / count, count]
  }

  throw new Error('impossible!')
}

export class Gridlines implements Drawable {
  bounds: Rect
  x_spacing: number
  x_count: number

  y_spacing: number
  y_count: number

  x_phase: number
  y_phase: number
  draw_bounds: boolean

  constructor(options: GridlinesOptions) {
    this.bounds = options.bounds

    const [x_spacing, x_count] = parse_spacing_count(
      'x',
      options.bounds.dimensions.width,
      options.x_spacing,
      options.x_count,
    )
    const [y_spacing, y_count] = parse_spacing_count(
      'y',
      options.bounds.dimensions.height,
      options.y_spacing,
      options.y_count,
    )

    this.x_spacing = x_spacing
    this.x_count = x_count
    this.y_spacing = y_spacing
    this.y_count = y_count

    this.x_phase = options.x_phase ?? 0
    this.y_phase = options.y_phase ?? 0

    this.draw_bounds = options.draw_bounds ?? false
  }

  draw(lib: DrawingLibrary): void {
    if (this.draw_bounds) {
      this.bounds.draw(lib)
    }

    if (this.x_count > 0) {
      const spacing = this.x_spacing
      const phase = this.x_phase
      const { x, y } = this.bounds.position
      const { width, height } = this.bounds.dimensions
      const num_lines = Math.floor(width / spacing)
      for (let i = 0; i < num_lines; i++) {
        const line_x = x + (i + phase) * spacing
        lib.segment(line_x, y, line_x, y + height)
      }
    }

    if (this.y_count > 0) {
      const phase = this.y_phase
      const spacing = this.y_spacing
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
