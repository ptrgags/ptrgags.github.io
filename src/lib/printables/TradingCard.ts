import { ATC_SCREEN } from '../../core/dimensions.ts'
import { Direction2P } from '../math/pga2d/Direction2P.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { Group } from '../primitives/Group.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { group, style, xform } from '../primitives/shorthand.ts'
import { Text } from '../primitives/Text.ts'
import { Color } from '../styling/Color.ts'
import { Style } from '../styling/Style.ts'
import { TextStyle } from '../styling/TextStyle.ts'

export interface TradingCardOptions {
  /**
   * Drawable for the center of
   */
  body: Drawable
  /**
   * If provided, this drawable will be placed in a 400x400 px box in the
   * center. Render in the rectangle [0, 400]^2, this class will handle the
   * translation.
   *
   * Note that this is a little smaller than SWATCH used for thumbnails
   * (512x512)
   */
  swatch?: Drawable
  /**
   * If provided, a caption box will be added to the bottom of the card
   * and the text will be applied
   */
  caption?: string
}

const STYLE_OUTLINE = Style.lines(Color.BLACK, 2)
const STYLE_CAPTION_BOX = new Style({
  fill: Color.WHITE,
  stroke: Color.BLACK,
  width: 2,
})

const STYLE_CAPTION_TEXT = {
  style: Style.flat(Color.BLACK),
  text_style: new TextStyle(24, 'center', 'center'),
}

function make_caption(caption: string | undefined): Drawable {
  if (!caption) {
    return Group.EMPTY
  }

  const caption_box = style(STYLE_CAPTION_BOX, TradingCard.BOUNDS_CAPTION)
  const caption_text = style(
    STYLE_CAPTION_TEXT,
    new Text(caption, TradingCard.BOUNDS_CAPTION.center),
  )

  return group(caption_box, caption_text)
}

export class TradingCard implements Drawable {
  primitive: Drawable

  constructor(options: TradingCardOptions) {
    const caption = make_caption(options.caption)
    const swatch = options.swatch
      ? xform(Rigid.translation(TradingCard.BOUNDS_SWATCH.position), options.swatch)
      : Group.EMPTY

    this.primitive = group(style(STYLE_OUTLINE, TradingCard.BOUNDS), caption, swatch)
  }

  draw(lib: DrawingLibrary): void {
    this.primitive.draw(lib)
  }

  static readonly BOUNDS = ATC_SCREEN
  // 3/4 inch tall rectangle at the bottom for the caption
  static readonly BOUNDS_CAPTION = ATC_SCREEN.align(new Direction2P(500, 150), 'center', 'bottom')
  // The rest of the card is the "main portion"
  static readonly BOUNDS_MAIN = ATC_SCREEN.align(new Direction2P(500, 550), 'center', 'top')
  // Center a 2" square in the middle of the main rectangle for a "swatch"
  static readonly BOUNDS_SWATCH = TradingCard.BOUNDS_MAIN.align(
    new Direction2P(400, 400),
    'center',
    'center',
  )
}
