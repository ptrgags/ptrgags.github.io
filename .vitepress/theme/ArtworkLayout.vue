<script setup lang="ts">
import { useData } from 'vitepress'
import CardImage from '../../src/components/CardImage.vue'
import { Artwork, type ArtworkDescriptor } from '../../src/core/Artwork.ts'
import { ALL_PROJECTS } from '../../src/data/page_indices.ts'

const { frontmatter } = useData()

const artwork = new Artwork(frontmatter.value as ArtworkDescriptor)
const project = ALL_PROJECTS.find((x) => x.id === artwork.project_id)
if (project === undefined) {
  console.log(frontmatter.value)
  throw new Error(`missing project id ${frontmatter.value}`)
}
</script>

<template>
  <div class="horizontal">
    <div class="card-frame">
      <CardImage :image="artwork.card" />
    </div>
    <div class="plaque half-column">
      <h1>{{ artwork.title }} ({{ artwork.date }})</h1>
      <div class="horizontal justify-left">
        <span class="big">Project:</span>
        <a class="big-link" :href="project.url">{{ project.title }}</a>
      </div>

      <div
        v-if="artwork.demo_url || artwork.bluesky_thread"
        class="horizontal justify-left space-before"
      >
        <span class="big">Links:</span>
        <a class="big-link" v-if="artwork.demo_url" :href="artwork.demo_url">Live Demo</a>
        <a class="big-link" v-if="artwork.bluesky_thread" :href="artwork.bluesky_thread"
          >Bluesky Thread</a
        >
      </div>
      <Content />
    </div>
  </div>
</template>
