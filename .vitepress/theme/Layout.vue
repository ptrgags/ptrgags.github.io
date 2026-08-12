<script setup lang="ts">
import NavbarHeader from './NavbarHeader.vue'

import { useData } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
</script>

<template>
  <NavbarHeader />
  <div v-if="frontmatter.home">
    <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <ul>
      <li><a href="/markdown-examples.html">Markdown Examples</a></li>
      <li><a href="/api-examples.html">API Examples</a></li>
    </ul>
  </div>
  <div v-if="frontmatter.layout === 'project'">
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
  </div>
  <div v-else>
    <Content />
  </div>
</template>
