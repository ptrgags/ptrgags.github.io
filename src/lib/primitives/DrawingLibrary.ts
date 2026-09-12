import type { Style } from '../styling/Style.ts'
import type { TextStyle } from '../styling/TextStyle.ts'

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
   * @param radius radius
   */
  circle(cx: number, cy: number, radius: number): void

  /**
   * Draw a line segment
   * @param x1 x-coordinate of first point
   * @param x2 y-coordinate of first point
   * @param y1 x-coordinate of second point
   * @param y2 y-coordinate of second point
   */
  segment(x1: number, y1: number, x2: number, y2: number): void

  /**
   * Draw a rectangle
   * @param x x-coordinate of top left corner
   * @param y y-coordinate of top left corner
   * @param width width
   * @param height height
   */
  rect(x: number, y: number, width: number, height: number): void

  /**
   * Draw text at (x, y). The interpretation of the coordinates
   * depends on the text style, but defaults to top left
   * @param value The text to display
   * @param x x-coordinate of the text
   * @param y y-coordinate of the text
   */
  text(value: string, x: number, y: number): void

  /**
   * Apply 2D styling, this includes stroke color, stroke width, and fill
   * color.
   * @param style The style to apply
   */
  apply_style(style: Style): void

  /**
   * Apply text styling, including font size and alignment
   * @param text_style The style to apply
   */
  apply_text_style(text_style: TextStyle): void
}
