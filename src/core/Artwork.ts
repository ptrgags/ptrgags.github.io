import { BACKBLAZE_BUCKET } from '@/core/website_constants'
import type { TimelineEntry } from '@/core/TimelineEntry'
import type { Thumbnail } from './Thumbnail'
import type { Image } from './Image'

export interface ArtworkDescriptor {
  // Unique ID of this artwork
  id: string
  // Human-readable title of this artwork
  title: string
  // Date the artwork was made as YYYY-MM-DD
  date: string
  // Short HTML description for the timeline
  timeline_desc: string
  // Longer HTML description of the artwork for the artwork page for when
  // I have more to say If not specified, the timeline_desc will be used instead
  // This makes it easier to add artworks that I don't have much to say about.
  description?: string
  // Sort the artwork in the format YYYY-MM-DD:NN
  sort_key: string
  // The corresponding project ID (if it exists)
  project_id: string
  // If the thumbnail and card images are PNG or JPEG images
  img_format: 'png' | 'jpg'
  // If true, hide this entry from the list
  hide?: boolean
}

export class Artwork {
  readonly project_id: string
  readonly id: string
  readonly title: string
  readonly date: string
  readonly description: string

  readonly url: string

  readonly thumbnail: Thumbnail
  readonly card: Image
  readonly timeline_entry: TimelineEntry

  constructor(descriptor: ArtworkDescriptor) {
    this.id = descriptor.id
    this.project_id = descriptor.project_id
    this.title = descriptor.title
    this.date = descriptor.date
    this.description = descriptor.description ?? descriptor.timeline_desc

    this.url = `/artwork/${this.project_id}/${this.id}`

    const img_format = descriptor.img_format
    const thumbnail_url = `${BACKBLAZE_BUCKET}/artwork-thumbnails/${this.project_id}/${this.id}.${img_format}`
    const card_url = `${BACKBLAZE_BUCKET}/artwork-cards/${this.project_id}/${this.id}.${img_format}`

    const sort_key = descriptor.sort_key
    this.thumbnail = {
      title: this.title,
      dates: this.date,
      link: this.url,
      sort_key,
      thumbnail: {
        url: thumbnail_url,
        size: 'thumbnail',
      },
    }

    this.card = {
      url: card_url,
      size: 'card',
    }

    this.timeline_entry = {
      sort_key,
      title: `Artwork: ${this.title}`,
      title_link: this.url,
      date: this.date,
      image: {
        url: thumbnail_url,
        size: 'thumbnail',
      },
      description: descriptor.timeline_desc,
    }
  }
}
