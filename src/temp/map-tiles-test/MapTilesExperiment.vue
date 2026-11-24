<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { DebugCoordsLayer } from './DebugCoordsLayer.ts'
import { SVGLayer } from './SVGLayer.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Circle } from '../../lib/primitives/Circle.ts'
import { SWATCH } from '../../core/dimensions.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { vec2 } from '../../lib/primitives/Vec2.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { Color } from '../../lib/styling/Color.ts'
import { mod } from '../../lib/math/mod.ts'

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
    //maxZoom: 3,
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

  const svg_layer = new SVGLayer((coords) => {
    if (coords.x < 0 || coords.y < 0) {
      return undefined
    }

    const hue = mod(coords.x * 5, 360)

    return group(
      style(
        new Style({
          fill: new Oklch(0.7, 0.1, hue),
          stroke: Color.WHITE,
        }),
        new Rect(new Point2P(64, 64), new Direction2P(128, 128)),
      ),
      style(Style.DEFAULT_FLAT, new Circle(SWATCH.center, 16)),
    )
  })
  map.addLayer(svg_layer)
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
