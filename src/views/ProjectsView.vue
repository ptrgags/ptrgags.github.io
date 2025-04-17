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
  <div class="one-column plaque">
    <h1 class="center-text">Projects</h1>
    <div class="horizontal">
      <template v-for="thumbnail in projects_newest_first" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
      </template>
    </div>

    <h2>Other Projects</h2>
    <p>
      Going further back in time, I have more projects not documented here. Here are links to some
      of the notable ones.
    </p>
    <ul>
      <li>
        Drawing Machines (2019) - <a href="https://ptrgags.dev/drawing-machines/">Demo</a>,
        <a href="https://github.com/ptrgags/drawing-machines">GitHub</a>
      </li>
      <li>
        Virtual Museum (2019) - <a href="https://museum.shaders.dev/">Demo</a>,
        <a href="https://github.com/ptrgags/virtual-museum">GitHub</a>
      </li>
      <li>
        Holiday Eyecandy (2018) - <a href="https://ptrgags.dev/holiday-eyecandy/">Demo</a>,
        <a href="https://github.com/ptrgags/holiday-eyecandy">GitHub</a>
      </li>
      <li>
        Ant Farm (2015) - <a href="https://ptrgags.dev/ant-farm/">Demo</a>,
        <a href="https://github.com/ptrgags/ant-farm">GitHub</a>
      </li>
    </ul>
    <p>
      For the full list of my programming projects, see my
      <a href="https://github.com/ptrgags?tab=repositories">GitHub repositories</a>.
    </p>
  </div>
</template>
