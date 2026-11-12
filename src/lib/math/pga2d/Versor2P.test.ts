import { group_tests } from '../../test-helpers/group_tests.ts'
import { Direction2P } from './Direction2P.ts'
import { Odd2P } from './Odd2P.ts'
import { GVersor2P, Versor2P } from './Versor2P.ts'

group_tests({
  label: 'Versor2P',
  group: GVersor2P,
  associativity: [
    Versor2P.translation(new Direction2P(3, 4)),
    Versor2P.FLIP_Y,
    Versor2P.rot_n(4),
    // expected
    // TODO: figure this out on paper or with kingdon
    new Versor2P(new Odd2P(0, 0, 0, 0)),
  ],
  identity_law: Versor2P.rot_n(6),
  inverse: [
    Versor2P.translation(new Direction2P(3, -4)),
    Versor2P.translation(new Direction2P(-3, 4)),
  ],
  inv_product: [
    Versor2P.translation(new Direction2P(1, 3)),
    Versor2P.FLIP_Y,
    new Versor2P(new Odd2P(0, 1, -3, -1)),
  ],
  diff: [
    Versor2P.rotation(Math.PI / 3),
    Versor2P.rotation(Math.PI / 4),
    Versor2P.rotation(Math.PI / 12),
  ],
  sandwich: [
    Versor2P.translation(new Direction2P(3, 4)),
    Versor2P.rot_n(4),
    // expected
    // TODO: compute this by hand
    Versor2P.rot_n(4),
  ],
  commutator: [
    Versor2P.translation(new Direction2P(3, 4)),
    Versor2P.rot_n(4),
    // expected
    // TODO: compute this by hand
    Versor2P.translation(new Direction2P(1, 1)),
  ],
})
