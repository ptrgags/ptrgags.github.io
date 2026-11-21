import type { MatcherResult, MatcherState } from 'vitest'
import { Mesh, type FaceVertex } from '../mesh/Mesh.ts'
import { diff_arrays, diff_property } from './diff_properties.ts'
import { diff_vec2, diff_vec3 } from './vec_matchers.ts'
import { custom_equality_matcher } from './matchermaking.ts'

function diff_vertex(diffs: string[], received: FaceVertex, expected: FaceVertex): string[] {
  diff_property(diffs, received, expected, 'pos')
  diff_property(diffs, received, expected, 'normal')
  diff_property(diffs, received, expected, 'uv')

  return diffs
}

function diff_face(diffs: string[], received: FaceVertex[], expected: FaceVertex[]): string[] {
  if (received.length !== expected.length) {
    diffs.push(`faces not the same size: ${received}, ${expected}`)
    return diffs
  }

  diff_arrays(diff_vertex, diffs, received, expected, 'face')

  return diffs
}

function diff_mesh(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Mesh)) {
    diffs.push(`recieved is not a Mesh: ${received}`)
    return diffs
  }

  const expected_mesh = expected as Mesh
  diff_arrays(diff_vec3, diffs, received.positions, expected_mesh.positions, 'positions')
  diff_arrays(diff_vec3, diffs, received.normals, expected_mesh.normals, 'normals')
  diff_arrays(diff_vec2, diffs, received.uvs, expected_mesh.uvs, 'uvs')

  diff_arrays(diff_face, diffs, received.faces, expected_mesh.faces, 'faces')

  return diffs
}

export const MESH_MATCHERS = {
  toBeMesh(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return custom_equality_matcher(Mesh, diff_mesh, received, expected)
  },
}
