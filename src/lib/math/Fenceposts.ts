import { range } from './iteration/range.ts'

export interface FencepostsOptions {
  num_fenceposts: number
  spacing: number
}

export class Fenceposts {
  num_posts: number
  /**
   * Number of gaps between posts
   */
  readonly num_gaps: number
  /**
   * Spacing between posts, this is also the width of gaps
   */
  spacing: number
  readonly length: number

  constructor(num_posts: number, spacing: number) {
    this.num_posts = num_posts
    this.spacing = spacing
    this.num_gaps = num_posts - 1
    this.length = this.num_gaps * this.spacing
  }

  /**
   * Instead of the length
   * @param num_posts The number of fenceposts
   * @param length The length in world units from the first post to the last post
   * @returns the corresponding fenceposts
   */
  static from_posts_length(num_posts: number, length: number): Fenceposts {
    const num_gaps = num_posts - 1
    const spacing = length / num_gaps
    return new Fenceposts(num_posts, spacing)
  }

  /**
   * Specify the number of gaps and the width of each gap
   * @param num_gaps Number of gaps from the first fencepost to the last one
   * @param spacing The width of each gap, i.e. the fencepost spacing
   * @returns
   */
  static from_gaps_spacing(num_gaps: number, spacing: number): Fenceposts {
    const num_posts = num_gaps + 1
    return new Fenceposts(num_posts, spacing)
  }

  /**
   * Divide length into the specified number of gaps
   * @param num_gaps Number of gaps
   * @param length Length of the overall fence
   * @returns Fenceposts for this setup
   */
  static from_gaps_length(num_gaps: number, length: number): Fenceposts {
    const num_posts = num_gaps + 1
    const spacing = length / num_gaps
    return new Fenceposts(num_posts, spacing)
  }

  /**
   * Iterate over the fenceposts, returning data for each post
   * @returns an object containing:
   * i - the post index in [0, num_posts)
   * u - the u value in [0, 1]. This does go exactly to the edges
   * x - the x value in world units, equal to i * spacing
   */
  *iter_posts(): Generator<{
    i: number
    u: number
    x: number
  }> {
    for (let i = 0; i < this.num_posts; i++) {
      const x = i * this.spacing
      const u = i / this.num_gaps
      yield { i, u, x }
    }
  }

  /**
   * Iterate over the centers of gaps, returning data for each point
   * @returns an object containing:
   * i - the post index in [0, gaps)
   * u - the u value in (0, 1), starting at 1 half-gap from the start and ending 1 half-gap from the tend
   * x - the x value in world units from the start
   */
  *iter_gaps(): Generator<{
    i: number
    u: number
    x: number
  }> {
    for (let i = 0; i < this.num_gaps; i++) {
      // divide each gap in half. To get the centers, we
      // take indices 1, 3, 5, ...
      const center_index = 2 * i + 1
      const u = center_index / (2 * this.num_gaps)
      const x = center_index * 0.5 * this.spacing
      yield { i, u, x }
    }
  }
}
