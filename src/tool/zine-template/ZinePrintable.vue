<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { PDFDoc } from '../../lib/pdf/PDFDoc.ts'
import { US_LETTER_INCHES } from '../../lib/printables/dimensions.ts'
import { Zine } from '../../lib/printables/Zine.ts'
import PDFViewer from '../../components/PDFViewer.vue'
import { Rect } from '../../lib/primitives/Rect.ts'

const props = defineProps<{
  zine: Zine
}>()

const pdf_file: Ref<File | undefined> = ref(undefined)
const LANDSCAPE_INCHES = US_LETTER_INCHES.transpose()

const PRINTABLE = new PDFDoc({
  page_size_inches: LANDSCAPE_INCHES.dimensions,
  pixels_per_inch: 200,
})

onMounted(async () => {
  await PRINTABLE.init()
  PRINTABLE.add_centered_page(props.zine, props.zine.dimensions)
  pdf_file.value = await PRINTABLE.finish('mini-foldable-zine.pdf')
})
</script>

<template>
  <PDFViewer v-if="pdf_file" :width="700" :height="500" :file="pdf_file"></PDFViewer>
</template>
