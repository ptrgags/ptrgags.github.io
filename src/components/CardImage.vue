<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    url?: string,
    alt: string,
    size: 'thumbnail' | 'card'
    link?: string,
}>()

const img_url = computed(() => {
    if (props.url) {
        return props.url
    }

    // this is in public/assets
    return `/assets/placeholder-${props.size}.png`
})

const width = computed(() => {
    return props.size === 'thumbnail' ? 250 : 500;
})

const height = computed(() => {
    return props.size === 'thumbnail' ? 350 : 700;
})

function handle_error(event: Event) {
    const img = event.target as HTMLImageElement
    img.src = `/assets/placeholder-${props.size}.png`
}
</script>

<template>
    <a :href="props.link" :is="props.link ? 'a' : 'span'">
        <img :src="img_url" :width="width" :height="height" :alt="props.alt" @error="handle_error" />
    </a>
</template>