import { Oklch } from './Oklch.js'
import { Color } from './Color.js'

/**
 * Convert from a variety of color formats to a sRGB color
 * @param {Color | Oklch | string} color A color, an Oklch color, or a string hex code
 * @returns {Color}
 */
function to_srgb(color: Color | Oklch | string): Color {
  if (color instanceof Oklch) {
    return color.to_srgb()
  }

  if (color instanceof Color) {
    return color
  }

  return Color.from_hex_code(color)
}

export interface StyleDescriptor {
  stroke?: Color | Oklch | string
  width?: number
  fill?: Color | Oklch | string
}

/**
 * A Style describes the stroke/fill properties of drawing primitives
 * @implements {ToJSON}
 */
export class Style {
  stroke: Color | undefined
  fill: Color | undefined
  stroke_width: number
  width: any

  /**
   * Constructor
   * @param {StyleDescriptor} options The options for the style
   */
  constructor(options: StyleDescriptor) {
    this.stroke = options.stroke ? to_srgb(options.stroke) : undefined
    this.fill = options.fill ? to_srgb(options.fill) : undefined
    this.stroke_width = options.width ?? 1
  }

  /**
   * Shorthand for styling lines and the outline of shapes
   * @param color The stroke color for the lines
   * @param width Line width, if different from the default
   * @returns Style for drawing lines
   */
  static lines(color: Color | Oklch | string, width?: number): Style {
    return new Style({
      stroke: color,
      width,
    })
  }

  /**
   * Shorthand for a shape that's filled with a solid color
   * @param  color Fill color
   * @returns A style suitable for filled shapes or text
   */
  static flat(color: Color | Oklch | string): Style {
    return new Style({ fill: color })
  }

  static INVISIBLE = new Style({})
  static DEFAULT_LINES = Style.lines(Color.WHITE, 2)
  static DEFAULT_FLAT = Style.flat(Color.WHITE)
}
