import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import type { Drawable } from '../primitives/Drawable.ts'

export interface PrintablePage {
  /**
   * The scene to draw
   */
  scene: Drawable
  /**
   * How big is the scene in pixels. This will be used to center the scene
   * on the page
   */
  dimensions: Dimensionlike
}

export interface Printable {
  /**
   * what to call the file to be downloaded. Must end in .pdf
   */
  filename: string
  /**
   * How many pixels to an inch in the printed document
   */
  pixels_per_inch: number
  /**
   * Size of every page in inches
   */
  page_size_inches: Dimensionlike
  pages: PrintablePage[]
}
