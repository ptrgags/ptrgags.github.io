<script setup lang="ts">
    import { PROJECTS_NEWEST_FIRST } from '@/data/projects';
</script>

<template>
    <h1 class="centered">Projects</h1>
    <div class="tableau">
        <template v-for="project in PROJECTS_NEWEST_FIRST">
            <div v-if="project.show" class="card">
                <div class="card-thumbnail"></div>
                <div class="card-text centered">
                    <a :href="`/project/${project.github_repo_name}`">{{ project.title }}</a>
                    <br />
                    ({{ project.years }})
                </div>
            </div>
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

    .card {
        border: 1px solid white;
        border-radius: 4px;
        margin: 2px;
        display: inline-block;
    }

    .card-thumbnail {
        background-image: url("https://placekitten.com/250/350");
        width: 250px;
        height: 350px;
        background-color: #222222;
    }

    .card-text {
        height: 40px;
        background-color: #111111;
    }
</style>