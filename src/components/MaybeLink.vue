<script setup lang="ts">
const props = defineProps<{
    url?: string
}>()
</script>

<template>
    <a v-if="props.url" :href="props.url"><slot></slot></a>
    <span v-else><slot></slot></span>
</template>