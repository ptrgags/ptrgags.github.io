<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { make_pdf } from '../../lib/pdf/make_pdf'
import { Direction2P } from '../../lib/math/pga2d/Direction2P'
import { group, style } from '../../lib/primitives/shorthand'
import { Style } from '../../lib/styling/Style'
import { Color } from '../../lib/styling/Color'
import { Rect } from '../../lib/primitives/Rect'
import { Point2P } from '../../lib/math/pga2d/Point2P'
const pdf_url: Ref<string | undefined> = ref(undefined)

const TEST_SCENE = group(
  style(Style.lines(Color.BLACK, 2), new Rect(new Point2P(10, 10), new Direction2P(100, 200))),
)

// Hide the PDF toolbar in the <object> tag to avoid including
// an AI summary button (at least in Chromium browsers)
function hide_toolbars(pdf_url: string): string {
  // see https://stackoverflow.com/a/36715963
  return `${pdf_url}#toolbar=0&navpanes=0`
}

onMounted(async () => {
  const file = await make_pdf({
    filename: 'test.pdf',
    // TODO: specify the scene in pixels
    scene: TEST_SCENE,
    page_size_inches: new Direction2P(8.5, 11),
  })

  const url = URL.createObjectURL(file)
  pdf_url.value = url
})
</script>

<template>
  <object
    class="pdf-viewer"
    v-if="pdf_url"
    type="application/pdf"
    width="500"
    height="700"
    :data="hide_toolbars(pdf_url)"
  ></object>
</template>

<style scoped>
.pdf-viewer {
  max-width: 60vw;
}

@media screen and (width >= 800px) {
  .pdf-viewer {
    max-width: none;
  }
}
</style>
