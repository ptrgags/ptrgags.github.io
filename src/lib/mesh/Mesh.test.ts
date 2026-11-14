import { describe, it, expect } from 'vitest'
import { Mesh } from './Mesh.ts'
import { vec3 } from '../math/vector/Vec3.ts'
import { vec2 } from '../primitives/Vec2.ts'

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

describe('Mesh', () => {
  describe('constructor', () => {})
  describe('add_position', () => {})
  describe('add_normal', () => {})
  describe('add_uv', () => {})
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
  describe('compute_face_normals', () => {})
  describe('has_normals', () => {
    it('with empty mesh returns true', () => {
      const mesh = new Mesh()

      const result = mesh.has_normals()

      const expected = true
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
  })
})
