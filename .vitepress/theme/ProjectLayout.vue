<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="vertical">
    <div class="card-frame">
      <!-- <CardImage :image="project.card" />-->
    </div>
    <div class="plaque half-column">
      <h1>{{ frontmatter.title }} ({{ frontmatter.years }})</h1>
      <!-- TODO: Figure out how to compute the link addresses
        <a class="big-link" v-if="project.github_url" :href="project.github_url">GitHub</a>
        &nbsp;
        <a class="big-link" v-if="project.demo_url" :href="project.demo_url">Live Demo</a>
        -->
      <Content />
    </div>
    <div class="timeline-container">
      <!-- <ProjectTimeline :entries="timeline_entries" />-->
    </div>
  </div>
</template>
