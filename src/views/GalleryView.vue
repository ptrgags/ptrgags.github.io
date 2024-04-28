<script setup lang="ts">
import { ARTWORKS } from '@/data/artworks'
import ThumbnailCard from '@/components/ThumbnailCard.vue'
import { computed } from 'vue'
import { reverse_chronological, type Thumbnail } from '@/core/Thumbnail'

const artworks_newest_first = computed<Thumbnail[]>(() => {
  return ARTWORKS.map((x) => x.thumbnail)
    .filter((x) => !x.hide)
    .sort(reverse_chronological)
})
</script>

<template>
  <h1 class="centered">Gallery</h1>
  <div class="tableau">
    <template v-for="thumbnail in artworks_newest_first" :key="thumbnail.sort_key">
      <ThumbnailCard :card="thumbnail" />
    </template>
    <div class="plaque" v-show="true">🚧 Curating old artworks, check back later for more!</div>
  </div>
</template>
