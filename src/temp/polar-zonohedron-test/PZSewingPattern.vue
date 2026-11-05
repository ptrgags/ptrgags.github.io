<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { PDFDoc } from '../../lib/pdf/PDFDoc.ts'
import { US_LETTER_INCHES } from '../../lib/printables/dimensions.ts'
import PDFViewer from '../../components/PDFViewer.vue'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { SWATCH_WIDE } from '../../core/dimensions.ts'
import { printable_pattern } from './polar-zonohedron.ts'

const pdf_file: Ref<File | undefined> = ref(undefined)
const LANDSCAPE_INCHES = US_LETTER_INCHES.transpose()

const PPI = 50
const PRINTABLE = new PDFDoc({
  page_size_inches: US_LETTER_INCHES.dimensions,
  pixels_per_inch: PPI,
})

const PRINTABLE_SIZE = new Direction2P(7 * PPI, 6 * PPI)

onMounted(async () => {
  await PRINTABLE.init()
  PRINTABLE.add_centered_page(printable_pattern(), PRINTABLE_SIZE)
  pdf_file.value = await PRINTABLE.finish('hallofriezes.pdf')
})
</script>

<template>
  <PDFViewer v-if="pdf_file" :width="700" :height="500" :file="pdf_file"></PDFViewer>
</template>
