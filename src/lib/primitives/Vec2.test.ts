import { vector_space_tests } from '../test-helpers/vector_space_tests.ts'
import { VSVec2 } from './Vec2.ts'

vector_space_tests({
  label: 'Vec2',
  vector_space: VSVec2,
  add_commutativity: [
    { x: 3, y: -1 },
    { x: 1, y: 2 },
    // expected sum
    { x: 4, y: 1 },
  ],
  add_associativity: [
    { x: 1, y: 2 },
    { x: -3, y: -4 },
    { x: 10, y: 7 },
    // expected sum
    { x: 8, y: 5 },
  ],
  add_identity: { x: -5, y: 7 },
  add_inverse: [
    { x: 3, y: -4 },
    { x: -3, y: 4 },
  ],
  sub: [
    { x: 10, y: -10 },
    { x: 2, y: 2 },
    { x: 8, y: -12 },
  ],
  scalar_associativity: [3, 5, { x: -6, y: 2 }, { x: -90, y: 30 }],
  distributivity: [4, { x: 3, y: -2 }, { x: 4, y: 7 }, { x: 28, y: 20 }],
  scalar_identity: { x: -7, y: 11 },
  combo: [
    [1, 0.5, -3],
    [
      { x: 1, y: 2 },
      { x: -3, y: 4 },
      { x: 5, y: -6 },
    ],
    { x: -15.5, y: 22 },
  ],
})
