<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Engine, type Machine } from '../lib/webgpu/Engine'
import type { Dimensionlike } from '../lib/primitives/Dimensionlike.ts'

const props = defineProps<{
  sketch: {
    machine: Machine
    dimensions: Dimensionlike
  }
  use_midi?: boolean
}>()

const renderer = computed(() => new Engine(props.sketch.machine, props.use_midi ?? false))
const dimensions = props.sketch.dimensions

onMounted(() => {
  renderer.value.main()
})
</script>

<template>
  <div class="vertical">
    <canvas id="webgpu-canvas" :width="dimensions.width" :height="dimensions.height"></canvas>
  </div>
</template>

<style scoped>
canvas {
  max-width: 80vw;
  object-fit: contain;
  margin: 0 auto;
}
</style>
