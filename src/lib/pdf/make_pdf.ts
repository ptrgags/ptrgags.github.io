import { PDFDocument } from 'pdf-lib'
import type { Drawable } from '../primitives/Drawable.ts'
import type { Dimensionlike } from '../primitives/Dimensionlike.ts'
import { DrawPDF } from './DrawPDF.ts'

export interface MakePDFOptions {
  filename: string
  scene: Drawable
  page_size: Dimensionlike
}

export async function make_pdf(options: MakePDFOptions): Promise<File> {
  const document = await PDFDocument.create()
  const { width, height } = options.page_size
  const page = document.addPage([width, height])

  const lib = new DrawPDF(page)

  options.scene.draw(lib)

  const pdf_bytes = await document.save()

  const owned = new Uint8Array([...pdf_bytes])
  return new File([owned], options.filename, {
    type: 'application/pdf',
  })
}
