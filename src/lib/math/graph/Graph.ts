import type { EdgeTo } from './DirectedGraph.ts'

export interface GraphOptions<V = undefined, E = undefined> {
  vertex_data?: V[]
  edge_data?: E[]
  adj?: Map<number, EdgeTo[]>
}

/**
 * Undirected graph with vertices that store type V and edges that store type
 * E (use undefined when these are unused)
 */
export class Graph<V = undefined, E = undefined> {
  vertex_data: V[]
  edge_data: E[]
  adj: Map<number, EdgeTo[]>

  constructor(options: GraphOptions<V, E>) {
    this.vertex_data = options.vertex_data ?? []
    this.edge_data = options.edge_data ?? []
    this.adj = options.adj ?? new Map()
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
    this.adj.getOrInsert(b, []).push({ dest: a, index })
    return index
  }
}
