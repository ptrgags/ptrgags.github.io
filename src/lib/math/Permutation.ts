use std::{collections::HashSet, fmt::Display, ops::Mul, str::FromStr};

use abstraction::{group::Group, monoid::Monoid, semigroup::Semigroup};

use crate::{disjoint_cycles::DisjointCycles, permutation_error::PermutationError};

/// Mathematical permutation of N elements. An element of the symmetric group S_N
#[derive(Hash, PartialEq, Eq, Clone, Copy, Debug)]
pub struct Permutation<const N: usize> {
    values: [usize; N],
}

impl<const N: usize> Permutation<N> {
    pub fn new(values: [usize; N]) -> Result<Self, PermutationError> {
        let unique_values: HashSet<usize> = HashSet::from_iter(values.iter().cloned());
        if unique_values.len() < values.len() {
            return Err(PermutationError::RepeatElement);
        }

        for value in values {
            if value >= N {
                return Err(PermutationError::ValueOutOfRange(value, N));
            }
        }

        Ok(Self { values })
    }

    pub fn from_disjoint_cycles(
        disjoint_cycles: DisjointCycles<N>,
    ) -> Result<Self, PermutationError> {
        let mut combined = [0; N];
        (0..N).for_each(|i| combined[i] = i);

        let DisjointCycles(cycles) = disjoint_cycles;
        for cycle in cycles.iter().rev() {
            for (i, &element) in cycle.iter().enumerate() {
                combined[element] = cycle[(i + 1) % cycle.len()];
            }
        }

        Self::new(combined)
    }

    pub fn order(&self) -> usize {
        let id = Self::identity();
        let mut current = *self;
        for power in 1.. {
            if current == id {
                return power;
            }

            current = *self * current;
        }

        unreachable!();
    }

    pub fn out_of_place(&self) -> usize {
        let mut count: usize = 0;
        for (i, value) in self.values.iter().enumerate() {
            if *value != i {
                count += 1;
            }
        }

        count
    }

    pub fn cycle_decomposition(&self) -> DisjointCycles<N> {
        let mut visited = [false; N];
        let mut result = Vec::new();

        for start_element in 0..N {
            if visited[start_element] {
                continue;
            }
            visited[start_element] = true;
            let mut cycle = vec![start_element];

            let mut current = self.values[start_element];
            while current != start_element {
                visited[current] = true;
                cycle.push(current);
                current = self.values[current];
            }

            if cycle.len() > 1 {
                result.push(cycle);
            }
        }

        DisjointCycles::new(result).expect("unable to create DisjointCycles from Permutation")
    }
}

impl<const N: usize> FromStr for Permutation<N> {
    type Err = PermutationError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let disjoint_cycles = s.parse::<DisjointCycles<N>>()?;

        Self::from_disjoint_cycles(disjoint_cycles)
    }
}

impl<const N: usize> Display for Permutation<N> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.cycle_decomposition().fmt(f)
    }
}

impl<const N: usize> Mul for Permutation<N> {
    type Output = Self;

    fn mul(self, rhs: Self) -> Self::Output {
        let mut product = [0; N];

        for (i, rhs_value) in rhs.values.iter().enumerate() {
            product[i] = self.values[*rhs_value];
        }

        Self { values: product }
    }
}

impl<const N: usize> Semigroup for Permutation<N> {}
impl<const N: usize> Monoid for Permutation<N> {
    fn identity() -> Self {
        let mut values = [0; N];
        for (i, value) in values.iter_mut().enumerate() {
            *value = i;
        }

        Self { values }
    }
}

impl<const N: usize> Group for Permutation<N> {
    fn inverse(&self) -> Self {
        let mut result = [0usize; N];

        for (i, x) in self.values.iter().enumerate() {
            result[*x] = i;
        }

        Self { values: result }
    }
}
