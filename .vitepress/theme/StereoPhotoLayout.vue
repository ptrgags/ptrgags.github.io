<script setup lang="ts">
import StereoCard from '../../src/components/StereoCard.vue'
import { useData } from 'vitepress'
import type { ArtworkDescriptor } from '../../src/core/Artwork'
import { StereoPairArtwork } from '../../src/core/StereoPairArtwork'
import { data as ALL_PROJECTS } from '../../src/project/project.data'
import { Project, type ProjectDescriptor } from '../../src/core/Project.ts'

const { frontmatter } = useData()

const artwork = new StereoPairArtwork(frontmatter.value as ArtworkDescriptor)
const project = ALL_PROJECTS.map((x) => new Project(x.frontmatter as ProjectDescriptor)).find(
  (x) => x.id === artwork.project_id,
)
</script>

<template>
  <div class="vertical">
    <div v-if="artwork" class="plaque">
      <h1 class="center-text">{{ artwork.title }} ({{ artwork.date }})</h1>
      <div class="horizontal">
        <h2>Project</h2>
        <a class="big-link" :href="project.url">{{ project.title }}</a>
      </div>
      <StereoCard
        :left_eye="artwork.left_card_url"
        :right_eye="artwork.right_card_url"
      ></StereoCard>
      <div v-html="artwork.description" class="narrow-column"></div>
    </div>
  </div>
</template>

<style scoped>
.narrow-column {
  width: 800px;
  max-width: 70vw;
  margin: 0 auto;
}
</style>
