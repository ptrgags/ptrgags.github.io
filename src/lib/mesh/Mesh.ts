import type { Vec3 } from '../math/vector/Vec3.ts'
import type { Vec2 } from '../primitives/Vec2.ts'

export interface VertexIndices {
  position: number
  normal?: number
  uv?: number
}

export type MeshTriangle = [VertexIndices, VertexIndices, VertexIndices]
export type MeshQuad = [VertexIndices, VertexIndices, VertexIndices, VertexIndices]

/**
 * OBJ-style mesh. I find this easier to work with when generating
 */
export class Mesh {
  positions: Vec3[] = []
  normals: Vec3[] = []
  uvs: Vec2[] = []
  faces: VertexIndices[][] = []

  add_positions(...positions: Vec3[]) {
    this.positions.push(...positions)
  }
  add_normals(...normals: Vec3[]) {
    this.normals.push(...normals)
  }
  add_uvs(...uvs: Vec2[]) {
    this.uvs.push(...uvs)
  }

  add_triangles(...triangles: MeshTriangle[]) {
    this.faces.push(...triangles)
  }
  add_quads(...quads: MeshQuad[]) {
    this.faces.push(...quads)
  }
}
