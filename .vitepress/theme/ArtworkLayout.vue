<script setup lang="ts">
import { useData } from 'vitepress'
import CardImage from '../../src/components/CardImage.vue'
import { BACKBLAZE_BUCKET } from '../../src/core/website_constants'
import { Image } from '../../src/core/Image'

const { frontmatter } = useData()

const fm = frontmatter.value

const card: Image = {
  url: `${BACKBLAZE_BUCKET}/artwork-cards/${fm.project_id}/${fm.id}.${fm.img_format}`,
  size: 'card',
}
</script>

<template>
  <div class="horizontal">
    <div class="card-frame">
      <CardImage :image="card" />
    </div>
    <div class="plaque half-column">
      <h1>{{ frontmatter.title }} ({{ frontmatter.year }})</h1>
      <Content />
    </div>
  </div>
</template>
