import {describe, it, expect} from 'vitest'
import { Permutation } from './Permutation';
import { DisjointCycles } from './DisjointCycles';

describe('Permutation', () => {
    it('new_with_out_of_range_element_returns_error', () => {
        let result = new Permutation(4, [0, 1, 2, 10]);

        assert!(matches!(
            result,
            Err(PermutationError.ValueOutOfRange(_, _))
        ));
    }

    
    it('new_with_duplicate_element_returns_error', () => {
        let result = new Permutation(4, [0, 2, 2, 1]);

        assert!(matches!(result, Err(PermutationError.RepeatElement)));
    }

    
    it('new_returns_permutation_for_valid_elements', () => {
        let result = new Permutation(4, [0, 2, 3, 1]);

        assert!(result.is_ok());
    }

    
    it('from_disjoint_cycles_computes_correct_permutation', () => {
        // (0 2)(3 4)(1 5)
        // is the same as
        // [0 1 2 3 4 5]
        // [2 5 0 4 3 1]
        let cycles = new DisjointCycles(6, [[0, 2], [3, 4], [1, 5]]);
        let result = Permutation.from_disjoint_cycles(cycles);
        let expected = new Permutation(6, [2, 5, 0, 4, 3, 1]);
        assert_eq!(result, expected);
    }

    
    it('multiplication_applies_a_after_b', () => {
        let a = new Permutation(4, [0, 2, 3, 1]);
        let b = new Permutation(4, [0, 1, 3, 2]);

        let result = a * b;

        // a = (1 2 3)
        // b = (2 3)
        // ab = (1 2 3)(2 3) = (1 2) <-- we want this one
        // ba = (2 3)(1 2 3) = (1 3)
        let expected = new Permutation([0, 2, 1, 3]);
        assert_eq!(result, expected);
    }

    /*
    test_identity!(
        Permutation<4>,
        [
            (
                swap,
                Permutation {
                    values: [1, 0, 2, 3]
                }
            ),
            (
                three_cycle,
                Permutation {
                    values: [1, 2, 0, 3]
                }
            ),
            (
                four_cycle,
                Permutation {
                    values: [1, 2, 3, 0]
                }
            ),
            (
                double_swap,
                Permutation {
                    values: [1, 0, 3, 2]
                }
            )
        ]
    );

    test_associativity!(
        Permutation<6>,
        [
            (
                disjoint_swaps,
                Permutation {
                    values: [1, 0, 2, 3, 4, 5]
                },
                Permutation {
                    values: [0, 1, 3, 2, 4, 5]
                },
                Permutation {
                    values: [0, 1, 2, 3, 5, 4]
                }
            ),
            (
                overlapping_swaps,
                Permutation {
                    values: [1, 0, 2, 3, 4, 5]
                },
                Permutation {
                    values: [0, 2, 1, 3, 4, 5]
                },
                Permutation {
                    values: [0, 1, 3, 2, 4, 5]
                }
            )
        ]
    );

    test_inverse!(
        Permutation<3>,
        [(three_cycle, Permutation { values: [1, 2, 0] })]
    );

    test_group!(
        Permutation<4>,
        [(
            octahedral_xy,
            Permutation {
                values: [3, 2, 0, 1]
            },
            Permutation {
                values: [2, 0, 3, 1]
            }
        )]
    );
    */
})
