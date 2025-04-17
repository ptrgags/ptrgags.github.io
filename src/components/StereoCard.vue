<script setup lang="ts">
import p5 from 'p5'
import { watch, onMounted, ref, type Ref } from 'vue'

const props = defineProps<{ left_eye: string; right_eye: string }>()

const CARD_WIDTH = 500
const CARD_HEIGHT = 700

enum StereoMode {
  NO_3D,
  CROSS_EYED,
  PARALLEL,
  ANAGLYPH,
}

const stereo_mode = ref<StereoMode>(StereoMode.CROSS_EYED)

const RGBA_COMPONENTS = 4

function extract_pixels(pixels, pixel_offset) {
  const red = pixels[pixel_offset]
  const green = pixels[pixel_offset + 1]
  const blue = pixels[pixel_offset + 2]
  return [red, green, blue]
}

const GAMMA_TO_LINEAR = 2.2
const GAMMA_TO_SRGB = 1 / GAMMA_TO_LINEAR
function compute_lightness(srgb: [number, number, number]) {
  const [sr, sg, sb] = srgb
  const sr_norm = sr / 255.0
  const sg_norm = sg / 255.0
  const sb_norm = sb / 255.0

  // Approximation for actual gamma expansion
  const r_linear = Math.pow(sr_norm, GAMMA_TO_LINEAR)
  const g_linear = Math.pow(sg_norm, GAMMA_TO_LINEAR)
  const b_linear = Math.pow(sb_norm, GAMMA_TO_LINEAR)

  // CIE luminance
  // See https://en.wikipedia.org/wiki/Grayscale#Colorimetric_(perceptual_luminance-preserving)_conversion_to_grayscale
  const lightness_linear = 0.2126 * r_linear + 0.7152 * g_linear + 0.0722 * b_linear

  const lightness_srgb = Math.pow(lightness_linear, GAMMA_TO_SRGB)
  return lightness_srgb * 255.0
}

/**
 * Draw a single image to the canvas
 * @param p The p5 drawing canvas
 * @param either_eye The image to draw
 */
function draw_single(p: p5, either_eye: p5.Image) {
  p.image(either_eye, CARD_WIDTH / 2, 0, CARD_WIDTH, CARD_HEIGHT)
}

/**
 * Draw a single image to the canvas
 * @param p The p5 drawing canvas
 * @param left The image to appear on the left
 * @param right The image to appear on the right
 */
function draw_pair(p: p5, left: p5.Image, right: p5.Image) {
  p.image(left, 0, 0, CARD_WIDTH, CARD_HEIGHT)
  p.image(right, CARD_WIDTH, 0, CARD_WIDTH, CARD_HEIGHT)
}

class StereoSketch {
  left_eye_url: string
  right_eye_url: string
  mode: StereoMode

  constructor(left_eye_url: string, right_eye_url: string, initial_mode: StereoMode) {
    this.left_eye_url = left_eye_url
    this.right_eye_url = right_eye_url
    this.mode = initial_mode
  }

  make_anaglyph(p: p5, left_eye: p5.Image, right_eye: p5.Image): p5.Image {
    const image = p.createImage(CARD_WIDTH, CARD_HEIGHT)
    image.loadPixels()
    left_eye.loadPixels()
    right_eye.loadPixels()

    for (let i = 0; i < CARD_HEIGHT; i++) {
      for (let j = 0; j < CARD_WIDTH; j++) {
        const pixel_offset = (i * CARD_WIDTH + j) * RGBA_COMPONENTS
        const left_srgb = extract_pixels(left_eye.pixels, pixel_offset)
        const right_srgb = extract_pixels(right_eye.pixels, pixel_offset)

        const left_lightness = compute_lightness(left_srgb)
        const right_lightness = compute_lightness(right_srgb)

        image.pixels[pixel_offset] = left_lightness
        image.pixels[pixel_offset + 1] = right_lightness
        image.pixels[pixel_offset + 2] = right_lightness
        image.pixels[pixel_offset + 3] = 255
      }
    }

    image.updatePixels()
    return image
  }

