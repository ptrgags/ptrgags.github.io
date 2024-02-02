<script setup lang="ts">
import CardImage from '@/components/CardImage.vue'

const props = defineProps<{
    image_url?: string,
    link?: string,
    alt: string,
    title: string,
    years: string
}>()
</script>

<template>
    <div class="card-frame">
        <CardImage 
            size="thumbnail"
            alt="props.alt"
            :url="props.image_url"
            :link="props.link"
        />
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
        background-color: var(--background-text);

        /* Round the bottom */
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
</style>