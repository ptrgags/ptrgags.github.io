import type { DFSTraversal } from '../maze/DFSTraversal.js'
import { Grid, Index2D } from './Grid.js'

/**
 * A simple DFS traversal of a grid that is completely deterministic
 * It's handy for unit testing and can be used as a starting place for making
 * more specialized algorithms.
 * It has the tendency to zig-zag over the grid.
 */
export class GridDFSTraversal<T> implements DFSTraversal<Index2D, number> {
  grid: Grid<T>
  constructor(grid: Grid<T>) {
    this.grid = grid
  }

  get_vertex_count() {
    return this.grid.length
  }

  pick_start(visited_set: Set<number>): Index2D | undefined {
    for (let i = 0; i < this.grid.rows; i++) {
      for (let j = 0; j < this.grid.cols; j++) {
        const index = new Index2D(i, j)
        const hash = this.grid.hash(index)
        if (!visited_set.has(hash)) {
          return index
        }
      }
    }

    return undefined
  }

  hash(index: Index2D): number {
    return this.grid.hash(index)
  }

  get_neighbors(index: Index2D): Index2D[] {
    return this.grid.get_neighbors(index)
  }

  order_neighbors(neighbor_indices: Index2D[]): Index2D[] {
    return neighbor_indices
  }
}
