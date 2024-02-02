<script setup lang="ts">
import { PROJECTS_NEWEST_FIRST } from '@/data/projects';
import ThumbnailCard from '@/components/ThumbnailCard.vue'
</script>

<template>
    <h1 class="centered">Projects</h1>
    <div class="tableau">
        <template v-for="project in PROJECTS_NEWEST_FIRST">
            <ThumbnailCard 
                v-if="project.show"
                :image="project.thumbnail_url"
                :link="project.project_url"
                :alt="project.alt_text"
                :title="project.title"
                :years="project.years"
            />
        </template>
    </div>
</template>