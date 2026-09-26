<script setup lang="ts">
import { CRS, map, Map as LeafletMap, rectangle, circle } from 'leaflet'
import { onMounted, ref, useTemplateRef, type Ref } from 'vue'

const container = useTemplateRef<HTMLDivElement>('container')

const test_map: Ref<LeafletMap | undefined> = ref(undefined)

onMounted(() => {
  if (container.value === null) {
    return
  }

  test_map.value = map(container.value, {
    crs: CRS.Simple,
    minZoom: -5,
  }).setView([100, 100], 0)

  circle([0, 0], { radius: 10 }).addTo(test_map.value)

  rectangle([
    // first corner
    [0, 0],
    // second corner
    [1000, 1000],
  ]).addTo(test_map.value)

  rectangle(
    [
      [0, -1000],
      [1000, 0],
    ],
    { color: '#ff0000' },
  ).addTo(test_map.value)
})
</script>

<template>
  <div id="map" ref="container"></div>
</template>

<style scoped>
#map {
  width: 256px;
  height: 256px;
}
</style>
