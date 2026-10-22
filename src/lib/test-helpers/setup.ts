import { expect } from 'vitest'
import { PGA_MATCHERS } from './pga_matchers.ts'
import { GEOMETRY_MATCHERS } from './geometry_matchers.ts'
import { CGA_MATCHERS } from './cga_matchers.ts'
import { COMPLEX_MATCHERS } from './complex_matchers.ts'

expect.extend(PGA_MATCHERS)
expect.extend(CGA_MATCHERS)
expect.extend(GEOMETRY_MATCHERS)
expect.extend(COMPLEX_MATCHERS)
