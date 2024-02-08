<script setup lang="ts">
    import ThumbnailCard from '@/components/ThumbnailCard.vue';
    import { PROJECTS_NEWEST_5 } from '@/data/projects';
    import { ARTWORKS_NEWEST_5 } from '@/data/artworks';
</script>

<template>
    <h1 class="centered">Recent Projects</h1>
    <div class="tableau">
        <template v-for="project in PROJECTS_NEWEST_5" :key="project.id">
            <ThumbnailCard 
                v-if="project.show"
                :image_url="project.thumbnail_url"
                :alt="project.alt_text"
                :link="project.project_url"
                :title="project.title"
                :years="project.years"
            />
        </template>
        
    </div>
    <h1 class="centered">Recent Artworks</h1>
    <div class="tableau">
        <template v-for="artwork in ARTWORKS_NEWEST_5" :key="artwork.id">
            <ThumbnailCard
                v-if="artwork.show"
                :image_url="artwork.thumbnail_url"
                :alt="artwork.alt_text"
                :link="artwork.artwork_url"
                :title="artwork.title"
                :years="artwork.date"
            />
        </template>
    </div>
</template>