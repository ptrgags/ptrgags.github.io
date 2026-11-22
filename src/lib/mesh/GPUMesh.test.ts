import { describe, it, expect } from 'vitest'
import { GPUMesh } from './GPUMesh.ts'
import { vec3 } from '../math/vector/Vec3.ts'
import { vec2 } from '../primitives/Vec2.ts'
import type { TriangleSoup } from './TriangleSoup.ts'
import { VertexAttribute } from '../webgpu/VertexBuffer.ts'

const ONE_TRIANGLE = new GPUMesh({
  label: 'triangle',
  vertices: [
    { pos: vec3(0, 0, 0), normal: vec3(0, 0, 1), uv: vec2(0, 0) },
    { pos: vec3(1, 0, 0), normal: vec3(0, 0, 1), uv: vec2(1, 0) },
    { pos: vec3(0, 1, 0), normal: vec3(0, 0, 1), uv: vec2(0, 1) },
  ],
  triangles: [[0, 1, 2]],
})

const UNIT_SQUARE = new GPUMesh({
  label: 'square',
  vertices: [
    { pos: vec3(0, 0, 0), normal: vec3(0, 0, 1), uv: vec2(0, 0) },
    { pos: vec3(1, 0, 0), normal: vec3(0, 0, 1), uv: vec2(1, 0) },
    { pos: vec3(1, 1, 0), normal: vec3(0, 0, 1), uv: vec2(1, 1) },
    { pos: vec3(0, 1, 0), normal: vec3(0, 0, 1), uv: vec2(0, 1) },
  ],
  triangles: [
    [0, 1, 2],
    [0, 2, 3],
  ],
})

describe('GPUMesh', () => {
  describe('add_vertex', () => {
    it('adds vertex to empty mesh', () => {
      const mesh = new GPUMesh()

      const result = mesh.add_vertex({
        pos: vec3(0, 0, 0),
        normal: vec3(1, 0, 0),
        uv: vec2(0, 0),
      })

      const expected_index = 0
      const expected_mesh = new GPUMesh({
        vertices: [
          {
            pos: vec3(0, 0, 0),
            normal: vec3(1, 0, 0),
            uv: vec2(0, 0),
          },
        ],
      })
      expect(result).toEqual(expected_index)
      expect(mesh).toEqual(expected_mesh)
    })

    it('vertex index autoincrements', () => {
      const mesh = new GPUMesh()

      const a = mesh.add_vertex({
        pos: vec3(0, 0, 0),
        normal: vec3(0, 0, 1),
        uv: vec2(0, 0),
      })
      const b = mesh.add_vertex({
        pos: vec3(1, 0, 0),
        normal: vec3(0, 0, 1),
        uv: vec2(1, 0),
      })
      const c = mesh.add_vertex({
        pos: vec3(1, 1, 0),
        normal: vec3(0, 0, 1),
        uv: vec2(1, 1),
      })

      const expected_mesh = new GPUMesh({
        vertices: [
          {
            pos: vec3(0, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(0, 0),
          },
          {
            pos: vec3(1, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 0),
          },
          {
            pos: vec3(1, 1, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 1),
          },
        ],
      })
      expect([a, b, c]).toEqual([0, 1, 2])
      expect(mesh).toEqual(expected_mesh)
    })
  })

  describe('add_triangle', () => {
    it('adds single triangle to mesh', () => {
      const mesh = new GPUMesh({
        vertices: [
          {
            pos: vec3(0, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(0, 0),
          },
          {
            pos: vec3(1, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 0),
          },
          {
            pos: vec3(1, 1, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 1),
          },
        ],
      })

      const result = mesh.add_triangle(0, 1, 2)

      const expected_index = 0
      const expected_mesh = new GPUMesh({
        vertices: [
          {
            pos: vec3(0, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(0, 0),
          },
          {
            pos: vec3(1, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 0),
          },
          {
            pos: vec3(1, 1, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 1),
          },
        ],
        triangles: [[0, 1, 2]],
      })
      expect(result).toEqual(expected_index)
      expect(mesh).toEqual(expected_mesh)
    })

    it('adds multiple triangles to mesh', () => {
      const mesh = new GPUMesh({
        vertices: [
          {
            pos: vec3(0, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(0, 0),
          },
          {
            pos: vec3(1, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 0),
          },
          {
            pos: vec3(1, 1, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 1),
          },
          {
            pos: vec3(0, 1, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(0, 1),
          },
        ],
      })

      const abc = mesh.add_triangle(0, 1, 2)
      const acd = mesh.add_triangle(0, 2, 3)

      const expected_mesh = new GPUMesh({
        vertices: [
          {
            pos: vec3(0, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(0, 0),
          },
          {
            pos: vec3(1, 0, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 0),
          },
          {
            pos: vec3(1, 1, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(1, 1),
          },
          {
            pos: vec3(0, 1, 0),
            normal: vec3(0, 0, 1),
            uv: vec2(0, 1),
          },
        ],
        triangles: [
          [0, 1, 2],
          [0, 2, 3],
        ],
      })
      expect(abc).toEqual(0)
      expect(acd).toEqual(1)
      expect(mesh).toEqual(expected_mesh)
    })
  })

  describe('to_soup', () => {
    it('with empty mesh produces empty soup', () => {
      const mesh = new GPUMesh()

      const result = mesh.to_soup()

      const expected: TriangleSoup = []
      expect(result).toEqual(expected)
    })

    it('with triangle produces a single-triangle soup', () => {
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

    it('with quad creates a two-triangle soup', () => {
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
  })

  describe('pack', () => {
    it('empty mesh packs gracefully', () => {
      const mesh = new GPUMesh({ label: 'test' })

      const result = mesh.pack()

      const expected = {
        label: 'test-packed',
        positions: new VertexAttribute(3, []),
        normals: new VertexAttribute(3, []),
        uvs: new VertexAttribute(2, []),
        indices: [],
      }
      expect(result).toEqual(expected)
    })

    it('single triangle packs correctly', () => {
      const result = ONE_TRIANGLE.pack()

      const expected = {
        label: 'triangle-packed',
        positions: new VertexAttribute(
          3,
          [
            0, 0, 0,
            //
            1, 0, 0,
            //
            0, 1, 0,
          ],
        ),
        normals: new VertexAttribute(
          3,
          [
            0, 0, 1,
            //
            0, 0, 1,
            //
            0, 0, 1,
          ],
        ),
        uvs: new VertexAttribute(
          2,
          [
            0, 0,
            //
            1, 0,
            //
            0, 1,
          ],
        ),
        indices: [0, 1, 2],
      }
      expect(result).toEqual(expected)
    })

    it('quad packs correctly', () => {
      const result = UNIT_SQUARE.pack()

      const expected = {
        label: 'square-packed',
        positions: new VertexAttribute(
          3,
          [
            0, 0, 0,
            //
            1, 0, 0,
            //
            1, 1, 0,
            //
            0, 1, 0,
          ],
        ),
        normals: new VertexAttribute(
          3,
          [
            0, 0, 1,
            //
            0, 0, 1,
            //
            0, 0, 1,
            //
            0, 0, 1,
          ],
        ),
        uvs: new VertexAttribute(
          2,
          [
            0, 0,
            //
            1, 0,
            //
            1, 1,
            //
            0, 1,
          ],
        ),
        indices: [
          0, 1, 2,
          //
          0, 2, 3,
        ],
      }
      expect(result).toEqual(expected)
    })
  })
})
