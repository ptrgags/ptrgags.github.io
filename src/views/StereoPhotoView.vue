<script setup lang="ts">
import StereoCard from '@/components/StereoCard.vue'
import { PROJECTS } from '@/data/projects'
import { STEREO_ARTWORKS } from '@/data/stereo_cards'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const artwork = computed(() => {
  return STEREO_ARTWORKS.find((x) => x.id == route.params.artwork_id)
})

const project = computed(() => {
  const project_id = artwork.value?.project_id
  return PROJECTS.find((x) => x.id === project_id)
})
</script>

<template>
  <div v-if="artwork" class="plaque">
    <h1 class="center-text">{{ artwork.title }} ({{ artwork.date }})</h1>
    <h3 v-if="project">
      Project:
      <RouterLink class="big-link" :to="project.url">{{ project.title }}</RouterLink>
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
