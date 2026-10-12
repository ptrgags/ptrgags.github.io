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
import { style } from '../../lib/primitives/shorthand'
import { Color } from '../../lib/styling/Color'
import { Style } from '../../lib/styling/Style'
import { DrawSVG } from '../../lib/svg/DrawSVG'
import { encode_svg_file } from '../../lib/svg/encode_svg'

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

const SCENE = style(Style.flat(Color.RED), PATH)

const sketch = make_static_sketch(SWATCH.dimensions, SCENE)

const SVG_DOC = new DrawSVG({
  view_box: SWATCH,
})
SCENE.draw(SVG_DOC)

const converted = useTemplateRef('converted')

function download() {
  const file = encode_svg_file(SCENE, 'download.svg', SWATCH)
  download_file(file)
}

onMounted(() => {
  converted.value?.appendChild(SVG_DOC.root)
})
</script>

<template>
  <SketchP5 :sketch="sketch" />

  <div ref="converted"></div>
  <button @click="download">You wouldn't download an SVG file</button>
</template>
