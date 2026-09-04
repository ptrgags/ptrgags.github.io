<script setup lang="ts">
import type p5 from 'p5'
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps<{
  sketch(p: p5): void
}>()

const sketch_container: Ref<HTMLElement | null> = ref(null)

let wrapped_sketch: p5
onMounted(async () => {
  const p5 = await import('p5')
  p5.default.disableFriendlyErrors = true

  if (sketch_container.value) {
    wrapped_sketch = new p5.default(props.sketch, sketch_container.value)
  }
})
</script>

<template>
  <div id="sketch" ref="sketch_container" class="vertical"></div>
</template>
