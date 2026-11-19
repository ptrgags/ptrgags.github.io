import { vector_space_tests } from '../test-helpers/vector_space_tests.ts'
import { vec2, VSVec2 } from './Vec2.ts'

vector_space_tests({
  label: 'Vec2',
  vector_space: VSVec2,
  add_commutativity: [
    vec2(3, -1),
    vec2(1, 2),
    // expected sum
    vec2(4, 1),
  ],
  add_associativity: [
    vec2(1, 2),
    vec2(-3, -4),
    vec2(10, 7),
    // expected sum
    vec2(8, 5),
  ],
  add_identity: vec2(-5, 7),
  add_inverse: [vec2(3, -4), vec2(-3, 4)],
  sub: [vec2(10, -10), vec2(2, 2), vec2(8, -12)],
  scalar_associativity: [3, 5, vec2(-6, 2), vec2(-90, 30)],
  distributivity: [4, vec2(3, -2), vec2(4, 7), vec2(28, 20)],
  scalar_identity: vec2(-7, 11),
  combo: [[1, 0.5, -3], [vec2(1, 2), vec2(-3, 4), vec2(5, -6)], vec2(-15.5, 22)],
  sum: [[vec2(1, 2), vec2(2, 3), vec2(3, 1)], { x: 6, y: 6 }],
  centroid: [[vec2(1, 2), vec2(2, 3), vec2(3, 1)], vec2(2, 2)],
})
