<script setup lang="ts">
import ThumbnailCard from '@/components/ThumbnailCard.vue'
import { PROJECTS } from '@/data/projects'
import { ARTWORKS } from '@/data/artworks'
import { computed } from 'vue'
import { reverse_chronological, type Thumbnail } from '@/core/Thumbnail'

function top_5_featured(thumbnails: Thumbnail[]): Thumbnail[] {
  const featured = thumbnails.filter((x) => x.featured).sort(reverse_chronological)
  const remaining = thumbnails.filter((x) => !x.featured).sort(reverse_chronological)

  // Take the top 5 entries.
  return [...featured, ...remaining].slice(0, 5)
}

const featured_artworks = computed<Thumbnail[]>(() => {
  const all_artworks = ARTWORKS.map((x) => x.thumbnail).filter((x) => !x.hide)
  return top_5_featured(all_artworks)
})

const featured_projects = computed<Thumbnail[]>(() => {
  const all_projects = PROJECTS.map((x) => x.thumbnail).filter((x) => !x.hide)
  return top_5_featured(all_projects)
})
</script>

<template>
  <h1 class="centered">Featured Projects</h1>
  <div class="tableau">
    <template v-for="thumbnail in featured_projects" :key="thumbnail.sort_key">
      <ThumbnailCard :card="thumbnail" />
    </template>
  </div>
  <h1 class="centered">Featured Artworks</h1>
  <div class="tableau">
    <template v-for="thumbnail in featured_artworks" :key="thumbnail.sort_key">
      <ThumbnailCard :card="thumbnail" />
    </template>
  </div>
</template>
