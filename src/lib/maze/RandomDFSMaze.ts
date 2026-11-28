import { FlagSet } from '../binary/FlagSet.js'
import { Grid, type Index2D } from '../data_structures/Grid.js'
import { CardinalDirection, opposite } from '../data_structures/CardinalDirection.js'
import { Random } from '../math/Random.js'
import { DFS } from './DFS.js'
import { GridDFSTraversal } from '../data_structures/GridDFSTraversal.ts'
import type { DFSTraversal } from './DFSTraversal.ts'

export class MazeCell {
  index: Index2D
  connection_flags: FlagSet
  constructor(index: Index2D) {
    this.index = index
    this.connection_flags = new FlagSet(0, CardinalDirection.COUNT)
  }

  is_connected(direction: CardinalDirection) {
    return this.connection_flags.has_flag(direction)
  }

  static connect_neighbors(cell_a: MazeCell, cell_b: MazeCell, dir_ab: CardinalDirection) {
    const dir_ba = opposite(dir_ab)
    cell_a.connection_flags.set_flag(dir_ab)
    cell_b.connection_flags.set_flag(dir_ba)
  }
}

/**
 * DFSTraversal to create a maze via the random DFS algorithm presented in
 * _Mazes for Programmers_ by Jamis Buck
 */
class RandomDFSMazeTraversal implements DFSTraversal<Index2D, number> {
  grid: Grid<MazeCell>
  grid_traversal: GridDFSTraversal<MazeCell>
  constructor(grid: Grid<MazeCell>) {
    this.grid = grid
    this.grid_traversal = new GridDFSTraversal(grid)
  }

  get_vertex_count() {
    return this.grid_traversal.get_vertex_count()
  }

  pick_start(visited_set: Set<number>): Index2D | undefined {
    return this.grid_traversal.pick_start(visited_set)
  }

  hash(index: Index2D): number {
    return this.grid_traversal.hash(index)
  }

  get_neighbors(index: Index2D): Index2D[] {
    const neighbors_in_bounds = this.grid_traversal.get_neighbors(index)
    const current = this.grid.get(index)

    // We want the neighbors that are _not_ yet connected
    return neighbors_in_bounds.filter((x) => {
      const direction = index.direction_to(x)

      // shouldn't happen
      if (direction === undefined) {
        throw new Error('impossible: undefined direction to neighbor cell')
      }

      return !current.is_connected(direction)
    })
  }

  order_neighbors(neighbor_indices: Index2D[]): Index2D[] {
    return Random.shuffle(neighbor_indices)
  }
}

/**
 * Generate a maze using DFS
 * @param {number} rows The number of rows
 * @param {number} cols The number of cols
 * @returns {Grid<MazeCell>} A grid of cells connected like a maze
 */
export function generate_maze(rows: number, cols: number): Grid<MazeCell> {
  const grid = new Grid<MazeCell>(rows, cols)
  grid.fill((index) => {
    return new MazeCell(index)
  })

  const traversal = new RandomDFSMazeTraversal(grid)
  const dfs = new DFS(traversal)

  dfs.dfs_forest((path) => {
    if (path.length >= 2) {
      const prev_index = path[path.length - 2]
      const curr_index = path[path.length - 1]
      const prev_cell = grid.get(prev_index)
      const curr_cell = grid.get(curr_index)

      const dir = prev_index.direction_to(curr_index)
      if (dir === undefined) {
        throw new Error('non-adjacent neighbors!')
      }
      MazeCell.connect_neighbors(prev_cell, curr_cell, dir)
    }
  })

  return grid
}
