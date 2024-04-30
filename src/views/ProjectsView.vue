<script setup lang="ts">
import { PROJECTS } from '@/data/projects'
import ThumbnailCard from '@/components/ThumbnailCard.vue'
import { type Thumbnail } from '@/core/Thumbnail'
import { computed } from 'vue'
import { sort_reverse_chronological } from '@/core/Sortable'
import { ALBUMS } from '@/data/music_albums'

const projects_newest_first = computed<Thumbnail[]>(() => {
  const projects = PROJECTS.map((x) => x.thumbnail)
  const albums = ALBUMS.map((x) => x.thumbnail)
  const all_projects = [...projects, ...albums]

  return all_projects.filter((x) => !x.hide).sort(sort_reverse_chronological)
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
