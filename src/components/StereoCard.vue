<script setup lang="ts">
import p5 from 'p5'
import { onMounted, ref, type Ref } from 'vue'

const sketch = (p: p5) => {
  p.setup = () => {
    // two cards wide
    p.createCanvas(1000, 700)
  }

  p.draw = () => {
    p.background(0)
  }
}

const viewer: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  if (viewer.value) {
    new p5(sketch, viewer.value)
  }
})
</script>

<template>
  <div class="viewer" ref="viewer"></div>
  <button>2D</button>
  <button>Cross-eyed 3D</button>
  <button>Parallel 3D</button>
  <button>Anaglyph 3D</button>
</template>

<style scoped>
.viewer {
  width: 80vw;
  padding: 0;
}

canvas {
  margin: 0 auto;
}
</style>
