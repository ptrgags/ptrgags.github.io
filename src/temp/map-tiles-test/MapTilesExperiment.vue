<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { DebugCoordsLayer } from './DebugCoordsLayer.ts'

const container = useTemplateRef<HTMLDivElement>('container')

onMounted(async () => {
  const L = await import('leaflet')
  if (container.value === null) {
    return
  }

  const map = L.map(container.value, {
    crs: L.CRS.Simple,
    center: [0, 0],
    zoom: 0,
  })

  const layer = new DebugCoordsLayer()
  layer.addTo(map)

  /*
  const bounds = L.rectangle([
    [0, 0],
    [1000, 1000],
  ])
  map.addLayer(bounds)
  */
})
</script>

<template>
  <div id="map" ref="container"></div>
</template>

<style scoped>
#map {
  width: 512px;
  height: 512px;
}
</style>
