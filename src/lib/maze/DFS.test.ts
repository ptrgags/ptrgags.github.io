import { describe, it, expect } from 'vitest'
import { DFS } from './DFS'
import { Grid, Index2D } from '../data_structures/Grid.ts'
import { GridDFSTraversal } from '../data_structures/GridDFSTraversal.ts'

// Make a grid that stores the index of each cell in the cell itself.
function make_grid(): Grid<Index2D> {
  const grid = new Grid<Index2D>(4, 4)
  grid.fill((index) => index)
  return grid
}

function make_simple_dfs<T>(grid: Grid<T>): DFS<Index2D, number> {
  const traversal = new GridDFSTraversal(grid)
  const dfs = new DFS(traversal)
  return dfs
}

function make_up_right_dfs<T>(grid: Grid<T>): DFS<Index2D, number> {
  // Restrict the traversal to only use up and right. This will exercise
  // the DFS forest code as each row will be visited on a separate
  // tree traversal
  class UpRightTraversal<T> extends GridDFSTraversal<T> {
    get_neighbors(index: Index2D): Index2D[] {
      return [this.grid.right(index), index.up()]
        .filter((x) => x !== undefined)
        .filter((x) => this.grid.in_bounds(x))
    }
  }

  const traversal = new UpRightTraversal(grid)
  const dfs = new DFS(traversal)
  return dfs
}

describe('DFS', () => {
  it('path in callback include the current cell', () => {
    const grid = make_grid()
    const dfs = make_simple_dfs(grid)

    dfs.dfs_forest((path) => {
      const last_index = path[path.length - 1]
      expect(last_index).toEqual(grid.get(last_index))
    })
  })

  it('with simple traversal, iterates the correct number of times', () => {
    const grid = make_grid()
    const dfs = make_simple_dfs(grid)

    let visited_counter = 0
    dfs.dfs_forest((path) => {
      visited_counter++
    })

    expect(visited_counter).toBe(16)
  })

  it('with simple traversal, paths are correct', () => {
    const grid = make_grid()
    const dfs = make_simple_dfs(grid)
    const expected_hashes = [0, 4, 8, 12, 13, 9, 5, 1, 2, 6, 10, 14, 15, 11, 7, 3]

    dfs.dfs_forest((path) => {
      const path_hashes = path.map((index) => grid.hash(index))

      const expected = expected_hashes.slice(0, path.length)
      expect(path_hashes).toEqual(expected)
    })
  })

  it('with up and right traversal, paths are correct', () => {
    const grid = make_grid()
    const dfs = make_up_right_dfs(grid)
    const expected_hashes_by_row = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ]

    dfs.dfs_forest((path) => {
      const row = path[0].i
      const path_hashes = path.map((index) => grid.hash(index))

      const expected = expected_hashes_by_row[row].slice(0, path.length)
      expect(path_hashes).toEqual(expected)
    })
  })
})
