<script setup lang="ts">
const props = defineProps<{
  url?: string
}>()
</script>

<template>
  <RouterLink v-if="props.url" :to="props.url"><slot></slot></RouterLink>
  <span v-else><slot></slot></span>
</template>
