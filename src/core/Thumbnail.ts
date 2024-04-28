import type { Image } from './Image'

/**
 * Thumbnail cards appear on the the various pages that index my various
 * creative projects. They link to the appropriate project/artwork pages
 */
export interface Thumbnail {
  // Sort key for this entry. YYYY-MM-00:NN for projects, YYYY-MM-DD:NN for
  // artworks.
  sort_key: string
  // The thumbnail image to display
  thumbnail: Image
  // The title of this update
  title: string
  // The dates of this project
  dates: string
  // vue-router link to the resource this card represents.
  link: string
  // If true, this thumbnail will be hidden from listings
  hide?: boolean
  // If true, this thumbnail will be hoisted to the top of the list regardless
  // of sort key
  featured?: boolean
}

export function reverse_chronological(a: Thumbnail, b: Thumbnail): number {
  return b.sort_key.localeCompare(a.sort_key)
}
