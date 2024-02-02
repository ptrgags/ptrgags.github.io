<script setup lang="ts">
    const props = defineProps<{
        image: string,
        link: string,
        title: string,
        years: string
    }>()
</script>

<template>
    <div class="card-frame">
        <img :src="props.image" />
        <div class="card-text centered">
            <a :href="props.link">{{ props.title }}</a>
            <br />
            ({{ props.years }})
        </div>
    </div>
</template>

<style>
    .card-text {
        height: 40px;
        background-color: #111111;

        /* Round the bottom */
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
</style>