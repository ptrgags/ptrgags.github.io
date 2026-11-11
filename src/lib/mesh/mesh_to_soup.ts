import type { Mesh } from './Mesh.ts'
import type { TriangleSoup } from './TriangleSoup.ts'

// Ported from webgpu-sketchbook, see https://github.com/ptrgags/webgpu-sketchbook/blob/70dd1aa6177fb0773f5deda84ced2702bcf3cbc3/src/stl/encode_stl.ts#L24
/**
 * Convert a polygon mesh to triangle soup (used to export STL files)
 * @param mesh
 * @returns
 */
export function mesh_to_triangle_soup(mesh: Mesh): TriangleSoup {
  const result: TriangleSoup = []

  if (!mesh.has_normals()) {
    throw new Error('mesh must have normals')
  }

  for (const face of mesh.faces) {
    const positions = face.map((x) => mesh.positions[x.pos])

    // The normal check before the loop guarantees that the normal index
    // is undefined
    const normal_index = face[0].normal as number
    const normal = mesh.normals[normal_index]

    // tessellate n-gons
    const sides = face.length
    const num_triangles = sides - 2
    for (let i = 0; i < num_triangles; i++) {
      const a = positions[0]
      const b = positions[i + 1]
      const c = positions[i + 2]
      result.push({ normal, a, b, c })
    }
  }
  return result
}
