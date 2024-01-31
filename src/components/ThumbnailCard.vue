<script setup lang="ts">
    const props = defineProps<{
        image: string,
        link: string,
        title: string,
        years: string
    }>()
</script>

<template>
    <div class="card">
        <div class="card-thumbnail">
            <img :src="props.image" />
        </div>
        <div class="card-text centered">
            <a :href="props.link">{{ props.title }}</a>
            <br />
            ({{ props.years }})
        </div>
    </div>
</template>

<style>
    .card {
        border: 1px solid white;
        border-radius: 4px;
        margin: 2px;
        display: inline-block;
    }

    .card-thumbnail {
        width: 250px;
        height: 350px;
        background-color: #222222;
    }

    .card-text {
        height: 40px;
        background-color: #111111;
    }
</style>