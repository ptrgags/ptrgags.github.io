import { describe, it, expect } from 'vitest'
import { Mesh } from './Mesh.ts'
import { vec3 } from '../math/vector/Vec3.ts'
import { vec2 } from '../primitives/Vec2.ts'
import type { TriangleSoup } from './TriangleSoup.ts'

const ONE_TRIANGLE = new Mesh({
  positions: [vec3(0, 0, 0), vec3(1, 0, 0), vec3(0, 1, 0)],
  normals: [vec3(0, 0, 1)],
  uvs: [vec2(0, 0), vec2(1, 0), vec2(0, 1)],
  faces: [
    [
      { pos: 0, normal: 0, uv: 0 },
      { pos: 1, normal: 0, uv: 1 },
      { pos: 2, normal: 0, uv: 2 },
    ],
  ],
})

const UNIT_SQUARE = new Mesh({
  positions: [vec3(0, 0, 0), vec3(1, 0, 0), vec3(1, 1, 0), vec3(0, 1, 0)],
  normals: [vec3(0, 0, 1)],
  uvs: [vec2(0, 0), vec2(1, 0), vec2(1, 1), vec2(0, 1)],
  faces: [
    [
      { pos: 0, normal: 0, uv: 0 },
      { pos: 1, normal: 0, uv: 1 },
      { pos: 2, normal: 0, uv: 2 },
      { pos: 3, normal: 0, uv: 3 },
    ],
  ],
})

// House-shaped pentagon
const HOUSE = new Mesh({
  positions: [vec3(0, 0, 0), vec3(1, 0, 0), vec3(1, 1, 0), vec3(0.5, 1.5, 0), vec3(0, 1, 0)],
  normals: [vec3(0, 0, 1)],
  // not the best UVs, but powers of two are easier to test with
  uvs: [vec2(0, 0), vec2(1, 0), vec2(1, 0.75), vec2(0.5, 1), vec2(0, 0.75)],
  faces: [
    [
      { pos: 0, normal: 0, uv: 0 },
      { pos: 1, normal: 0, uv: 1 },
      { pos: 2, normal: 0, uv: 2 },
      { pos: 3, normal: 0, uv: 3 },
      { pos: 4, normal: 0, uv: 4 },
    ],
  ],
})

// Rectangle of 2 square quads
const TWO_SQUARE = new Mesh({
  positions: [
    vec3(0, 0, 0),
    vec3(1, 0, 0),
    vec3(2, 0, 0),
    vec3(2, 1, 0),
    vec3(1, 1, 0),
    vec3(0, 1, 0),
  ],
  normals: [vec3(0, 0, 1)],
  uvs: [vec2(0, 0), vec2(0.5, 0), vec2(1, 0), vec2(0, 1), vec2(0.5, 1), vec2(1, 1)],
  faces: [
    [
      { pos: 0, normal: 0, uv: 0 },
      { pos: 1, normal: 0, uv: 1 },
      { pos: 4, normal: 0, uv: 4 },
      { pos: 5, normal: 0, uv: 5 },
    ],
    [
      { pos: 1, normal: 0, uv: 1 },
      { pos: 2, normal: 0, uv: 2 },
      { pos: 3, normal: 0, uv: 3 },
      { pos: 4, normal: 0, uv: 4 },
    ],
  ],
})

const POSITIONS_ONLY = new Mesh({
  positions: [vec3(0, 0, 0), vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)],
  faces: [
    [{ pos: 0 }, { pos: 1 }, { pos: 2 }],
    [{ pos: 0 }, { pos: 2 }, { pos: 3 }],
    [{ pos: 0 }, { pos: 3 }, { pos: 1 }],
  ],
})

