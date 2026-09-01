<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="plaque vertical">
    <h1>{{ frontmatter.title }}</h1>
    <Content />
  </div>
</template>
