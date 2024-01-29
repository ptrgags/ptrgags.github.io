<script setup lang="ts">
    import { type Project, PROJECTS_NEWEST_FIRST, get_thumbnail_url } from '@/data/projects';
    import ThumbnailCard from '@/components/ThumbnailCard.vue'

    function get_project_url(project: Project) {
        return `/project/${project.github_repo_name}`
    }
</script>

<template>
    <h1 class="centered">Projects</h1>
    <div class="tableau">
        <template v-for="project in PROJECTS_NEWEST_FIRST">
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