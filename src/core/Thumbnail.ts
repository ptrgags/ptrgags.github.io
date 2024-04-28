import type { Image } from './Image'
import type { Sortable } from './Sortable'

/**
 * Thumbnail cards appear on the the various pages that index my various
 * creative projects. They link to the appropriate project/artwork pages
 */
export interface Thumbnail extends Sortable {
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
