import type { MatcherResult, MatcherState } from 'vitest'
import { VSVec3 } from '../math/vector/Vec3.ts'
import { Mesh, type FaceVertex } from '../mesh/Mesh.ts'
import { VSVec2 } from '../primitives/Vec2.ts'

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

export const MESH_MATCHERS = {
  toBeMesh(this: MatcherState, received: unknown, expected: unknown): MatcherResult {
    return {
      pass: meshes_equal(received, expected),
      message: () => 'diff not yet implemented',
    }
  },
}
