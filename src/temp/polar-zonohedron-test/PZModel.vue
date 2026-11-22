<script setup lang="ts">
import { download_file } from '../../lib/dom/download_file.ts'
import { encode_stl_file } from '../../lib/stl/encode_stl.ts'
import { PolarZonohedron } from './polar-zonohedron.ts'

function download() {
  const edge_length_mm = 10
  const N = 6
  const zonohedron = new PolarZonohedron(edge_length_mm, Math.PI / 4, N)

  const mesh = zonohedron.to_mesh()
  const soup = mesh.to_soup()
  const file = encode_stl_file(soup, 'polar_zonohedron6.stl')
  download_file(file)
}
</script>

<template>
  <button @click="download">Download STL file</button>
</template>
