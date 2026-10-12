#[cfg(test)]
mod test {
    use abstraction::{test_associativity, test_group, test_identity, test_inverse};

    use super::*;

    #[test]
    pub fn new_with_out_of_range_element_returns_error() {
        let result = Permutation::new([0, 1, 2, 10]);

        assert!(matches!(
            result,
            Err(PermutationError::ValueOutOfRange(_, _))
        ));
    }

    #[test]
    pub fn new_with_duplicate_element_returns_error() {
        let result = Permutation::new([0, 2, 2, 1]);

        assert!(matches!(result, Err(PermutationError::RepeatElement)));
    }

    #[test]
    pub fn new_returns_permutation_for_valid_elements() {
        let result = Permutation::new([0, 2, 3, 1]);

        assert!(result.is_ok());
    }

    #[test]
    pub fn from_disjoint_cycles_computes_correct_permutation() {
        // (0 2)(3 4)(1 5)
        // is the same as
        // [0 1 2 3 4 5]
        // [2 5 0 4 3 1]
        let cycles = DisjointCycles::<6>::new(vec![vec![0, 2], vec![3, 4], vec![1, 5]]).unwrap();
        let result = Permutation::from_disjoint_cycles(cycles).unwrap();
        let expected = Permutation::new([2, 5, 0, 4, 3, 1]).unwrap();
        assert_eq!(result, expected);
    }

    #[test]
    pub fn multiplication_applies_a_after_b() {
        let a = Permutation::new([0, 2, 3, 1]).unwrap();
        let b = Permutation::new([0, 1, 3, 2]).unwrap();

        let result = a * b;

        // a = (1 2 3)
        // b = (2 3)
        // ab = (1 2 3)(2 3) = (1 2) <-- we want this one
        // ba = (2 3)(1 2 3) = (1 3)
        let expected = Permutation::new([0, 2, 1, 3]).unwrap();
        assert_eq!(result, expected);
    }

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
}
