import type { VertexAttribute } from './VertexBuffer.ts'

/**
 * Mesh packed for the GPU
 */
export interface GPUPackedMesh {
  label: string
  positions: VertexAttribute
  normals: VertexAttribute
  uvs: VertexAttribute
  indices: number[]
}
