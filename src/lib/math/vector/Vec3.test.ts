import { vector_space_tests } from '../../test-helpers/vector_space_tests.ts'
import { vec3, VSVec3 } from './Vec3.ts'

vector_space_tests({
  label: 'Vec3',
  vector_space: VSVec3,
  add_commutativity: [
    vec3(3, -1, -3),
    vec3(1, 2, -4),
    // expected sum
    vec3(4, 1, -7),
  ],
  add_associativity: [
    vec3(1, 2, 3),
    vec3(-3, -4, 1),
    vec3(10, 7, -5),
    // expected sum
    vec3(8, 5, -1),
  ],
  add_identity: vec3(-5, 7, -7),
  add_inverse: [vec3(3, -4, -3), vec3(-3, 4, 3)],
  sub: [vec3(10, -10, 3), vec3(2, 2, 0), vec3(8, -12, 3)],
  scalar_associativity: [3, 5, vec3(-6, 2, 1), vec3(-90, 30, 15)],
  distributivity: [4, vec3(3, -2, -1), vec3(4, 7, 4), vec3(28, 20, 12)],
  scalar_identity: vec3(-7, 11, 4),
  combo: [[1, 0.5, -3], [vec3(1, 2, 5), vec3(-3, 4, 10), vec3(5, -6, 2)], vec3(-15.5, 22, 4)],
  sum: [[vec3(1, 2, 3), vec3(2, 3, 1), vec3(3, 1, 2)], vec3(6, 6, 6)],
  centroid: [[vec3(1, 2, 3), vec3(2, 3, 1), vec3(3, 1, 2)], vec3(2, 2, 2)],
})
