<script setup lang="ts">
import CardImage from '@/components/CardImage.vue'
import type { Thumbnail } from '@/core/Thumbnail'

const props = defineProps<{
  card: Thumbnail
}>()
</script>

<template>
  <div class="card-frame">
    <CardImage :image="props.card.thumbnail" />
    <div class="card-text centered">
      <RouterLink v-if="props.card.link" :to="props.card.link">{{ props.card.title }}</RouterLink>
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