describe('Mesh', () => {
  describe('add_position', () => {
    it('adds position value', () => {
      const mesh = new Mesh()

      mesh.add_position(vec3(1, 2, 3))

      const expected = new Mesh({
        positions: [vec3(1, 2, 3)],
      })
      expect(mesh).toBeMesh(expected)
    })

    it('indices auto-increment', () => {
      const mesh = new Mesh()

      const idx_a = mesh.add_position(vec3(1, 0, 0))
      const idx_b = mesh.add_position(vec3(0, 1, 0))
      const idx_c = mesh.add_position(vec3(0, 0, 1))
      const result = [idx_a, idx_b, idx_c]

      const expected = [0, 1, 2]

      expect(result).toEqual(expected)
    })

    it('indices correspond to the correct values in the positions array', () => {
      const mesh = new Mesh()

      const idx_a = mesh.add_position(vec3(1, 0, 0))
      const idx_b = mesh.add_position(vec3(0, 1, 0))
      const idx_c = mesh.add_position(vec3(0, 0, 1))
      const indices = [idx_a, idx_b, idx_c]
      const result = indices.map((idx) => mesh.positions[idx])

      const expected = [vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)]
      expect(result).toEqual(expected)
    })
  })

  describe('add_normal', () => {
    it('adds normal value', () => {
      const mesh = new Mesh()

      mesh.add_normal(vec3(1, 2, 3))

      const expected = new Mesh({
        normals: [vec3(1, 2, 3)],
      })
      expect(mesh).toBeMesh(expected)
    })

    it('indices auto-increment', () => {
      const mesh = new Mesh()

      const idx_a = mesh.add_normal(vec3(1, 0, 0))
      const idx_b = mesh.add_normal(vec3(0, 1, 0))
      const idx_c = mesh.add_normal(vec3(0, 0, 1))
      const result = [idx_a, idx_b, idx_c]

      const expected = [0, 1, 2]

      expect(result).toEqual(expected)
    })

    it('indices correspond to the correct values in the normals array', () => {
      const mesh = new Mesh()

      const idx_a = mesh.add_normal(vec3(1, 0, 0))
      const idx_b = mesh.add_normal(vec3(0, 1, 0))
      const idx_c = mesh.add_normal(vec3(0, 0, 1))
      const indices = [idx_a, idx_b, idx_c]
      const result = indices.map((idx) => mesh.normals[idx])

      const expected = [vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)]
      expect(result).toEqual(expected)
    })
  })

  describe('add_uv', () => {
    it('adds uv value', () => {
      const mesh = new Mesh()

      mesh.add_uv(vec2(0.5, 1))

      const expected = new Mesh({
        uvs: [vec2(0.5, 1)],
      })
      expect(mesh).toBeMesh(expected)
    })

    it('indices auto-increment', () => {
      const mesh = new Mesh()

      const idx_a = mesh.add_uv(vec2(1, 0))
      const idx_b = mesh.add_uv(vec2(0, 1))
      const idx_c = mesh.add_uv(vec2(1, 1))
      const result = [idx_a, idx_b, idx_c]

      const expected = [0, 1, 2]

      expect(result).toEqual(expected)
    })

    it('indices correspond to the correct values in the uvs array', () => {
      const mesh = new Mesh()

      const idx_a = mesh.add_uv(vec2(1, 0))
      const idx_b = mesh.add_uv(vec2(0, 1))
      const idx_c = mesh.add_uv(vec2(1, 1))
      const indices = [idx_a, idx_b, idx_c]
      const result = indices.map((idx) => mesh.uvs[idx])

      const expected = [vec2(1, 0), vec2(0, 1), vec2(1, 1)]
      expect(result).toEqual(expected)
    })
  })

  it('add_triangle creates triangle face', () => {
    const mesh = new Mesh()
    mesh.add_position(vec3(1, 0, 0))
    mesh.add_position(vec3(0, 1, 0))
    mesh.add_position(vec3(0, 0, 1))

    const result = mesh.add_triangle({ pos: 0 }, { pos: 1 }, { pos: 2 })

    expect(mesh).toBeMesh(
      new Mesh({
        positions: [vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)],
        faces: [[{ pos: 0 }, { pos: 1 }, { pos: 2 }]],
      }),
    )

    const expected = 0
    expect(result).toEqual(expected)
  })

  it('add_quad creates quad face', () => {
    const mesh = new Mesh()
    mesh.add_position(vec3(0, 0, 0))
    mesh.add_position(vec3(1, 0, 0))
    mesh.add_position(vec3(1, 1, 0))
    mesh.add_position(vec3(0, 1, 0))

    const result = mesh.add_quad({ pos: 0 }, { pos: 1 }, { pos: 2 }, { pos: 3 })

    expect(mesh).toBeMesh(
      new Mesh({
        positions: [vec3(0, 0, 0), vec3(1, 0, 0), vec3(1, 1, 0), vec3(0, 1, 0)],
        faces: [[{ pos: 0 }, { pos: 1 }, { pos: 2 }, { pos: 3 }]],
      }),
    )

    const expected = 0
    expect(result).toEqual(expected)
  })

  describe('add_ngon', () => {
    it('with less than 3 vertices throws error', () => {
      const mesh = new Mesh()
      mesh.add_position(vec3(1, 0, 0))
      mesh.add_position(vec3(0, 1, 0))
      mesh.add_position(vec3(0, 0, 1))

      expect(() => {
        return mesh.add_ngon([{ pos: 0 }, { pos: 1 }])
      }).toThrow('vertices must have at least 3 elements')
    })

    it('with 3 vertices creates triangle', () => {
      const mesh = new Mesh()
      mesh.add_position(vec3(1, 0, 0))
      mesh.add_position(vec3(0, 1, 0))
      mesh.add_position(vec3(0, 0, 1))

      const result = mesh.add_ngon([{ pos: 0 }, { pos: 1 }, { pos: 2 }])

      expect(mesh).toBeMesh(
        new Mesh({
          positions: [vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)],
          faces: [[{ pos: 0 }, { pos: 1 }, { pos: 2 }]],
        }),
      )

      const expected = 0
      expect(result).toEqual(expected)
    })

    it('with 5 vertices creates pentagon', () => {
      const mesh = new Mesh()
      mesh.add_position(vec3(1, 0, 0))
      mesh.add_position(vec3(0, 1, 0))
      mesh.add_position(vec3(0, 0, 1))

      const result = mesh.add_ngon([{ pos: 0 }, { pos: 1 }, { pos: 2 }])

      const expected = 0
      expect(result).toEqual(expected)
    })
  })

  describe('compute_face_normals', () => {
    it('computes correct normals', () => {
      const result = POSITIONS_ONLY.compute_face_normals()

      const expected = new Mesh({
        positions: [vec3(0, 0, 0), vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)],
        normals: [vec3(0, 0, 1), vec3(1, 0, 0), vec3(0, 1, 0)],
        faces: [
          [
            { pos: 0, normal: 0 },
            { pos: 1, normal: 0 },
            { pos: 2, normal: 0 },
          ],
          [
            { pos: 0, normal: 1 },
            { pos: 2, normal: 1 },
            { pos: 3, normal: 1 },
          ],
          [
            { pos: 0, normal: 2 },
            { pos: 3, normal: 2 },
            { pos: 1, normal: 2 },
          ],
        ],
      })
      expect(result).toBeMesh(expected)
    })

    it('has_normals() returns true on resulting mesh', () => {
      const mesh = POSITIONS_ONLY

      const result = mesh.compute_face_normals()

      expect(mesh.has_normals()).toBe(false)
      expect(result.has_normals()).toBe(true)
    })
  })

  describe('has_normals', () => {
    it('with empty mesh returns true', () => {
      const mesh = new Mesh()

      const result = mesh.has_normals()

      const expected = true
      expect(result).toEqual(expected)
    })

    it('with mesh without normals returns false', () => {
      const result = POSITIONS_ONLY.has_normals()

      const expected = false
      expect(result).toEqual(expected)
    })
  })

  describe('has_uvs', () => {
    it('with empty uvs returns true', () => {
      const mesh = new Mesh()

      const result = mesh.has_normals()

      const expected = true
      expect(result).toEqual(expected)
    })

    it('with mesh without uvs returns false', () => {
      const result = POSITIONS_ONLY.has_uvs()

      const expected = false
      expect(result).toEqual(expected)
    })
  })

  describe('to_soup', () => {
    it('without normals throws error', () => {
      const mesh = new Mesh()
      const a = mesh.add_position(vec3(0, 0, 0))
      const b = mesh.add_position(vec3(1, 0, 0))
      const c = mesh.add_position(vec3(0, 1, 0))
      mesh.add_triangle({ pos: a }, { pos: b }, { pos: c })

      expect(() => {
        return mesh.to_soup()
      }).toThrow('mesh must have normals')
    })

    it('with empty mesh produces empty soup', () => {
      const mesh = new Mesh()

      const result = mesh.to_soup()

      const expected: TriangleSoup = []
      expect(result).toEqual(expected)
    })

    it('with triangle produces a single triangle soup', () => {
      const result = ONE_TRIANGLE.to_soup()

      const expected: TriangleSoup = [
        {
          normal: vec3(0, 0, 1),
          a: vec3(0, 0, 0),
          b: vec3(1, 0, 0),
          c: vec3(0, 1, 0),
        },
      ]
      expect(result).toEqual(expected)
    })

    it('with quad tessellates into two triangles', () => {
      const result = UNIT_SQUARE.to_soup()

      const expected: TriangleSoup = [
        {
          normal: vec3(0, 0, 1),
          a: vec3(0, 0, 0),
          b: vec3(1, 0, 0),
          c: vec3(1, 1, 0),
        },
        {
          normal: vec3(0, 0, 1),
          a: vec3(0, 0, 0),
          b: vec3(1, 1, 0),
          c: vec3(0, 1, 0),
        },
      ]
      expect(result).toEqual(expected)
    })

    it('with pentagon tessellates into three triangles', () => {
      const result = HOUSE.to_soup()

      const expected: TriangleSoup = [
        {
          normal: vec3(0, 0, 1),
          a: vec3(0, 0, 0),
          b: vec3(1, 0, 0),
          c: vec3(1, 1, 0),
        },
        {
          normal: vec3(0, 0, 1),
          a: vec3(0, 0, 0),
          b: vec3(1, 1, 0),
          c: vec3(0.5, 1.5, 0),
        },
        {
          normal: vec3(0, 0, 1),
          a: vec3(0, 0, 0),
          b: vec3(0.5, 1.5, 0),
          c: vec3(0, 1, 0),
        },
      ]
      expect(result).toEqual(expected)
    })

    it('with two quads tessellates into 4 triangles', () => {
      const result = TWO_SQUARE.to_soup()

      const expected: TriangleSoup = [
        {
          normal: vec3(0, 0, 1),
          a: vec3(0, 0, 0),
          b: vec3(1, 0, 0),
          c: vec3(1, 1, 0),
        },
        {
          normal: vec3(0, 0, 1),
          a: vec3(0, 0, 0),
          b: vec3(1, 1, 0),
          c: vec3(0, 1, 0),
        },
        {
          normal: vec3(0, 0, 1),
          a: vec3(1, 0, 0),
          b: vec3(2, 0, 0),
          c: vec3(2, 1, 0),
        },
        {
          normal: vec3(0, 0, 1),
          a: vec3(1, 0, 0),
          b: vec3(2, 1, 0),
          c: vec3(1, 1, 0),
        },
      ]
      expect(result).toEqual(expected)
    })
  })
})
