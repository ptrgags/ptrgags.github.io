<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import type { CenteredTrochoidParams } from './CenteredTrochoidParams.ts'
import { watch } from 'vue'
import { CenteredTrochoidScene } from './CenteredTrochoidScene.ts'
import { make_sketch } from '../../lib/p5-helpers/sketches.ts'

const props = defineProps<{
  params: CenteredTrochoidParams
}>()

const scene = new CenteredTrochoidScene()
const sketch = make_sketch(scene)

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
