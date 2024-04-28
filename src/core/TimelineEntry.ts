import type { Image } from './Image'

/**
 * An entry to be displayed in the Timeline component. This lets me document
 * the history of a creative project.
 */
export interface TimelineEntry {
  // Sort key so entries are shown in reverse chronological order.
  // The format is YYYY-MM-DD:NN where N is to track multiple updates in a
  // single day.
  sort_key: string
  // Title of the entry
  title: string
  // Human-readable date(s) corresponding to this update
  date: string
  // HTML description. I might include external links, but I don't link to
  // other pages since vue-router doesn't seem to detect them.
  description: string
  // Some timeline entries will link to a different page
  title_link?: string
  // When there's an image to go with the update, include it here. The image
  // should be the smaller 250x350 px size.
  image?: Image
}
