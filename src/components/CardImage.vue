<script setup lang="ts">
import { computed } from 'vue';
import type MaybeLink from './MaybeLink.vue';

const props = defineProps<{
    url?: string,
    alt: string,
    size: 'thumbnail' | 'card'
    orientation?: 'portrait' | 'landscape'
    link?: string,
}>()

const img_url = computed(() => {
    if (props.url) {
        return props.url
    }

    // this is in public/assets
    return `/assets/placeholder-${props.size}.png`
})

function handle_error(event: Event) {
    const img = event.target as HTMLImageElement
    img.src = `/assets/placeholder-${props.size}.png`
}
</script>

<template>
    <MaybeLink :url="props.link">
        <img :src="img_url" :alt="props.alt" @error="handle_error" />
    </MaybeLink>
</template>