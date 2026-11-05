import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { VSVec3, type Vec3 } from '../../lib/math/vector/Vec3.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { Polyline } from '../../lib/primitives/Polyline.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'
import { VSVec2, type Vec2 } from '../../lib/primitives/Vec2.ts'
import { Color } from '../../lib/styling/Color.ts'
import { Oklch } from '../../lib/styling/Oklch.ts'
import { Style } from '../../lib/styling/Style.ts'

export class PolarZonohedron {
  basis: Vec3[]
  rows: Vec3[][]

  constructor(edge_length: number, aperture_angle: number, basis_count: number) {
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
      const prev_row = this.rows[1 + i]
      const row = new Array(basis_count)
      for (let j = 0; j < basis_count; j++) {
        row[j] = VSVec3.add(prev_row[j], prev_row[(j + 1) % basis_count])
      }
      this.rows.push(row)
    }

    // The top point is simply the sum of the basis vectors
    this.rows.push([VSVec3.sum(basis)])
  }

  angles(): number[] {
    const n = this.basis.length
    const result = new Array(n)
    result[0] = get_angle(this.rows[1][0], this.rows[0][0], this.rows[1][1])
    for (let i = 1; i < n - 1; i++) {
      result[i] = get_angle(this.rows[i + 1][0], this.rows[i][1], this.rows[i + 1][1])
    }
    return result
  }
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

export function printable_pattern(): Drawable {
  const edge_length = 100
  const N = 6
  const zonohedron = new PolarZonohedron(edge_length, Math.PI / 3, N)
  const angles = zonohedron.angles()

  const horizontal_edge = Direction2P.DIR_X.scale(edge_length)

  const rhombi = []
  let offset: Point2P = Point2P.ORIGIN
  for (let i = 0; i < N; i++) {
    const angle = angles[i]
    const angled_edge = Direction2P.from_angle(angle).scale(edge_length)

    const rhombus = new Polyline({
      vertices: [
        offset,
        offset.add(angled_edge),
        offset.add(angled_edge).add(horizontal_edge),
        offset.add(horizontal_edge),
      ],
      closed: true,
    })

    rhombi.push(rhombus)
    offset = offset.add(angled_edge)
  }

  return group(
    // Seam allowance
    //style(Style.lines(Oklch.grey(0.5), 40), ...rhombi),
    // Actual lines
    style(new Style({ stroke: Color.BLACK, width: 2, fill: Color.WHITE }), ...rhombi),
  )
}
