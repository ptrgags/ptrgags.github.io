<script setup lang="ts">
import { PROJECTS_NEWEST_FIRST } from '@/data/projects';
import ThumbnailCard from '@/components/ThumbnailCard.vue'
</script>

<template>
    <h1 class="centered">Projects</h1>
    <div class="tableau">
        <template v-for="project in PROJECTS_NEWEST_FIRST" :key="project.sort_key">
            <ThumbnailCard v-if="project.show" :image_url="project.thumbnail_url" :link="project.project_url"
                :alt="project.alt_text" :title="project.title" :years="project.years" />
        </template>
        <div class="plaque" v-show="true">
            <p>🚧 Curating old projects, check back later for more!</p>
            <p>For a list of my other programming projects, see my <a href="https://github.com/ptrgags?tab=repositories">GitHub repositories</a></p>
        </div>
    </div>
</template>
