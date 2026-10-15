import type { Drawable } from '../primitives/Drawable.js'
import { Rect } from '../primitives/Rect.js'
import { DrawSVG } from './DrawSVG.js'

export function encode_svg_file(scene: Drawable, filename: string, view_box: Rect): File {
  if (!filename.endsWith('.svg')) {
    throw new Error('filename must end with .svg')
  }

  const lib = new DrawSVG({ view_box })
  scene.draw(lib)

  const serializer = new XMLSerializer()
  const svg_str = serializer.serializeToString(lib.root)

  return new File([svg_str], filename, { type: 'image/svg+xml;charset=utf-8' })
}
