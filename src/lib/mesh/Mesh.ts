import type { Vec3 } from '../math/vector/Vec3.ts'
import type { Vec2 } from '../primitives/Vec2.ts'

/**
 * Attribute indices for one vertex of a face
 * This is similar to OBJ-style mesh's v/vt/vn syntax, although 0-indexed
 */
export interface FaceVertex {
  pos: number
  uv?: number
  normal?: number
}

/**
 * 3D mesh that stores each attribute separately. This is like a limited form
 * of an OBJ mesh.
 *
 * This class has methods for adding vertices and faces, but otherwise this is
 * intended to be used as a read-only mesh format.
 *
 * @see {@link https://en.wikipedia.org/wiki/Wavefront_.obj_file | Wikipedia: Wavefront .obj file}
 */
export class Mesh {
  positions: Vec3[] = []
  normals: Vec3[] = []
  uvs: Vec2[] = []
  faces: FaceVertex[][] = []

  /**
   * Add a position to the positions list
   * @param pos Position in 3D space
   * @returns index of the new position element
   */
  add_position(pos: Vec3): number {
    const index = this.positions.length
    this.positions.push(pos)
    return index
  }

  /**
   * Add a normal to the normals list
   * @param normal A unit normal
   * @returns index of the new normal element
   */
  add_normal(normal: Vec3): number {
    const index = this.normals.length
    this.normals.push(normal)
    return index
  }

  /**
   * Add a pair of (u, v) coordinates to the uvs list
   * @param uv The uvs
   * @returns index of the new uvs
   */
  add_uv(uv: Vec2): number {
    const index = this.uvs.length
    this.uvs.push(uv)
    return index
  }

  /**
   * Add a triangle
   * @param a vertex a
   * @param b vertex b
   * @param c vertex c
   * @returns index of the new triangle
   */
  add_triangle(a: FaceVertex, b: FaceVertex, c: FaceVertex): number {
    const index = this.faces.length
    this.faces.push([a, b, c])
    return index
  }

  /**
   * Add a quad
   * @param a vertex a
   * @param b vertex b
   * @param c vertex c
   * @param d vertex d
   * @returns index of the new quad
   */
  add_quad(a: FaceVertex, b: FaceVertex, c: FaceVertex, d: FaceVertex): number {
    const index = this.faces.length
    this.faces.push([a, b, c, d])
    return index
  }

  /**
   * Add an n-gon with n >= 3
   * @param vertices Vertices to add
   * @returns index of the new n-gon
   */
  add_ngon(vertices: FaceVertex[]): number {
    if (vertices.length < 3) {
      throw new Error('vertices must have at least 3 elements')
    }

    const index = this.faces.length
    this.faces.push(vertices)
    return index
  }

  /**
   * Check that every face vertex has normals set
   * @returns true if mesh has normals
   */
  has_normals(): boolean {
    return this.faces.every((face) => {
      return face.every((v) => v.normal !== undefined)
    })
  }

  /**
   * Check that every face vertex has UV coordinates set
   * @returns true if mesh has uv coordinates
   */
  has_uvs(): boolean {
    return this.faces.every((face) => {
      return face.every((v) => v.uv !== undefined)
    })
  }

  /**
   * Compute (unit) face normals for all faces in the mesh. This
   * returns a new Mesh. Position and
   */
  compute_face_normals(): Mesh {
    throw new Error('not implemented')
  }
}
