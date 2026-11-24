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

  const layer = new DebugCoordsLayer({
    maxZoom: 3,
  })
  layer.addTo(map)

  const lat_axis = L.polyline(
    [
      [0, 0],
      [256, 0],
    ],
    {
      color: 'green',
    },
  )
  const lon_axis = L.polyline(
    [
      [0, 0],
      [0, 256],
    ],
    {
      color: 'red',
    },
  )
  const origin = L.circle([0, 0], { radius: 10 })
  const axes = L.layerGroup([lon_axis, lat_axis, origin])
  map.addLayer(axes)

  const bounds = L.rectangle([
    [0, 0],
    [256, 256],
  ])
  //map.addLayer(bounds)
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
