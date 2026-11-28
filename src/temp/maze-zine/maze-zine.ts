import type p5 from 'p5'
import type { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { make_sketch, make_static_sketch, type SceneP5 } from '../../lib/p5-helpers/sketches.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { ATC_SCREEN, SWATCH } from '../../core/dimensions.ts'
import { generate_maze, MazeCell } from '../../lib/maze/RandomDFSMaze.ts'
import type { Grid } from '../../lib/data_structures/Grid.ts'
import { CardinalDirection } from '../../lib/data_structures/CardinalDirection.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import { vec2 } from '../../lib/primitives/Vec2.ts'
import { Style } from '../../lib/styling/Style.ts'

const CELL_SIZE = 25
const GRID_DIMENSIONS = ATC_SCREEN.dimensions.scale(1 / CELL_SIZE)

function* make_edges(maze: Grid<MazeCell>): Generator<Drawable> {
  console.log(maze.values)
  for (const edge of maze.iter_vertical_edges()) {
    if (edge.right) {
      const cell = maze.get(edge.right)
      if (!cell.is_connected(CardinalDirection.LEFT)) {
        const x = edge.right.j * CELL_SIZE
        const y1 = edge.right.i * CELL_SIZE
        const y2 = (edge.right.i + 1) * CELL_SIZE
        yield new LineSegment(vec2(x, y1), vec2(x, y2))
      }
    } else if (edge.left) {
      const cell = maze.get(edge.left)
      if (!cell.is_connected(CardinalDirection.RIGHT)) {
        const x = (edge.left.j + 1) * CELL_SIZE
        const y1 = edge.left.i * CELL_SIZE
        const y2 = (edge.left.i + 1) * CELL_SIZE
        yield new LineSegment(vec2(x, y1), vec2(x, y2))
      }
    }
  }

  for (const edge of maze.iter_horizontal_edges()) {
    if (edge.below) {
      const cell = maze.get(edge.below)
      if (!cell.is_connected(CardinalDirection.UP)) {
        const x1 = edge.below.j * CELL_SIZE
        const x2 = (edge.below.j + 1) * CELL_SIZE
        const y = edge.below.i * CELL_SIZE
        yield new LineSegment(vec2(x1, y), vec2(x2, y))
      }
    } else if (edge.above) {
      const cell = maze.get(edge.above)
      if (!cell.is_connected(CardinalDirection.DOWN)) {
        const x1 = edge.above.j * CELL_SIZE
        const x2 = (edge.above.j + 1) * CELL_SIZE
        const y = (edge.above.i + 1) * CELL_SIZE
        yield new LineSegment(vec2(x1, y), vec2(x2, y))
      }
    }
  }
}

function one_maze(): Drawable {
  const maze = generate_maze(GRID_DIMENSIONS.height, GRID_DIMENSIONS.width)
  return style(Style.DEFAULT_LINES, ...make_edges(maze))
}

export const SKETCHES = {
  template: make_static_sketch(ATC_SCREEN.dimensions, one_maze()),
}
