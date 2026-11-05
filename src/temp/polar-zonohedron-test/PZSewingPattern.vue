<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { PDFDoc } from '../../lib/pdf/PDFDoc.ts'
import { US_LETTER_INCHES } from '../../lib/printables/dimensions.ts'
import PDFViewer from '../../components/PDFViewer.vue'
import { printable_pattern } from './polar-zonohedron.ts'

const pdf_file: Ref<File | undefined> = ref(undefined)

const PPI = 50
const PRINTABLE = new PDFDoc({
  page_size_inches: US_LETTER_INCHES.dimensions,
  pixels_per_inch: PPI,
})

onMounted(async () => {
  await PRINTABLE.init()
  const [pattern, dimensions] = printable_pattern()
  PRINTABLE.add_centered_page(pattern, dimensions)
  pdf_file.value = await PRINTABLE.finish('hallofriezes.pdf')
})
</script>

<template>
  <PDFViewer v-if="pdf_file" :width="700" :height="500" :file="pdf_file"></PDFViewer>
</template>
