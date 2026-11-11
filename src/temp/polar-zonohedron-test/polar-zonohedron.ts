import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { VSVec3, type Vec3 } from '../../lib/math/vector/Vec3.ts'
import { Mesh } from '../../lib/mesh/Mesh.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { VSVec2, type Vec2 } from '../../lib/primitives/Vec2.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Style } from '../../lib/styling/Style.ts'
import { TextStyle } from '../../lib/styling/TextStyle.ts'
import { Arrow, ArrowParts } from './Arrow.ts'

export class PolarZonohedron {
  edge_length: number
  basis: Vec3[]
  rows: Vec3[][]

  constructor(edge_length: number, aperture_angle: number, basis_count: number) {
    this.edge_length = edge_length

    // Compute basis vectors ==========================================

    const angle_step = (2.0 * Math.PI) / basis_count
    const s0 = edge_length * Math.sin(aperture_angle)
    const z0 = edge_length * Math.cos(aperture_angle)

    const basis = []
    for (let i = 0; i < basis_count; i++) {
      const phi = i * angle_step
      const vec = {
        x: s0 * Math.cos(phi),
        y: s0 * Math.sin(phi),
        z: z0,
      }
      basis.push(vec)
    }
    this.basis = basis

    // Compute vertices ========================================

    this.rows = [[VSVec3.zero()], basis]

    // there are N + 1 rows total, but the first and last row are the
    // points, and we already have the first row with the basis vectors,
    // so N + 1 - 3 = N - 2 is our bound
    for (let i = 0; i < basis_count - 2; i++) {
      const row = new Array(basis_count)
      for (let j = 0; j < basis_count; j++) {
        row[j] = VSVec3.sum(cyclic_slice(basis, j, i + 2))
      }
      this.rows.push(row)
    }

    // The top point is simply the sum of the basis vectors
    this.rows.push([VSVec3.sum(basis)])
  }

  dimensions(): Direction2P {
    const angles = this.angles()
    const basis_count = this.basis.length

    let w = this.edge_length
    let h = 0
    for (let i = 0; i < basis_count - 1; i++) {
      w += this.edge_length * Math.cos(angles[i])
      h += this.edge_length * Math.sin(angles[i])
    }

    return new Direction2P(w, h)
  }

  angles(): number[] {
    const n = this.basis.length
    const result = new Array(n - 1)
    result[0] = get_angle(this.rows[0][0], this.rows[1][1], this.rows[1][0])
    for (let i = 1; i < n - 1; i++) {
      result[i] = get_angle(this.rows[i][1], this.rows[i + 1][1], this.rows[i + 1][0])
    }
    return result
  }

  to_mesh(): Mesh {
    const mesh = new Mesh()
    const positions: number[][] = this.rows.map((row) => {
      return row.map((pos) => mesh.add_position(pos))
    })

    // All the faces are rhombi of different sizes. I'll label
    // the four vertices in what follows:
    //     c
    //   /   \
    //  d     b
    //   \   /
    //     a

    // Add UVs. for now, each rhombus is mapped separately
    //    1,1
    //   /   \
    // 0,1   1,0
    //   \   /
    //    0,0
    const uv_a = mesh.add_uv(new Point2P(0, 0))
    const uv_b = mesh.add_uv(new Point2P(1, 0))
    const uv_c = mesh.add_uv(new Point2P(1, 1))
    const uv_d = mesh.add_uv(new Point2P(0, 1))

    // Add the faces
    const n = this.basis.length

    // Note: faces are ordered
    //    2
    //  /   \
    // 3     1
    //  \   /
    //    0

    // first row shares the origin so needs to be handled slightly differently
    for (let i = 0; i < n; i++) {
      // origin
      const pos_a = positions[0][0]
      const pos_b = positions[1][(i + 1) % n]
      const pos_c = positions[2][i]
      const pos_d = positions[1][i]

      mesh.add_quad(
        {
          pos: pos_a,
          uv: uv_a,
        },
        {
          pos: pos_b,
          uv: uv_b,
        },
        {
          pos: pos_c,
          uv: uv_c,
        },
        {
          pos: pos_d,
          uv: uv_d,
        },
      )
    }

    // Handle faces in all the rows except top and bottom
    // which are different
    for (let i = 1; i < n - 2; i++) {
      for (let j = 0; j < n; j++) {
        const pos_a = positions[i][(j + 1) % n]
        const pos_b = positions[i + 1][(j + 1) % n]
        const pos_c = positions[i + 2][j]
        const pos_d = positions[i + 1][j]

        mesh.add_quad(
          { pos: pos_a, uv: uv_a },
          { pos: pos_b, uv: uv_b },
          { pos: pos_c, uv: uv_c },
          { pos: pos_d, uv: uv_d },
        )
      }
    }

    // handle the last row where the top point is shared by all rhombi
    for (let i = 0; i < n; i++) {
      const pos_a = positions[n - 2][i]
      const pos_b = positions[n - 1][(i + 1) % n]
      // shared tip of rhombus
      const pos_c = positions[n][0]
      const pos_d = positions[n - 1][i]
      mesh.add_quad(
        { pos: pos_a, uv: uv_a },
        { pos: pos_b, uv: uv_b },
        { pos: pos_c, uv: uv_c },
        { pos: pos_d, uv: uv_d },
      )
    }

    return mesh.compute_face_normals()
  }
}

