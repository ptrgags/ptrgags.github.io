<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import type { CenteredTrochoidParams } from './CenteredTrochoidParams.ts'
import { watch } from 'vue'
import { CenteredTrochoidScene } from './CenteredTrochoidScene.ts'
import { make_sketch } from '../../lib/p5-helpers/sketches.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'

const props = defineProps<{
  params: CenteredTrochoidParams
}>()

const canvas_size = new Direction2P(512, 256)
const scene = new CenteredTrochoidScene()
const sketch = make_sketch(canvas_size, scene)

watch(
  () => props.params,
  (params) => {
    scene.set_params(params)
  },
  { deep: true },
)
</script>

<template>
  <SketchP5 :sketch="sketch" />
</template>
