import { group_tests } from '../../test-helpers/group_tests.ts'
import { Direction2P } from './Direction2P.ts'
import { GVersor2P, Versor2P } from './Versor2P.ts'

group_tests({
  label: 'Versor2P',
  group: GVersor2P,
  associativity: [
    Versor2P.translation(new Direction2P(3, 4)),
    Versor2P.FLIP_Y,
    Versor2P.FLIP_X,
    Versor2P.translation(new Direction2P(3, 4)).compose(Versor2P.rot_n(2)),
  ],
  identity_law: Versor2P.rot_n(6),
  inverse: [
    Versor2P.translation(new Direction2P(3, -4)),
    Versor2P.translation(new Direction2P(-3, 4)),
  ],
  inv_product: [
    Versor2P.translation(new Direction2P(1, 3)),
    Versor2P.FLIP_Y,
    Versor2P.translation(new Direction2P(-1, 3)).compose(Versor2P.FLIP_Y),
  ],
  diff: [
    Versor2P.rotation(Math.PI / 3),
    Versor2P.rotation(Math.PI / 4),
    Versor2P.rotation(Math.PI / 12),
  ],
  sandwich: [
    Versor2P.translation(new Direction2P(3, 4)),
    Versor2P.rot_n(4),
    Versor2P.translation(new Direction2P(7, 1)).compose(Versor2P.rot_n(4)),
  ],
  commutator: [
    Versor2P.translation(new Direction2P(3, 4)),
    Versor2P.rot_n(4),
    Versor2P.translation(new Direction2P(7, 1)),
  ],
})
