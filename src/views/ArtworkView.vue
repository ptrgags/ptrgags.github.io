<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ARTWORKS } from '@/data/artworks'
import CardImage from '@/components/CardImage.vue'
import { PROJECTS } from '@/data/projects'

const route = useRoute()

const artwork = computed(() => {
  return ARTWORKS.find((x) => x.id == route.params.artwork_id)
})

const project = computed(() => {
  const project_id = artwork.value?.project_id
  return PROJECTS.find((x) => x.id === project_id)
})
</script>

<template>
  <div v-if="artwork" class="horizontal">
    <div class="card-frame">
      <CardImage :image="artwork.card" />
    </div>
    <div class="plaque half-column">
      <h1>{{ artwork.title }} ({{ artwork.date }})</h1>
      <h3 v-if="project">
        Project:
        <RouterLink class="big-link" :to="project.url">{{ project.title }}</RouterLink>
      </h3>
      <div v-html="artwork.description"></div>
    </div>
  </div>
</template>
