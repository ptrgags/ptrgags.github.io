<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { make_pdf } from '../../lib/pdf/make_pdf'
import { Direction2P } from '../../lib/math/pga2d/Direction2P'
import { group, style } from '../../lib/primitives/shorthand'
import { Style } from '../../lib/styling/Style'
import { Color } from '../../lib/styling/Color'
import { Rect } from '../../lib/primitives/Rect'
import { Point2P } from '../../lib/math/pga2d/Point2P'
import SketchP5 from '../../components/SketchP5.vue'
import { make_static_sketch } from '../../lib/p5-helpers/sketches'
import { ATC_SCREEN } from '../../core/dimensions'
import { Path } from '../../lib/primitives/Path.ts'
import { BezierCurve } from '../../lib/primitives/BezierCurve.ts'
const pdf_url: Ref<string | undefined> = ref(undefined)

const PAGE_WITH_CAPTION = style(
  Style.lines(Color.BLACK, 2),
  ATC_SCREEN,
  // the rectangle is 3/4 inch tall at the bottom
  ATC_SCREEN.align(new Direction2P(500, 150), 'center', 'bottom'),
)

const TEST_SCENE = group(
  style(Style.lines(Color.RED, 2), new Rect(new Point2P(10, 10), new Direction2P(100, 200))),
  style(
    Style.flat(Color.BLUE),
    new Path({
      parts: [
        new BezierCurve(
          new Point2P(0, 0),
          new Point2P(128, 64),
          new Point2P(128, 192),
          new Point2P(0, 256),
        ),
      ],
      closed: true,
    }),
  ),
)

// Hide the PDF toolbar in the <object> tag to avoid including
// an AI summary button (at least in Chromium browsers)
function hide_toolbars(pdf_url: string): string {
  // see https://stackoverflow.com/a/36715963
  return `${pdf_url}#toolbar=0&navpanes=0`
}

const sketch = make_static_sketch(ATC_SCREEN.dimensions, TEST_SCENE)

onMounted(async () => {
  const file = await make_pdf({
    filename: 'test.pdf',
    scene: PAGE_WITH_CAPTION,
    page_size_inches: new Direction2P(10, 7),
    pixels_per_inch: 200,
  })

  const url = URL.createObjectURL(file)
  pdf_url.value = url
})
</script>

<template>
  <div class="vertical">
    <SketchP5 :sketch="sketch"></SketchP5>
    <br />

    <object
      class="pdf-viewer"
      v-if="pdf_url"
      type="application/pdf"
      width="700"
      height="500"
      :data="pdf_url"
    ></object>
  </div>
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
