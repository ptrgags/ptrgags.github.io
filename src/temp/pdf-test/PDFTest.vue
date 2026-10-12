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
  <!--<object v-if="pdf_url" type="application/pdf" width="500" height="700" :data="pdf_url"></object>-->
  <embed v-if="pdf_url" type="application/pdf" width="500" height="700" :src="pdf_url + '#toolbar=0&navpanes=0'"></embed>
</template>
