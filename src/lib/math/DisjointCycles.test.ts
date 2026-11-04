import {describe, it, expect} from 'vitest'
import { DisjointCycles } from './DisjointCycles';


describe('DisjointCycles', () => {

    
    it('new_with_out_of_range_element_returns_error', () => {
        let result = new DisjointCycles(4, [[1, 2, 10]]);

        assert!(matches!(
            result,
            Err(PermutationError::ValueOutOfRange(_, _))
        ))
    })

    
    it('new_with_overlapping_cycles_returns_error', () => {
        let result = new DisjointCycles(4, [[1, 2, 3], [0, 2]]);

        assert!(matches!(result, Err(PermutationError::OverlappingCycles)))
    })

    
    it('new_with_disjoint_cycles_returns_struct', () => {
        let cycles: Vec<Vec<usize>> = [[0, 1], [2, 3]];

        let DisjointCycles(result) = new DisjointCycles(4, cycles.clone());

        assert_eq!(&cycles[..], &result[..])
    })

    
    it('parse_with_empty_string_returns_identity', () => {
        let DisjointCycles(result) = "".parse::<DisjointCycles<4>>();

        let expected: Vec<Vec<usize>> = [];
        assert_eq!(&result[..], &expected[..]);
    })

    
    it('parse_with_missing_left_parenthesis_returns_error', () => {
        let result = "1 2)".parse::<DisjointCycles<4>>();

        // You could interpret this case as "values outside the parentheses"
        // or an unmatched parenthesis.
        assert!(
            matches!(result, Err(PermutationError::UnmatchedParenthesis(_)))
                || matches!(result, Err(PermutationError::ValueOutsideParentheses(_)))
        );
    })

    
    it('parse_with_missing_right_parenthesis_returns_error', () => {
        let result = "(1 2".parse::<DisjointCycles<4>>();

        assert!(matches!(
            result,
            Err(PermutationError::UnmatchedParenthesis(_))
        ));
    })

    
    it('parse_with_top_level_number_returns_error', () => {
        let result = "1(2 3)".parse::<DisjointCycles<4>>();

        assert!(matches!(
            result,
            Err(PermutationError::ValueOutsideParentheses(_))
        ))
    })

    
    it('parse_with_whitespace_between_cycles_is_handled_gracefully', () => {
        let DisjointCycles(result) = "(0 3) (1 2)".parse::<DisjointCycles<4>>();

        let expected: Vec<Vec<usize>> = [[0, 3], [1, 2]];
        assert_eq!(&result[..], &expected[..]);
    })

    
    it('parse_with_whitespace_before_first_element_is_handled_gracefully', () => {
        let DisjointCycles(result) = "( 1 2)".parse::<DisjointCycles<4>>();

        let expected: Vec<Vec<usize>> = [[1, 2]];
        assert_eq!(&result[..], &expected[..]);
    })

    
    it('parse_with_whitespace_after_last_element_is_handled_gracefully', () => {
        let DisjointCycles(result) = "(1 2 )".parse::<DisjointCycles<4>>();

        let expected: Vec<Vec<usize>> = [[1, 2]];
        assert_eq!(&result[..], &expected[..]);
    })
    
    
    it('parse_with_nested_parentheses_returns_error', () => {
        let result = "(1 (2 3) 4)".parse::<DisjointCycles<5>>();

        assert!(matches!(result, Err(PermutationError::NestedCycle(_))))
    })

    
    it('parse_with_bad_digit_returns_error', () => {
        let result = "(1 2 a 3)".parse::<DisjointCycles<4>>();

        assert!(matches!(result, Err(PermutationError::BadInt(_))))
    })

    
    it('parse_with_single_cycle_parses_correctly', () => {
        let DisjointCycles(cycles) = "(0 2 3)".parse::<DisjointCycles<4>>();

        let expected: Vec<Vec<usize>> = [[0, 2, 3]];
        assert_eq!(&cycles[..], &expected[..])
    })

    
    it('parse_with_multiple_cycles_parses_correctly', () => {
        let DisjointCycles(cycles) = "(0 3 4)(1 2)".parse::<DisjointCycles<5>>();

        let expected: Vec<Vec<usize>> = [[0, 3, 4], [1, 2]];
        assert_eq!(&cycles[..], &expected[..])
    })

    
    it('to_string_with_empty_cycle_returns_identity', () => {
        let cycles = new DisjointCycles(5, []);

        let result = cycles.to_string();
        assert_eq!(result, "I")
    })

    
    it('to_string_formats_cycles_nicely', () => {
        let cycles = new DisjointCycles(5, [[0, 1, 2], [3, 4]]);

        let result = cycles.to_string();
        assert_eq!(result, "(0 1 2)(3 4)")
    })

    
    it('to_string_ignores_one_cycles', () => {
        let cycles = new DisjointCycles(5, [[0, 2], [1], [3, 4]]);

        let result = cycles.to_string();
        assert_eq!(result, "(0 2)(3 4)")
    })
})
