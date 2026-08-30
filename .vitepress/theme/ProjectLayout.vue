<script setup lang="ts">
import { Project, ProjectDescriptor } from '../../src/core/Project.ts'
import CardImage from '../../src/components/CardImage.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const project = new Project(frontmatter.value as ProjectDescriptor)
</script>

<template>
  <div class="vertical">
    <div class="horizontal">
      <div class="card-frame">
        <CardImage :image="project.card" />
      </div>
      <div class="plaque half-column">
        <h1>{{ frontmatter.title }} ({{ frontmatter.years }})</h1>
        <div class="horizontal">
          <a class="big-link" v-if="project.github_url" :href="project.github_url">GitHub</a>
          <a class="big-link" v-if="project.demo_url" :href="project.demo_url">Live Demo</a>
        </div>
        <Content />
      </div>
    </div>
    <div class="timeline-container">
      <!--TODO: Timeline-->
      <!--<ProjectTimeline :entries="timeline_entries" />-->
    </div>
  </div>
</template>
