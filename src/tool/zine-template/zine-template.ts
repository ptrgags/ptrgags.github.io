import { US_LETTER_INCHES } from '../../lib/printables/dimensions.ts'
import type { Printable } from '../../lib/printables/Printable.ts'
import { Zine } from '../../lib/printables/Zine.ts'

function make_zine_printable(filename: string, zine: Zine): Printable {
  return {
    filename,
    page_size_inches: US_LETTER_INCHES.transpose().dimensions,
    pixels_per_inch: 200,
    pages: [{ scene: zine, dimensions: zine.dimensions }],
  }
}

export const PRINTABLES = {
  blank: make_zine_printable('zine-blank.pdf', Zine.BLANK),
  with_captions: make_zine_printable('zine-blank-with-captions.pdf', Zine.BLANK_WITH_CAPTION_BOXES),
  labeled: make_zine_printable('zine-labled-pages.pdf', Zine.LABELED),
}
