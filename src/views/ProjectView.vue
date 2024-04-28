<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PROJECTS } from '@/data/projects'
import { ARTWORKS_BY_PROJECT } from '@/data/artworks'
import CardImage from '@/components/CardImage.vue'
import ProjectTimeline from '@/components/ProjectTimeline.vue'
import type { TimelineEntry } from '@/core/TimelineEntry'

const route = useRoute()

const project = computed(() => {
  return PROJECTS.find((x) => x.id == route.params.project_id)
})

const timeline_entries = computed(() => {
  if (!project.value) {
    return []
  }

  const artworks = ARTWORKS_BY_PROJECT[project.value.id] ?? []
  const artwork_entries: TimelineEntry[] = artworks.map((x) => x.to_timeline_entry())
  const update_entries: TimelineEntry[] = project.value.updates

  const newest_first = [...artwork_entries, ...update_entries].sort(
    (a: TimelineEntry, b: TimelineEntry) => b.sort_key.localeCompare(a.sort_key),
  )
  return newest_first
})
</script>

<template>
  <template v-if="project">
    <div class="tableau">
      <div class="card-frame">
        <CardImage :image="project.card_image" />
      </div>
      <div class="plaque">
        <h1>{{ project.title }} ({{ project.years }})</h1>
        <a class="big-link" v-if="project.github_url" :href="project.github_url">GitHub</a>
        &nbsp;
        <a class="big-link" v-if="project.demo_url" :href="project.demo_url">Demo</a>
        <div v-html="project.description"></div>
      </div>
    </div>
    <ProjectTimeline :entries="timeline_entries" />
  </template>
</template>
