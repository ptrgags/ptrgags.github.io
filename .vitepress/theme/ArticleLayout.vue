<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="vertical">
    <div class="content vertical">
      <h1>{{ frontmatter.title }}</h1>
      <Content />
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 0;
  color: var(--color-accent2-light);
}

@media screen and (width >= 800px) {
  .content {
    max-width: 50vw;
  }
}
</style>
