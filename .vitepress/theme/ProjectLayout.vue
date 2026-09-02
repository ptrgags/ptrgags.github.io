<script setup lang="ts">
import { Project, type ProjectDescriptor } from '../../src/core/Project'
import CardImage from '../../src/components/CardImage.vue'
import ProjectTimeline from '../../src/components/ProjectTimeline.vue'
import { useData } from 'vitepress'
import { ALL_ARTWORKS, ALL_STEREO_PAIRS } from '../../src/data/page_indices.ts'
import { sort_reverse_chronological } from '../../src/core/Sortable'

const { frontmatter } = useData()
const project = new Project(frontmatter.value as ProjectDescriptor)

const artworks = ALL_ARTWORKS.filter((x) => x.project_id === project.id)
const stereo_pairs = ALL_STEREO_PAIRS.filter((x) => x.project_id === project.id)

const artwork_entries = artworks.map((x) => x.timeline_entry)
const stereo_entries = stereo_pairs.map((x) => x.timeline_entry)

const updates = project.updates

const timeline_entries = [...artwork_entries, ...stereo_entries, ...updates].sort(
  sort_reverse_chronological,
)
</script>

<template>
  <div class="vertical">
    <div class="horizontal">
      <div class="card-frame">
        <CardImage :image="project.card" />
      </div>
      <div class="plaque half-column">
        <h1>{{ frontmatter.title }} ({{ frontmatter.years }})</h1>
        <div class="horizontal">
          <a class="big-link" v-if="project.github_url" :href="project.github_url">GitHub</a>
          <a class="big-link" v-if="project.demo_url" :href="project.demo_url">Live Demo</a>
        </div>
        <Content />
      </div>
    </div>
    <div class="timeline-container">
      <ProjectTimeline :entries="timeline_entries" />
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  width: 2000px;
  max-width: 90vw;
}
</style>
