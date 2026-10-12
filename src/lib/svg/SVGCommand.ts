import type { Vec2 } from '../primitives/Vec2'

export class SVGCommand {
  static move_to(point: Vec2): string {
    return `M ${point.x} ${point.y}`
  }

  static line_to(point: Vec2): string {
    return `L ${point.x} ${point.y}`
  }

  static bezier_vertex(b: Vec2, c: Vec2, d: Vec2): string {
    return `C ${b.x} ${b.y}, ${c.x} ${c.y}`
  }

  static readonly CLOSE_PATH = 'Z'
}
