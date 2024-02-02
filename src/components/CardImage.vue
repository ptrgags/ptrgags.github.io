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

    return `@/assets/placeholder-${props.size}.png`
})
</script>

<template>
    <a :href="props.link ?? undefined">
        <img :src="img_url" :alt="props.alt" />
    </a>
</template>