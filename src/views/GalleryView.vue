<script setup lang="ts">
import { ARTWORKS } from '@/data/artworks'
import ThumbnailCard from '@/components/ThumbnailCard.vue'
import { computed } from 'vue'
import { type Thumbnail } from '@/core/Thumbnail'
import { sort_reverse_chronological } from '@/core/Sortable'
import { STEREO_ARTWORKS } from '@/data/stereo_cards'

const artworks_newest_first = computed<Thumbnail[]>(() => {
  const artworks = ARTWORKS.map((x) => x.thumbnail)
  const stereo_artworks = STEREO_ARTWORKS.map((x) => x.thumbnail)
  const all_artworks = [...artworks, ...stereo_artworks]

  return all_artworks.filter((x) => !x.hide).sort(sort_reverse_chronological)
})
</script>

<template>
  <div class="one-column plaque">
    <h1 class="center-text">Gallery</h1>
    <div class="horizontal">
      <template v-for="thumbnail in artworks_newest_first" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
      </template>
    </div>
  </div>
</template>
