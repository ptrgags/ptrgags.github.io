<script setup lang="ts">
import CardImage from './CardImage.vue'
import type { Thumbnail } from '../core/Thumbnail.ts'

const props = defineProps<{
  card: Thumbnail
}>()
</script>

<template>
  <div class="card-frame">
    <CardImage :image="props.card.thumbnail" />
    <div class="card-text center-text">
      <a v-if="props.card.link" :href="props.card.link">{{ props.card.title }}</a>
      <span v-else>{{ props.card.title }}</span>
      <br />
      ({{ props.card.dates }})
    </div>
  </div>
</template>

<style>
.card-text {
  height: 40px;
  background-color: var(--background-text);

  /* Round the bottom */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  padding: 4px;
}
</style>
