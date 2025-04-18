import type { ArtworkDescriptor } from './Artwork'
import type { Thumbnail } from './Thumbnail'
import type { TimelineEntry } from './TimelineEntry'
import { BACKBLAZE_BUCKET } from './website_constants'

export class StereoPairArtwork {
  readonly project_id: string
  readonly id: string
  readonly title: string
  readonly date: string
  readonly description: string

  readonly url: string

  readonly thumbnail: Thumbnail
  readonly left_card_url: string
  readonly right_card_url: string
  readonly timeline_entry: TimelineEntry

  /**
   * Constructor
   * @param descriptor Same format as artwork descriptor, the only difference is how
   * the images are stored in Backblaze
   */
  constructor(descriptor: ArtworkDescriptor) {
    this.id = descriptor.id
    this.project_id = descriptor.project_id
    this.title = descriptor.title
    this.date = descriptor.date
    this.description = descriptor.description ?? descriptor.timeline_desc

    this.url = `/stereo-pair/${this.project_id}/${this.id}`

    const img_format = descriptor.img_format
    const image_prefix = `${BACKBLAZE_BUCKET}/stereo-pairs/${this.project_id}/${this.id}`
    const thumbnail_url = `${image_prefix}-thumbnail.${img_format}`

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

    this.left_card_url = `${image_prefix}-L.${img_format}`
    this.right_card_url = `${image_prefix}-R.${img_format}`

    this.timeline_entry = {
      sort_key,
      title: `3D Photo: ${this.title}`,
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
