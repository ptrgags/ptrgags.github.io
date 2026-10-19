<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { Direction2P } from '../../lib/math/pga2d/Direction2P'
import { group, style, xform } from '../../lib/primitives/shorthand'
import { Style } from '../../lib/styling/Style'
import { Color } from '../../lib/styling/Color'
import { Rect } from '../../lib/primitives/Rect'
import { Point2P } from '../../lib/math/pga2d/Point2P'
import SketchP5 from '../../components/SketchP5.vue'
import { make_static_sketch } from '../../lib/p5-helpers/sketches'
import { ATC_SCREEN } from '../../core/dimensions'
import { Path } from '../../lib/primitives/Path.ts'
import { BezierCurve } from '../../lib/primitives/BezierCurve.ts'
import { Zine } from '../../lib/zines/Zine.ts'
import PDFViewer from '../../components/PDFViewer.vue'
import { PDFDoc } from '../../lib/pdf/PDFDoc.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'

const pdf_file: Ref<File | undefined> = ref(undefined)

const TEST_SCENE = group(
  Zine.DEFAULT_PAGE,
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

const TEST_CIRCLE = group(
  Zine.DEFAULT_PAGE,
  style(
    new Style({ stroke: Color.RED, width: 4, fill: Color.YELLOW }),
    new Circle(ATC_SCREEN.center, 100),
  ),
)

const TEST_TEXT = group(
  Zine.DEFAULT_PAGE,
  style(Style.flat(Color.CYAN), Rect.from_center(new Point2P(250, 350), new Direction2P(200, 100))),
  style(Style.flat(Color.BLUE), new Text('Hello World', new Direction2P(250, 350))),
)

const DEFAULT_ZINE = new Zine({
  pages: {
    page1: TEST_SCENE,
    page2: TEST_CIRCLE,
    page5: TEST_TEXT,
  },
})

const sketch = make_static_sketch(ATC_SCREEN.dimensions, TEST_SCENE)

const PDF = new PDFDoc({
  page_size_inches: new Direction2P(10, 7),
  pixels_per_inch: 200,
})

onMounted(async () => {
  await PDF.init()
  PDF.add_page(DEFAULT_ZINE)
  PDF.add_page(new Zine({ pages: {} }))

  pdf_file.value = await PDF.finish('test-multipage.pdf')
})
</script>

<template>
  <div class="vertical">
    <SketchP5 :sketch="sketch"></SketchP5>
    <br />
    <PDFViewer v-if="pdf_file" :width="700" :height="500" :file="pdf_file"></PDFViewer>
  </div>
</template>
