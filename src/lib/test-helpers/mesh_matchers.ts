import type { MatcherResult, MatcherState } from 'vitest'
import { VSVec3 } from '../math/vector/Vec3.ts'
import { Mesh, type FaceVertex } from '../mesh/Mesh.ts'
import { VSVec2, type Vec2 } from '../primitives/Vec2.ts'
import { diff_arrays, diff_property, format_diff } from './diff_properties.ts'
import { diff_vec2, diff_vec3 } from './vec_matchers.ts'

function faces_equal(received: FaceVertex[], expected: FaceVertex[]): boolean {
  return received.every((vr, i) => {
    const ve = expected[i]
    return vr.pos === ve.pos && vr.normal === ve.normal && vr.uv === ve.uv
  })
}

function meshes_equal(received: unknown, expected: unknown): boolean {
  if (!(received instanceof Mesh)) {
    return false
  }

  if (!(expected instanceof Mesh)) {
    return false
  }

  // compare lengths
  if (
    received.positions.length !== expected.positions.length ||
    received.uvs.length !== expected.uvs.length ||
    received.normals.length !== expected.normals.length ||
    received.faces.length !== expected.faces.length
  ) {
    return false
  }

  // compare face sizes
  const received_face_lengths = received.faces.map((x) => x.length)
  const expected_face_lengths = expected.faces.map((x) => x.length)
  if (received_face_lengths != expected_face_lengths) {
    return false
  }

  // compare attribute values
  const positions_equal = received.positions.every((x, i) =>
    VSVec3.equals(x, expected.positions[i]),
  )
  const normals_equal = received.normals.every((x, i) => VSVec3.equals(x, expected.normals[i]))
  const uvs_equal = received.uvs.every((x, i) => VSVec2.equals(x, expected.uvs[i]))
  if (!positions_equal || normals_equal || uvs_equal) {
    return false
  }

  // Compare faces
  return received.faces.every((face, i) => faces_equal(face, expected.faces[i]))
}

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

  diff_arrays(diff_vertex, diffs, received, expected)

  return diffs
}

function diff_mesh(diffs: string[], received: unknown, expected: unknown): string[] {
  if (!(received instanceof Mesh)) {
    diffs.push(`recieved is not a Mesh: ${received}`)
    return diffs
  }

  const expected_mesh = expected as Mesh
  diff_arrays(diff_vec3, diffs, received.positions, expected_mesh.positions)
  diff_arrays(diff_vec3, diffs, received.normals, expected_mesh.normals)
  diff_arrays(diff_vec2, diffs, received.uvs, expected_mesh.uvs)

  diff_arrays(diff_face, diffs, received.faces, expected_mesh.faces)

  return diffs
}

export const MESH_MATCHERS = {
  toBeMesh(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return {
      pass: meshes_equal(received, expected),
      message: () => format_diff(diff_mesh([], received, expected)),
    }
  },
}
