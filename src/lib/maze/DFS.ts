import type { DFSTraversal } from './DFSTraversal.ts'

/**
 * Stack entry type, implementation detail for dfs_tree()
 */
interface StackEntry<I> {
  index: I
  path: I[]
}

/**
 * A generic implementation of a DFS preorder traversal
 *
 * @template I The index type for the grid. G::I
 * @template H The hash type for indices.
 */
export class DFS<I, H extends number | string> {
  traversal: DFSTraversal<I, H>

  /**
   * Constructor
   * @param {DFSTraversal<I, H>} traversal The traversal logic for this particular traversal
   */
  constructor(traversal: DFSTraversal<I, H>) {
    this.traversal = traversal
  }

  /**
   * Perform DFS traversal until the entire
   *
   * @param {function(I[])} callback A function to call at each visited cell. The value is a path to this cell
   */
  dfs_forest(callback: (index: I[]) => void) {
    const visited = new Set<H>()

    const vertex_count = this.traversal.get_vertex_count()
    while (visited.size < vertex_count) {
      const start_index = this.traversal.pick_start(visited)
      if (start_index !== undefined) {
        this.dfs_tree(start_index, callback, visited)
      }
    }
  }

  /**
   * Perform a DFS traversal on a single start node
   * @param {I} start_index The index of the first cell to visit
   * @param {function(I[])} callback A function to call at each visited cell. The value is a path to the current cell.
   * @param {Set<H> | undefined} visited A set of hashed indices to indicate which cells were visited
   */
  dfs_tree(start_index: I, callback: (arg0: I[]) => any, visited: Set<H> | undefined) {
    visited = visited ?? new Set()

    const stack: StackEntry<I>[] = [{ index: start_index, path: [start_index] }]
    while (stack.length > 0) {
      const top = stack.pop()
      if (top === undefined) {
        throw new Error('reached end of stack too early')
      }

      const { index, path } = top

      // We visited this node before we got back to the stack entry
      const hash = this.traversal.hash(index)
      if (visited.has(hash)) {
        continue
      }

      visited.add(hash)
      callback(path)

      const unvisited_neighbors = this.traversal
        .get_neighbors(index)
        .filter((index) => !visited.has(this.traversal.hash(index)))

      const ordered_neighbors = this.traversal.order_neighbors(unvisited_neighbors)

      for (const neighbor of ordered_neighbors) {
        stack.push({ index: neighbor, path: [...path, neighbor] })
      }
    }
  }
}
