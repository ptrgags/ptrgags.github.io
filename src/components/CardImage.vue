<script setup lang="ts">
import { computed } from 'vue'
import MaybeLink from './MaybeLink.vue'
import type { Image } from '@/core/Image'

const props = defineProps<{
  image: Image
}>()

const size = computed(() => {
  return props.image.size ?? 'thumbnail'
})

const img_url = computed(() => {
  if (props.image.url) {
    return props.image.url
  }

  // this is in public/assets
  return `/assets/placeholder-${size.value}.png`
})

const alt_text = computed(() => {
  return props.image.alt_text ?? ''
})

function handle_error(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = `/assets/placeholder-${size.value}.png`
}
</script>

<template>
  <MaybeLink :url="props.image.link">
    <img :src="img_url" :alt="alt_text" @error="handle_error" />
  </MaybeLink>
</template>
