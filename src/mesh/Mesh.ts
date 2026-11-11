import type { Vec3 } from '../lib/math/vector/Vec3.ts'
import type { Vec2 } from '../lib/primitives/Vec2.ts'

export interface FaceVertex {
  position_index: number
  uv_index?: number
  normal_index?: number
}

/**
 * 3D mesh that stores each attribute separately. This is like a limited form
 * of an OBJ mesh.
 *
 * @see {@link https://en.wikipedia.org/wiki/Wavefront_.obj_file | Wikipedia: Wavefront .obj file}
 */
export class Mesh {
  positions: Vec3[] = []
  normals: Vec3[] = []
  uvs: Vec2[] = []
  faces: FaceVertex[][] = []

  add_position(pos: Vec3): number {
    const index = this.positions.length
    this.positions.push(pos)
    return index
  }

  add_normal(normal: Vec3): number {
    const index = this.normals.length
    this.normals.push(normal)
    return index
  }

  add_uv(uv: Vec3): number {
    const index = this.uvs.length
    this.uvs.push(uv)
    return index
  }

  add_triangle(a: FaceVertex, b: FaceVertex, c: FaceVertex): number {
    const index = this.faces.length
    this.faces.push([a, b, c])
    return index
  }

  add_quad(a: FaceVertex, b: FaceVertex, c: FaceVertex, d: FaceVertex): number {
    const index = this.faces.length
    this.faces.push([a, b, c, d])
    return index
  }

  add_ngon(vertices: FaceVertex[]): number {
    const index = this.faces.length
    this.faces.push(vertices)
    return index
  }
}
