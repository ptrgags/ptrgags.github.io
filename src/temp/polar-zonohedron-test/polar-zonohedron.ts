import { VSVec3, type Vec3 } from '../../lib/math/vector/Vec3.ts'

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
}
