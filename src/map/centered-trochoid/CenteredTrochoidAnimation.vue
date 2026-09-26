<script setup lang="ts">
import type p5 from 'p5'
import SketchP5 from '../../components/SketchP5.vue'
import type { CenteredTrochoidParams } from './CenteredTrochoidParams.ts'
import { watch } from 'vue'

const props = defineProps<{
  params: CenteredTrochoidParams
}>()

function animation(p: p5) {
  p.setup = () => {
    p.createCanvas(512, 256)
    p.pixelDensity(1)
  }

  p.draw = () => {
    p.background(0)

    // large circle
    const R = 64
    const CENTER = { x: 256, y: 128 }

    p.stroke(255)
    p.noFill()
    p.circle(CENTER.x, CENTER.y, 2 * R)

    // small circle
    const r = props.params.radius_small_circle * R
    p.circle(CENTER.x + R + r, CENTER.y, 2 * r)

    // Pen for trace
    const PEN_RADIUS = 2
    const pen = props.params.radius_pen * r
    p.stroke(127, 127, 255)
    p.circle(CENTER.x + R + r + pen, CENTER.y, 2 * PEN_RADIUS)
  }
}
</script>

<template>
  <SketchP5 :sketch="animation" />
</template>