function cyclic_slice<T>(arr: T[], start: number, count: number): T[] {
  const result = new Array(count)
  for (let i = 0; i < count; i++) {
    result[i] = arr[(start + i) % arr.length]
  }
  return result
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

function get_angle(a: Vec3, b: Vec3, c: Vec3): number {
  const ab = VSVec3.sub(b, a)
  const ac = VSVec3.sub(c, a)
  const ab_dot_ac = dot(ab, ac)
  const ab_mag = Math.sqrt(dot(ab, ab))
  const ac_mag = Math.sqrt(dot(ac, ac))

  const cos_theta = ab_dot_ac / (ab_mag * ac_mag)
  return Math.acos(cos_theta)
}

export function printable_pattern(pixels_per_inch: number): [Drawable, Direction2P] {
  const edge_length = 100
  const N = 6
  const zonohedron = new PolarZonohedron(edge_length, Math.PI / 4, N)
  const angles = zonohedron.angles()

  const horizontal_edge = Direction2P.DIR_X.scale(edge_length)

  const left_edge = []
  const right_edge = []
  const rhombi = []
  let offset: Point2P = Point2P.ORIGIN
  for (let i = 0; i < N; i++) {
    const angle = angles[i]
    const angled_edge = Direction2P.from_angle(angle).scale(edge_length)

    const a = offset
    const b = offset.add(angled_edge)
    const c = offset.add(angled_edge).add(horizontal_edge)
    const d = offset.add(horizontal_edge)

    const rhombus = new Polyline({
      vertices: [a, b, c, d],
      closed: true,
    })

    // update the boundary polygon.
    left_edge.push(a, b)
    // push these backwards, we'll reverse them at the end
    right_edge.push(d, c)

    rhombi.push(rhombus)
    offset = offset.add(angled_edge)
  }

  // Explicitly list the boundary vertices so the corners render correctly
  const boundary = new Polyline({
    vertices: [...left_edge, ...right_edge.reverse()],
    closed: true,
  })

  const SEAM_ALLOWANCE_INCHES = 5 / 8
  const LINE_WIDTH = 2 * SEAM_ALLOWANCE_INCHES * pixels_per_inch

  const visual_center = VSVec2.centroid(rhombi[2].points)
  const text = new Text(`Cut ${N}`, visual_center)
  const STYLE_TEXT = {
    text_style: new TextStyle(12, 'center', 'center'),
    style: Style.flat(Color.BLACK),
  }

  const grain_arrow = new Arrow({
    start: VSVec2.add(visual_center, new Direction2P(-25, 20)),
    end: VSVec2.add(visual_center, new Direction2P(25, 20)),
    tip: ArrowParts.ARROW_BOTH,
    tail: ArrowParts.ARROW_BOTH,
    arrow_radii: new Direction2P(10, 5),
  })

  return [
    group(
      // Seam allowance
      style(Style.lines(Oklch.grey(15 / 16), LINE_WIDTH), boundary),
      // Actual lines
      style(
        new Style({ stroke: Color.BLACK, width: 2, fill: Color.WHITE }),
        ...rhombi,
        grain_arrow,
      ),
      // Cut N label
      style(STYLE_TEXT, text),
    ),
    zonohedron.dimensions(),
  ]
}
