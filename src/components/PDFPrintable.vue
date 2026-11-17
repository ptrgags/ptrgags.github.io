<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import type { Printable } from '../lib/printables/Printable.ts'
import { PDFDoc } from '../lib/pdf/PDFDoc.ts'
import { ATC_SCREEN } from '../core/dimensions.ts'
import PDFViewer from './PDFViewer.vue'

const props = defineProps<{
  // dimensions of the preview window in pixels, NOT the document itself
  width?: number
  height?: number
  printable: Printable
}>()

// by default use a landscape ATC
const width = props.width ?? ATC_SCREEN.dimensions.height
const height = props.height ?? ATC_SCREEN.dimensions.width

const printable = props.printable

const pdf_file: Ref<File | undefined> = ref(undefined)

onMounted(async () => {
  const doc = new PDFDoc({
    pixels_per_inch: printable.pixels_per_inch,
    page_size_inches: printable.page_size_inches,
  })

  await doc.init()

  for (const page of printable.pages) {
    const { scene, dimensions } = page
    doc.add_centered_page(scene, dimensions)
  }

  pdf_file.value = await doc.finish(printable.filename)
})
</script>

<template>
  <PDFViewer v-if="pdf_file" :width="width" :height="height" :file="pdf_file"></PDFViewer>
</template>
