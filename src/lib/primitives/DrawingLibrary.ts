import type { Style } from '../styling/Style.ts'

/**
 * Generic 2D graphics drawing library
 *
 * Coordinates are always specified y-down in pixels. Implementations
 */
export interface DrawingLibrary {
  /**
   * Draw a circle with center (cx, cy) and radius r
   * @param cx x-coordinate of center
   * @param cy y-coordinate of center
   * @param r radius
   */
  circle(cx: number, cy: number, r: number): void

  /**
   * Draw a line segment
   * @param x1 x-coordinate of first point
   * @param x2 y-coordinate of first point
   * @param y1 x-coordinate of second point
   * @param y2 y-coordinate of second point
   */
  segment(x1: number, y1: number, x2: number, y2: number): void

  /**
   * Apply 2D styling, this includes stroke color, stroke width, and fill
   * color.
   * @param style The style to apply
   */
  apply_style(style: Style): void
}
