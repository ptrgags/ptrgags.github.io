import { GridLayer, type Coords, type DoneCallback, type GridLayerOptions } from 'leaflet'
import { DrawSVG } from '../../lib/svg/DrawSVG.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { SWATCH } from '../../core/dimensions.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'

export class SVGLayer extends GridLayer {
  tile_func: (coords: Coords) => Drawable | undefined
  constructor(tile_func: (coords: Coords) => Drawable | undefined, options?: GridLayerOptions) {
    super(options)
    this.tile_func = tile_func
  }

  protected createTile(coords: Coords): HTMLElement {
    // SVGElement is not an HTMLElement! so wrap it in a div.
    const wrapper = document.createElement('div')

    const drawable = this.tile_func(coords)

    if (drawable) {
      const lib = new DrawSVG({
        // it just so happens that my swatches are the same as Leaflet
        // map tiles! 256x256
        view_box: SWATCH,
      })

      drawable.draw(lib)
      wrapper.appendChild(lib.root)
    }

    return wrapper
  }
}
