import type { Vec3 } from '../math/vector/Vec3.ts'
import type { Vec2 } from '../primitives/Vec2.ts'
import type { GPUPackedMesh } from '../webgpu/GPUPackedMesh.ts'
import { VertexAttribute } from '../webgpu/VertexBuffer.ts'
import type { TriangleSoup } from './TriangleSoup.ts'

export interface GPUVertex {
  pos: Vec3
  normal: Vec3
  uv: Vec2
}

export interface GPUMeshOptions {
  vertices: GPUVertex[]
  triangles: [number, number, number][]
}

/**
 * Intermediate mesh type that stores structs of e.g. (pos, normal, uv) data
 * and indices in a way that's easy to pack for the GPU.
 *
 * This mesh type only supports triangle meshes.
 */
export class GPUMesh {
  label: string
  vertices: GPUVertex[]
  triangles: [number, number, number][]

  constructor(label: string, options: Partial<GPUMeshOptions> = {}) {
    this.label = label
    this.vertices = options.vertices ?? []
    this.triangles = options.triangles ?? []
  }

  add_vertex(vertex: GPUVertex): number {
    const index = this.vertices.length
    this.vertices.push(vertex)
    return index
  }

  add_triangle(a: number, b: number, c: number): number {
    const index = this.triangles.length
    this.triangles.push([a, b, c])
    return index
  }

  /**
   * Dissolve the mesh into its constituent triangles e.g. for exporting an STL
   * model.
   * @see TriangleSoup
   * @returns A flat list of triangle positions and normals. No other attributes are preserved.
   */
  to_soup(): TriangleSoup {
    return this.triangles.map(([idx_a, idx_b, idx_c]) => {
      const a = this.vertices[idx_a].pos
      const b = this.vertices[idx_b].pos
      const c = this.vertices[idx_c].pos
      // Note: this assumes the normals are face normals. Right now this will
      // be the case, but that may change if I ever need vertex normals.
      const normal = this.vertices[idx_a].normal
      return { normal, a, b, c }
    })
  }

  /**
   * Pack the mesh for uploading to the GPU
   * @returns A mesh that can be used for creating shaders
   */
  pack(): GPUPackedMesh {
    const packed_positions = this.vertices.flatMap((v) => {
      const pos = v.pos
      return [pos.x, pos.y, pos.z]
    })

    const packed_normals = this.vertices.flatMap((v) => {
      const normal = v.normal
      return [normal.x, normal.y, normal.z]
    })

    const packed_uvs = this.vertices.flatMap((v) => {
      const uv = v.uv
      return [uv.x, uv.y]
    })

    const indices = this.triangles.flat()

    return {
      label: this.label,
      positions: new VertexAttribute(3, packed_positions),
      normals: new VertexAttribute(3, packed_normals),
      uvs: new VertexAttribute(2, packed_uvs),
      indices,
    }
  }
}
