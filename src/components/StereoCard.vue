<script setup lang="ts">
import p5 from 'p5'
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps<{ left_eye: string; right_eye: string }>()

const CARD_WIDTH = 500
const CARD_HEIGHT = 700

class StereoSketch {
  left_eye_url: string
  right_eye_url: string

  constructor(left_eye_url: string, right_eye_url: string) {
    this.left_eye_url = left_eye_url
    this.right_eye_url = right_eye_url
  }

  make_anaglyph(p: p5, left_eye: p5.Image, right_eye: p5.Image): p5.Image {
    const image = p.createImage(CARD_WIDTH, CARD_HEIGHT)
    image.loadPixels()
    left_eye.loadPixels()
    right_eye.loadPixels()

    // TODO: Compute the anaglyph

    image.updatePixels()
    return image
  }

  draw_parallel(p: p5, left_eye: p5.Image, right_eye: p5.Image) {
    p.image(left_eye, 0, 0, CARD_WIDTH, CARD_HEIGHT)
    p.image(right_eye, CARD_WIDTH, 0, CARD_WIDTH, CARD_HEIGHT)
  }

  draw_cross_eyed(p: p5, left_eye: p5.Image, right_eye: p5.Image) {
    p.image(right_eye, 0, 0, CARD_WIDTH, CARD_HEIGHT)
    p.image(left_eye, CARD_WIDTH, 0, CARD_WIDTH, CARD_HEIGHT)
  }

  wrap(parent: HTMLElement) {
    const sketch = (p: p5) => {
      let left_eye: p5.Image
      let right_eye: p5.Image
      //let anaglyph: p5.Image

      p.preload = () => {
        left_eye = p.loadImage(this.left_eye_url)
        right_eye = p.loadImage(this.right_eye_url)
      }

      p.setup = () => {
        p.createCanvas(2 * CARD_WIDTH, CARD_HEIGHT)
        //anaglyph = this.make_anaglyph(p, left_eye, right_eye)
      }

      p.draw = () => {
        p.background(0)
        this.draw_cross_eyed(p, left_eye, right_eye)
      }
    }
    return new p5(sketch, parent)
  }
}

const viewer: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  if (viewer.value) {
    const stereo_sketch = new StereoSketch(props.left_eye, props.right_eye)
    stereo_sketch.wrap(viewer.value)
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

<style>
.viewer {
  width: 80vw;
  padding: 0;
}

canvas {
  object-fit: contain;
  max-width: 80vw;
}
</style>
