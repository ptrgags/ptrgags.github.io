<script setup lang="ts">
import { ARTWORKS } from '@/data/artworks'
import ThumbnailCard from '@/components/ThumbnailCard.vue'
import { computed } from 'vue'
import { type Thumbnail } from '@/core/Thumbnail'
import { sort_reverse_chronological } from '@/core/Sortable'

const artworks_newest_first = computed<Thumbnail[]>(() => {
  return ARTWORKS.map((x) => x.thumbnail)
    .filter((x) => !x.hide)
    .sort(sort_reverse_chronological)
})
</script>

<template>
  <h1 class="center-text">Gallery</h1>
  <div class="horizontal">
    <template v-for="thumbnail in artworks_newest_first" :key="thumbnail.sort_key">
      <ThumbnailCard :card="thumbnail" />
    </template>
  </div>
</template>
