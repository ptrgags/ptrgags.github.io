<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { PDFDoc } from '../../lib/pdf/PDFDoc.ts'
import { US_LETTER_INCHES } from '../../lib/printables/dimensions.ts'
import PDFViewer from '../../components/PDFViewer.vue'
import { printable_sliceform, sliceform_3d_print } from './sliceform-test.ts'
import { DrawSVG } from '../../lib/svg/DrawSVG.ts'
import { encode_svg_file } from '../../lib/svg/encode_svg.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { download_file } from '../../lib/dom/download_file.ts'

const pdf_file: Ref<File | undefined> = ref(undefined)

const PPI = 100
const PRINTABLE = new PDFDoc({
  page_size_inches: US_LETTER_INCHES.dimensions,
  pixels_per_inch: PPI,
})

onMounted(async () => {
  await PRINTABLE.init()
  const { primitive, dimensions } = printable_sliceform(PPI)
  PRINTABLE.add_centered_page(primitive, dimensions)
  pdf_file.value = await PRINTABLE.finish('sliceform.pdf')

  const svg_doc = new DrawSVG({
    view_box: US_LETTER_INCHES,
  })
  primitive.draw(svg_doc)
})

function download_single() {
  const { primitive, dimensions } = sliceform_3d_print(PPI)
  console.log(dimensions)
  const file = encode_svg_file(primitive, 'sliceform-single.svg', Rect.from_dimensions(dimensions))
  download_file(file)
}
</script>

<template>
  <PDFViewer v-if="pdf_file" :width="700" :height="500" :file="pdf_file"></PDFViewer>

  <button @click="download_single">Export single SVG</button>
</template>
