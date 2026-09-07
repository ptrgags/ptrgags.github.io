const REGEX_HEX_COLOR = /^#?[0-9A-Fa-f]{6}$/

/**
 * Format a `u8` as a 2-digit hex number with leading 0s as needed
 * @param value_u8
 */
function format_hex_u8(value_u8: number) {
  const hex_value = value_u8.toString(16)
  if (hex_value.length === 1) {
    return `0${hex_value}`
  }

  return hex_value
}

/**
 * `sRGBA` color with values in the range [0, 255]
 */
export class Color {
  r: number
  g: number
  b: number
  a: number
  static readonly BLACK = new Color(0, 0, 0)
  static readonly RED = new Color(255, 0, 0)
  static readonly GREEN = new Color(0, 255, 0)
  static readonly BLUE = new Color(0, 0, 255)
  static readonly YELLOW = new Color(255, 255, 0)
  static readonly MAGENTA = new Color(255, 0, 255)
  static readonly CYAN = new Color(0, 255, 255)
  static readonly WHITE = new Color(255, 255, 255)

  /**
   * Constructor
   * @param r The red component from 0 to 255
   * @param g The green component from 0 to 255
   * @param b The blue component from 0 to 255
   * @param a the alpha component from 0 to 255
   */
  constructor(r: number, g: number, b: number, a: number = 255) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a ?? 255
  }

  /**
   * Convert a color to a CSS color code
   * @returns A string in the form #RRGGBB
   */
  to_hex_code(): string {
    const r = format_hex_u8(this.r)
    const g = format_hex_u8(this.g)
    const b = format_hex_u8(this.b)
    return `#${r}${g}${b}`
  }

  /**
   * Parse a color from a hex code like `RRGGBB` or `#RRGGBB`. This is useful
   * when the input came from an HTML color input
   * @param hex_code The hex code
   * @returns The parsed color
   */
  static from_hex_code(hex_code: string): Color {
    if (!REGEX_HEX_COLOR.test(hex_code)) {
      throw new Error('hex_code must be in the form RRGGBB or #RRGGBB')
    }

    const start = hex_code.charAt(0) === '#' ? 1 : 0
    const red_string = hex_code.slice(start, start + 2)
    const green_string = hex_code.slice(start + 2, start + 4)
    const blue_string = hex_code.slice(start + 4)

    const red = parseInt(red_string, 16)
    const green = parseInt(green_string, 16)
    const blue = parseInt(blue_string, 16)

    return new Color(red, green, blue)
  }
}
