<script setup lang="ts">
    import ThumbnailCard from '@/components/ThumbnailCard.vue';
    import { PROJECTS_NEWEST_5, get_thumbnail_url, get_project_url } from '@/data/projects';
    import { ARTWORKS_NEWEST_5, get_thumbnail_url as art_thumbnail, get_artwork_url } from '@/data/artworks';
</script>

<template>
    <h1 class="centered">Recent Projects</h1>
    <div class="tableau">
        <template v-for="project in PROJECTS_NEWEST_5">
            <ThumbnailCard 
                v-if="project.show"
                :image="get_thumbnail_url(project)"
                :link="get_project_url(project)"
                :title="project.title"
                :years="project.years"
            />
        </template>
        
    </div>
    <h1 class="centered">Recent Artworks</h1>
    <div class="tableau">
        <template v-for="artwork in ARTWORKS_NEWEST_5">
            <ThumbnailCard
                v-if="artwork.show"
                :image="art_thumbnail(artwork)"
                :link="get_artwork_url(artwork)"
                :title="artwork.title"
                :years="artwork.date"
            />
        </template>
    </div>
</template>

<style>
    .centered {
        text-align: center;
    }

    .tableau {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>