export interface EdgeTo {
  // index of the vertex this edge points to
  dest: number
  // Index into the data array. This is the same for both edges in a pair
  index: number
}

export interface DirectedGraphOptions<V = undefined, E = undefined> {
  vertex_data?: V[]
  edge_data?: E[]
  edges?: Map<number, number>
}

/**
 * Directed graph with vertices that store type V and edges that store type
 * E (use undefined when these are unused)
 */
export class DirectedGraph<V = undefined, E = undefined> {
  vertex_data: V[]
  edge_data: E[]
  adj: Map<number, EdgeTo[]>

  constructor(options: DirectedGraphOptions<V, E>) {
    this.vertex_data = options.vertex_data ?? []
    this.edge_data = options.edge_data ?? []
    this.adj = options.edges ?? new Map()
  }

  add_vertex(data: V): number {
    const index = this.vertex_data.length
    this.vertex_data.push(data)
    return index
  }

  add_edge(a: number, b: number, data: E): number {
    const index = this.edge_data.length
    this.edge_data.push(data)

    this.adj.getOrInsert(a, []).push({ dest: b, index })
    return index
  }
}
