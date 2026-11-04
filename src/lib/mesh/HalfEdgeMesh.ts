import { by_pairs } from '../iteration/by_pairs.ts'

export interface Vertex<V> {
  data: V
  /**
   * Index of one edge leading out of this vertex, if there is one
   */
  edge?: number
}

export interface HalfEdge<E> {
  data: E
  // Index of the vertex at the tail of the edge
  origin: number
  // Index of the half edge going the opposite direction
  twin?: number
  /**
   * Index of the face attached to this edge
   */
  face?: number
  /**
   * Index of previous half-edge
   */
  prev?: number
  /**
   * Index of next half-edge
   */
  next?: number
}

export interface Face<F> {
  data: F
  /**
   * One of the edges attached to this face
   */
  edge: number
}

export class HalfEdgeMesh<V, E = undefined, F = undefined> {
  vertices: Vertex<V>[] = []
  edges: HalfEdge<E>[] = []
  faces: Face<F>[] = []

  add_vertex(data: V): number {
    const index = this.vertices.length
    this.vertices.push({ data, edge: undefined })
    return index
  }

  add_face(data: F, vertices: number[]) {
    for (const [idx_a, idx_b] of by_pairs(vertices)) {
      const edge = {
        data: undefined,
        origin: idx_a,
        prev: undefined,
        next: undefined,
        twin: undefined,
      }
    }

    const face_index = this.faces.length
    const face = {
      data,
      edge: undefined,
    }

    // for (a, b) in pairwise(vertices):
    //   add halfedge (a, b)
  }
}
