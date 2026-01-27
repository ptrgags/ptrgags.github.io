<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PROJECTS } from '@/data/projects'
import { ARTWORKS_BY_PROJECT } from '@/data/artworks'
import CardImage from '@/components/CardImage.vue'
import ProjectTimeline from '@/components/ProjectTimeline.vue'
import type { TimelineEntry } from '@/core/TimelineEntry'
import { sort_reverse_chronological } from '@/core/Sortable'
import { STEREO_ARTWORKS_BY_PROJECT } from '@/data/stereo_cards'

const route = useRoute()

const project = computed(() => {
  return PROJECTS.find((x) => x.id == route.params.project_id)
})

const timeline_entries = computed(() => {
  if (!project.value) {
    return []
  }

  const artworks = ARTWORKS_BY_PROJECT[project.value.id] ?? []
  const artwork_entries: TimelineEntry[] = artworks.map((x) => x.timeline_entry)

  const stereo_artworks = STEREO_ARTWORKS_BY_PROJECT[project.value.id] ?? []
  const stereo_entries: TimelineEntry[] = stereo_artworks.map((x) => x.timeline_entry)
  const update_entries: TimelineEntry[] = project.value.updates

  const newest_first = [...artwork_entries, ...stereo_entries, ...update_entries].sort(
    sort_reverse_chronological,
  )
  return newest_first
})
</script>

<template>
  <template v-if="project">
    <div class="vertical">
      <div class="horizontal">
        <div class="card-frame">
          <CardImage :image="project.card" />
        </div>
        <div class="plaque half-column">
          <h1>{{ project.title }} ({{ project.years }})</h1>
          <a class="big-link" v-if="project.github_url" :href="project.github_url">GitHub</a>
          &nbsp;
          <a class="big-link" v-if="project.demo_url" :href="project.demo_url">Live Demo</a>
          <div v-html="project.description"></div>
        </div>
      </div>
      <div class="timeline-container">
        <ProjectTimeline :entries="timeline_entries" />
      </div>
    </div>
  </template>
</template>

<style scoped>
.timeline-container {
  width: 2000px;
  max-width: 90vw;
}
</style>
