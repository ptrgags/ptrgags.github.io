/**
 * Mathematical permutation of N elements. An element of the symmetric group S_N
 */
export class Permutation {
    n: number
    values: number[]

     constructor(n: number, values: number[]) {
        const unique_values = [...new Set(values)]
        if (unique_values.length < values.length) {
            throw new Error("values must not include repeat elements")
        }

        for (const value of values) {
            if (value >= n) {
                throw new Error(`permutation<${n}> value out of range: ${value}`)
            }
        }

        this.n = n
        this.values = values
    }

    equals(other: Permutation) {
        return this.order === other.order && arrays_equal(this.values, other.values)
    }

    static from_str(str: string): Permutation{
        let disjoint_cycles = s.parse::<DisjointCycles<N>>()?;

        return Permutation.from_disjoint_cycles(disjoint_cycles)
    }

     static from_disjoint_cycles(
        disjoint_cycles: DisjointCycles,
    ): Permutation {
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

     order(&self): usize {
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

     count_out_of_place(): number {
        return this.values.filter((x, i) => x !== i).count()
    }

     cycle_decomposition() DisjointCycles {
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

     mul(self, rhs: Self): Self::Output {
        let mut product = [0; N];

        for (i, rhs_value) in rhs.values.iter().enumerate() {
            product[i] = self.values[*rhs_value];
        }

        Self { values: product }
    }

     identity(): Self {
        let mut values = [0; N];
        for (i, value) in values.iter_mut().enumerate() {
            *value = i;
        }

        Self { values }
    }

     inverse(&self): Self {
        let mut result = [0usize; N];

        for (i, x) in self.values.iter().enumerate() {
            result[*x] = i;
        }

        Self { values: result }
    }

      toString(&self, f: &mut std::fmt::Formatter<'_>): std::fmt::Result {
        self.cycle_decomposition().fmt(f)
    }
}

    
}

impl<const N: usize> FromStr for Permutation<N> {
    type Err = PermutationError;

     
}
