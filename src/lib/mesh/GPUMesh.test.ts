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
  describe('add_vertex', () => {})
  describe('add_triangle', () => {})
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
