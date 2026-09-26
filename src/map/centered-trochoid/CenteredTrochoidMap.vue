<script setup lang="ts">
import { CRS, map, Map as LeafletMap, rectangle, circle, marker, popup } from 'leaflet'
import { onMounted, ref, useTemplateRef, type Ref } from 'vue'

const container = useTemplateRef<HTMLDivElement>('container')

const test_map: Ref<LeafletMap | undefined> = ref(undefined)

function format_percent(val: number): string {
  const percent = 100 * val
  return `${percent.toFixed(0)}%`
}

onMounted(() => {
  if (container.value === null) {
    return
  }

  const param_map = map(container.value, {
    crs: CRS.Simple,
    minZoom: -5,
  }).setView([500, 0], -2)

  test_map.value = param_map

  circle([0, 0], { radius: 10 }).addTo(param_map)

  rectangle([
    // first corner
    [0, 0],
    // second corner
    [1000, 1000],
  ]).addTo(param_map)

  rectangle(
    [
      [0, -1000],
      [1000, 0],
    ],
    { color: '#ff0000' },
  ).addTo(param_map)

  // need to investigate 404 error on marker image... maybe make my own?
  marker([100, 100]).addTo(param_map).bindPopup('Landmark')

  const clicked_popup = popup()

  param_map.on('click', (e) => {
    const { lat: y, lng: x } = e.latlng

    const r_percent = x / 1000
    const p_percent = y / 1000

    clicked_popup
      .setLatLng(e.latlng)
      .setContent(
        `<b>Params</b>:<br/>r: ${format_percent(r_percent)} of R<br/>p: ${format_percent(p_percent)} of r`,
      )
      .openOn(param_map)
  })
})
</script>

<template>
  <div id="map" ref="container"></div>
</template>

<style scoped>
#map {
  width: 512px;
  height: 256px;
}
</style>
