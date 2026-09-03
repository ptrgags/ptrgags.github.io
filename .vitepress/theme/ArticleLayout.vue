<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="vertical">
    <div class="one-column plaque vertical">
      <h1>{{ frontmatter.title }}</h1>
      <Content />
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 0;
}
</style>
