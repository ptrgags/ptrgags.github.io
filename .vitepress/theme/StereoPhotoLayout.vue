<script setup lang="ts">
import StereoCard from '../../src/components/StereoCard.vue'
import { useData } from 'vitepress'
import { Artwork } from '../../src/core/Artwork'
import { data as ALL_PROJECTS } from '../../src/project/project.data'

const { frontmatter } = useData()

const artwork = new Artwork(frontmatter as ArtworkDescriptor)

const project = ALL_PROJECTS.find((x) => x.id === artwork.project_id)
</script>

<template>
  <div v-if="artwork" class="plaque">
    <h1 class="center-text">{{ artwork.title }} ({{ artwork.date }})</h1>
    <h3 v-if="project">
      Project:
      <a class="big-link" :href="project.url">{{ project.title }}</a>
    </h3>
    <StereoCard :left_eye="artwork.left_card_url" :right_eye="artwork.right_card_url"></StereoCard>
    <div v-html="artwork.description" class="narrow-column"></div>
  </div>
</template>

<style scoped>
.narrow-column {
  width: 800px;
  max-width: 70vw;
  margin: 0 auto;
}
</style>