  wrap(parent: HTMLElement) {
    const sketch = (p: p5) => {
      let left_eye: p5.Image
      let right_eye: p5.Image
      let anaglyph: p5.Image

      p.preload = () => {
        left_eye = p.loadImage(this.left_eye_url)
        right_eye = p.loadImage(this.right_eye_url)
      }

      p.setup = () => {
        p.createCanvas(2 * CARD_WIDTH, CARD_HEIGHT)
        anaglyph = this.make_anaglyph(p, left_eye, right_eye)
      }

      p.draw = () => {
        p.background(0)

        switch (this.mode) {
          case StereoMode.NO_3D:
            // Either eye would work here, I choose the left eye
            draw_single(p, left_eye)
            break
          case StereoMode.PARALLEL:
            draw_pair(p, left_eye, right_eye)
            break
          case StereoMode.CROSS_EYED:
            // Same thing as parallel but with images swapped
            draw_pair(p, right_eye, left_eye)
            break
          case StereoMode.ANAGLYPH:
            draw_single(p, anaglyph)
            break
        }
      }
    }
    return new p5(sketch, parent)
  }
}

const viewer: Ref<HTMLElement | null> = ref(null)

let stereo_sketch: StereoSketch
onMounted(() => {
  if (viewer.value) {
    stereo_sketch = new StereoSketch(props.left_eye, props.right_eye, stereo_mode.value)
    stereo_sketch.wrap(viewer.value)
  }
})

watch(stereo_mode, (value) => {
  stereo_sketch.mode = value
})
</script>

<template>
  <div class="viewer" ref="viewer"></div>
  <div class="horizontal">
    <div class="padded">
      <input
        type="radio"
        v-model="stereo_mode"
        :value="StereoMode.CROSS_EYED"
        id="opt-cross-eyed"
      />
      <label for="opt-cross-eyed">Cross-eyed 3D</label>
    </div>
    <div class="padded">
      <input type="radio" v-model="stereo_mode" :value="StereoMode.PARALLEL" id="opt-parallel" />
      <label for="opt-parallel">Parallel 3D</label>
    </div>
    <div class="padded">
      <input type="radio" v-model="stereo_mode" :value="StereoMode.ANAGLYPH" id="opt-anaglyph" />
      <label for="opt-anaglyph">Anaglyph</label>
    </div>
    <div class="padded">
      <input type="radio" v-model="stereo_mode" :value="StereoMode.NO_3D" id="opt-2d" />
      <label for="opt-2d">2D</label>
    </div>
  </div>
  <details>
    <summary>Expand for viewing instructions</summary>
    <dl>
      <dt>Cross-eyed 3D</dt>
      <dd>Cross your eyes to overlap the two images.</dd>
      <dt>Parallel 3D</dt>
      <dd>
        Relax your eyes, and you'll start to see the images overlap. Keep moving your eyes in the
        same direction and eventually the two will overlap. I find this easiest on smaller screens,
        so try shrinking your browser window or try on a mobile device.
      </dd>
      <dt>Anaglyph 3D</dt>
      <dd>This mode requires wearing red/cyan 3D glasses.</dd>
      <dt>2D</dt>
      <dd>A regular image. No special viewing technique is required.</dd>
    </dl>
    <p></p>
  </details>
</template>

<style>
/** The canvas is created dynamically, so a scoped block won't affect it */
canvas {
  object-fit: contain;
  max-width: 80vw;
}
</style>

<style scoped>
.viewer {
  width: 100%;
  padding: 0;
}

details {
  padding: 20px;
  max-width: 800px;
}

dt {
  color: var(--color-accent);
  font-weight: bold;
}

.padded {
  margin: 10px;
}

button {
  background-color: var(--background-color-dark);
  color: var(--color-text);
  padding: 10px;
  border-radius: 5px;
}
</style>
