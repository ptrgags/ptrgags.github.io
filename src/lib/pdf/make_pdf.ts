import { PDFDocument } from 'pdf-lib'
import type { Drawable } from '../primitives/Drawable.ts'
import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import { DrawPDF } from './DrawPDF.ts'

// PDF uses 72 points per inch
const INCH = 72

export interface MakePDFOptions {
  filename: string
  scene: Drawable
  page_size_inches: Dimensionlike
  pixels_per_inch: number
}

export async function make_pdf(options: MakePDFOptions): Promise<File> {
  const document = await PDFDocument.create()
  const { width, height } = options.page_size_inches
  const page = document.addPage([width * INCH, height * INCH])

  const lib = new DrawPDF(page, options.pixels_per_inch)

  options.scene.draw(lib)

  const pdf_bytes = await document.save()

  const owned = new Uint8Array([...pdf_bytes])
  return new File([owned], options.filename, {
    type: 'application/pdf',
  })
}
