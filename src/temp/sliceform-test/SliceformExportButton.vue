<script setup lang="ts">
import { sliceform_3d_print } from './sliceform-test.ts'
import { encode_svg_file } from '../../lib/svg/encode_svg.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { download_file } from '../../lib/dom/download_file.ts'

function download_single() {
  const PPI = 100
  const { primitive, dimensions } = sliceform_3d_print(PPI)
  console.log(dimensions)
  const file = encode_svg_file(primitive, 'sliceform-single.svg', Rect.from_dimensions(dimensions))
  download_file(file)
}
</script>

<template>
  <div class="vertical">
    <button @click="download_single">Export single SVG</button>
  </div>
</template>
