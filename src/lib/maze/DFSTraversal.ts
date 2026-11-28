/**
 * Interface for a generic depth-first seach. This is used
 * to customize the behavior of DFS
 *
 * @interface DFSTraversal
 * @template I The index type for the grid
 * @template {number | string} H The hash type
 */
export class DFSTraversal<I, H extends number | string> {
  /**
   * Get the total number of vertices to be traversed.
   * @return {number} The total number of vertices
   */
  get_vertex_count(): number {
    throw new Error('not implemented')
  }

  /**
   * For forest traversal, pick the next start node
   * @param {Set<H>} visited_set The visited elements
   * @return The unvisited index to start at, or undefined to indicate we've
   * reached the end of the forest
   */
  pick_start(visited_set: Set<H>): I | undefined {
    throw new Error('not implemented')
  }

  /**
   * Hash a grid index to a unique key for a Set
   * @param {I} index The index type
   * @return {H} The hashed version of this index
   */
  hash(index: I): H {
    throw new Error('not implemented')
  }

  /**
   * Get all the reachable neighbors from the given index. Do not check
   * if the neighbor is visited, this will be done by the DFS traversal.
   * @param {I} index The index of the current cell
   */
  get_neighbors(index: I): I[] {
    throw new Error('not implemented')
  }

  /**
   * Function for selecting which order the neighbors will be traversed.
   * This will be pushed to a stack, so the next node visited will be the
   * LAST element returned.
   *
   * @param {I[]} neighbor_indices The indices of the neighbors
   * @return {I[]} the neighbor indices in reverse order of how they should be traversed.
   */
  order_neighbors(neighbor_indices: I[]): I[] {
    throw new Error('not implemented')
  }
}
