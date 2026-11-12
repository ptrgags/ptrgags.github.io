<script setup lang="ts">
import { onMounted, useTemplateRef, type Ref } from 'vue'
import SketchP5 from '../../components/SketchP5.vue'
import { SWATCH } from '../../core/dimensions'
import { download_file } from '../../lib/dom/download_file'
import { Point2P } from '../../lib/math/pga2d/Point2P'
import { make_static_sketch } from '../../lib/p5-helpers/sketches'
import { BezierCurve } from '../../lib/primitives/BezierCurve'
import { LineSegment } from '../../lib/primitives/LineSegment'
import { Path } from '../../lib/primitives/Path'
import { group, style, xform } from '../../lib/primitives/shorthand'
import { Color } from '../../lib/styling/Color'
import { Style } from '../../lib/styling/Style'
import { DrawSVG } from '../../lib/svg/DrawSVG'
import { encode_svg_file } from '../../lib/svg/encode_svg'
import { Rect } from '../../lib/primitives/Rect.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'

const PATH = new Path({
  parts: [
    new LineSegment(new Point2P(256, 128), new Point2P(256, 256)),
    new BezierCurve(
      new Point2P(256, 256),
      new Point2P(192, 256 + 64),
      new Point2P(192, 256 - 64),
      new Point2P(128, 256),
    ),
    new LineSegment(new Point2P(128, 256), new Point2P(128, 128)),
    new BezierCurve(
      new Point2P(128, 128),
      new Point2P(192, 128 - 64),
      new Point2P(192, 128 + 64),
      new Point2P(256, 128),
    ),
  ],
  closed: true,
})

const SCENE = group(
  style(Style.flat(Color.RED), PATH),

  xform(
    new Rigid({
      translation: new Direction2P(32, 32),
      rotation: Math.PI / 4,
    }),
    style(Style.lines(Color.BLUE), new Rect(Point2P.ORIGIN, new Direction2P(200, 100))),
  ),
)

const sketch = make_static_sketch(SWATCH.dimensions, SCENE)

const converted = useTemplateRef('converted')

function download() {
  const file = encode_svg_file(SCENE, 'download.svg', SWATCH)
  download_file(file)
}

onMounted(() => {
  const svg_doc = new DrawSVG({
    view_box: SWATCH,
  })
  SCENE.draw(svg_doc)
  converted.value?.appendChild(svg_doc.root)
})
</script>

<template>
  <SketchP5 :sketch="sketch" />

  <div ref="converted"></div>
  <button @click="download">YoU wOuLdNt DoWnLoAd An SvG FiLe</button>
</template>
