<script setup lang="ts">
import { PROJECTS } from '@/data/projects'
import ThumbnailCard from '@/components/ThumbnailCard.vue'
import { type Thumbnail } from '@/core/Thumbnail'
import { computed } from 'vue'
import { sort_reverse_chronological } from '@/core/Sortable'

const projects_newest_first = computed<Thumbnail[]>(() => {
  return PROJECTS.map((x) => x.thumbnail)
    .filter((x) => !x.hide)
    .sort(sort_reverse_chronological)
})
</script>

<template>
  <h1 class="centered">Projects</h1>
  <div class="tableau">
    <template v-for="thumbnail in projects_newest_first" :key="thumbnail.sort_key">
      <ThumbnailCard :card="thumbnail" />
    </template>
    <div class="plaque" v-show="true">
      <p>🚧 Curating old projects, check back later for more!</p>
      <p>
        For a list of my other programming projects, see my
        <a href="https://github.com/ptrgags?tab=repositories">GitHub repositories</a>
      </p>
    </div>
  </div>
</template>
