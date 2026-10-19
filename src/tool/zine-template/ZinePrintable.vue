<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { PDFDoc } from '../../lib/pdf/PDFDoc.ts'
import { US_LETTER_INCHES } from '../../lib/printables/dimensions.ts'
import { Zine } from '../../lib/printables/Zine.ts'
import PDFViewer from '../../components/PDFViewer.vue'
import { Rect } from '../../lib/primitives/Rect.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { xform } from '../../lib/primitives/shorthand.ts'

const pdf_file: Ref<File | undefined> = ref(undefined)

const PPI = 200
const LANDSCAPE_INCHES = US_LETTER_INCHES.transpose()
const LANDSCAPE_PIXELS = Rect.from_dimensions(LANDSCAPE_INCHES.dimensions.scale(PPI))

const PRINTABLE = new PDFDoc({
  page_size_inches: LANDSCAPE_INCHES.dimensions,
  pixels_per_inch: 200,
})

const ZINE_TEMPLATE = Zine.DEFAULT_ZINE

// Center the zine on the page so the edges don't get cut out
const CENTERED_BOUNDS = LANDSCAPE_PIXELS.align(ZINE_TEMPLATE.dimensions, 'center', 'center')
const TRANSLATE_CENTER = Rigid.translation(CENTERED_BOUNDS.position)
const SCENE = xform(TRANSLATE_CENTER, ZINE_TEMPLATE)

onMounted(async () => {
  await PRINTABLE.init()
  PRINTABLE.add_page(SCENE)
  pdf_file.value = await PRINTABLE.finish('mini-foldable-zine.pdf')
})
</script>

<template>
  <PDFViewer v-if="pdf_file" :width="700" :height="500" :file="pdf_file"></PDFViewer>
</template>
