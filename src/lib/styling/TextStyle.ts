export type HorizontalTextAlign = 'left' | 'center' | 'right'
export type VerticalTextAlign = 'top' | 'bottom' | 'center' | 'baseline'

/**
 * Style information for text. Only settings that are explicitly set will
 * be applied in p5.js
 */
export class TextStyle {
  size: number
  h_align: HorizontalTextAlign
  v_align: VerticalTextAlign

  /**
   * Constructor. Defaults are based on P5.js
   * @param size Text size
   * @param h_align How to align the text horizontally
   * @param v_align how to align the text vertically
   */
  constructor(
    size = 12,
    h_align: HorizontalTextAlign = 'left',
    v_align: VerticalTextAlign = 'baseline',
  ) {
    this.size = size
    this.h_align = h_align
    this.v_align = v_align
  }

  static readonly DEFAULT = new TextStyle()
}
