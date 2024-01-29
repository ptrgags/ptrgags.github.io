<script setup lang="ts">
    import ThumbnailCard from '@/components/ThumbnailCard.vue';
    import { PROJECTS_NEWEST_5, get_thumbnail_url, get_project_url } from '@/data/projects';
</script>

<template>
    <h1>Recent Projects</h1>
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