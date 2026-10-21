import { PDFDocument, PDFFont, StandardFonts } from 'pdf-lib'
import { Direction2P } from '../math/pga2d/Direction2P.ts'
import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import type { Drawable } from '../primitives/Drawable.ts'
import { DrawPDF } from './DrawPDF.ts'

export interface PDFDocOptions {
  page_size_inches: Dimensionlike
  pixels_per_inch: number
}

const POINTS_PER_INCH = 72

export class PDFDoc {
  page_size_points: Dimensionlike
  pixels_per_inch: number
  document?: PDFDocument
  font?: PDFFont
  constructor(options: PDFDocOptions) {
    this.page_size_points = Direction2P.from_dimensions(options.page_size_inches).scale(
      POINTS_PER_INCH,
    )
    this.pixels_per_inch = options.pixels_per_inch
  }

  async init() {
    this.document = await PDFDocument.create()
    this.font = await this.document.embedFont(StandardFonts.Helvetica)
  }

  add_page(scene: Drawable) {
    if (!this.document || !this.font) {
      throw new Error('remember to await init() before add_page')
    }

    const { width, height } = this.page_size_points
    const page = this.document.addPage([width, height])
    const lib = new DrawPDF(page, this.pixels_per_inch, this.font)

    scene.draw(lib)
  }

  async finish(filename: string): Promise<File> {
    if (!this.document) {
      throw new Error('remember to await init() before add_page')
    }

    const pdf_bytes = await this.document?.save()
    const owned = new Uint8Array([...pdf_bytes])
    return new File([owned], filename, {
      type: 'application/pdf',
    })
  }
}
