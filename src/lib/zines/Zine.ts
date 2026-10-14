import { ATC_SCREEN } from '../../core/dimensions.ts'
import { Direction2P } from '../math/pga2d/Direction2P.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import type { DrawingLibrary } from '../primitives/DrawingLibrary.ts'
import { Group } from '../primitives/Group.ts'
import { Rigid } from '../primitives/Rigid.ts'
import { style } from '../primitives/shorthand.ts'
import { Color } from '../styling/Color.ts'
import { Style } from '../styling/Style.ts'

export interface ZinePages {
  // Front cover
  front: Drawable
  // Six pages
  page1: Drawable
  page2: Drawable
  page3: Drawable
  page4: Drawable
  page5: Drawable
  page6: Drawable
  // back cover
  back: Drawable
}

function make_page_xforms(ppi: number): Record<keyof ZinePages, Rigid> {
  const page_width = 2.5 * ppi
  const page_height = 3.5 * ppi
  const half_turn = Math.PI

  return {
    // Top half of printed page are pages 1-4 of the zine, but upside down
    page1: new Rigid({
      translation: new Direction2P(4 * page_width, page_height),
      rotation: half_turn,
    }),
    page2: new Rigid({
      translation: new Direction2P(3 * page_width, page_height),
      rotation: half_turn,
    }),
    page3: new Rigid({
      translation: new Direction2P(2 * page_width, page_height),
      rotation: half_turn,
    }),
    page4: new Rigid({
      translation: new Direction2P(1 * page_width, page_height),
      rotation: half_turn,
    }),
    // the bottom half of the printed page is pages 5-6 of the zine, then
    // the covers
    page5: Rigid.translation(new Direction2P(0, page_height)),
    page6: Rigid.translation(new Direction2P(1 * page_width, page_height)),
    back: Rigid.translation(new Direction2P(2 * page_width, page_height)),
    front: Rigid.translation(new Direction2P(3 * page_width, page_height)),
  }
}

// I tend to make ATCs at 500x700px on the screen, which is 2.5x3.5" at 200 PPI
const DEFAULT_PPI = 200
const DEFAULT_PAGE = style(Style.lines(Color.BLACK, 2), ATC_SCREEN)
const DEFAULT_PAGE_WITH_CAPTION = style(
  Style.lines(Color.BLACK, 2),
  ATC_SCREEN,
  // the rectangle is 3/4 inch tall at the bottom
  ATC_SCREEN.align(new Direction2P(500, 150), 'center', 'bottom'),
)

const EMPTY_PAGES = {
  front: DEFAULT_PAGE,
  page1: DEFAULT_PAGE_WITH_CAPTION,
  page2: DEFAULT_PAGE_WITH_CAPTION,
  page3: DEFAULT_PAGE_WITH_CAPTION,
  page4: DEFAULT_PAGE_WITH_CAPTION,
  page5: DEFAULT_PAGE_WITH_CAPTION,
  page6: DEFAULT_PAGE_WITH_CAPTION,
  back: DEFAULT_PAGE,
}

export interface ZineOptions {
  pages: Partial<ZinePages>
  pixels_per_inch?: number
}

export class Zine implements Drawable {
  pages: ZinePages
  transforms: Record<keyof ZinePages, Rigid>

  constructor(options: ZineOptions) {
    const ppi = options.pixels_per_inch ?? DEFAULT_PPI
    this.transforms = make_page_xforms(ppi)
    this.pages = { ...EMPTY_PAGES, ...options.pages }
  }

  draw(lib: DrawingLibrary): void {
    let key: keyof ZinePages
    for (key in this.pages) {
      const xform = this.transforms[key]
      const page = this.pages[key]
      xform.apply_transformation(lib)
      page.draw(lib)
      lib.end_xform()
    }
  }

  static readonly DEFAULT_COVER = DEFAULT_PAGE
  static readonly DEFAULT_PAGE = DEFAULT_PAGE_WITH_CAPTION
}
