import { vector_space_tests } from '../../test-helpers/vector_space_tests.ts'
import { VSVec3 } from './Vec3.ts'

vector_space_tests({
  label: 'Vec3',
  vector_space: VSVec3,
  add_commutativity: [
    { x: 3, y: -1, z: -3 },
    { x: 1, y: 2, z: -4 },
    // expected sum
    { x: 4, y: 1, z: -7 },
  ],
  add_associativity: [
    { x: 1, y: 2, z: 3 },
    { x: -3, y: -4, z: 1 },
    { x: 10, y: 7, z: -5 },
    // expected sum
    { x: 8, y: 5, z: -1 },
  ],
  add_identity: { x: -5, y: 7, z: -7 },
  add_inverse: [
    { x: 3, y: -4, z: -3 },
    { x: -3, y: 4, z: 3 },
  ],
  sub: [
    { x: 10, y: -10, z: 3 },
    { x: 2, y: 2, z: 0 },
    { x: 8, y: -12, z: 3 },
  ],
  scalar_associativity: [3, 5, { x: -6, y: 2, z: 1 }, { x: -90, y: 30, z: 15 }],
  distributivity: [4, { x: 3, y: -2, z: -1 }, { x: 4, y: 7, z: 4 }, { x: 28, y: 20, z: 12 }],
  scalar_identity: { x: -7, y: 11, z: 4 },
  combo: [
    [1, 0.5, -3],
    [
      { x: 1, y: 2, z: 5 },
      { x: -3, y: 4, z: 10 },
      { x: 5, y: -6, z: 2 },
    ],
    { x: -15.5, y: 22, z: 4 },
  ],
  sum: [
    [
      { x: 1, y: 2, z: 3 },
      { x: 2, y: 3, z: 1 },
      { x: 3, y: 1, z: 2 },
    ],
    { x: 6, y: 6, z: 6 },
  ],
  centroid: [
    [
      { x: 1, y: 2, z: 3 },
      { x: 2, y: 3, z: 1 },
      { x: 3, y: 1, z: 2 },
    ],
    { x: 2, y: 2, z: 2 },
  ],
})
