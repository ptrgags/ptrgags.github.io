<script setup lang="ts">
import { backblaze_link } from '../core/links.ts'

interface PageData {
  url: string
  frontmatter: any
}

const props = defineProps<{
  page: PageData
}>()

const page = props.page
const frontmatter = page.frontmatter
const title = frontmatter.title ?? 'MISSING TITLE'
const status = frontmatter.status ?? 'stub'
const thumbnail_url = frontmatter.thumbnail ?? ''
</script>

<template>
  <div class="pattern-card horizontal justify-left">
    <img width="256" height="256" :src="backblaze_link(thumbnail_url)" />
    <div class="text">
      <h2 v-if="status !== 'stub'">
        <span v-if="status === 'partial'"">🚧</span><a :href="page.url">{{ title }}</a>
      </h2>
      <h2 v-else>
        {{ title }}
      </h2>
      <p>lorem ipsum</p>
    </div>
  </div>
</template>

<style>
.pattern-card {
  background-color: var(--color-main-med-dark);
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 20px;
}
</style>
