import { BACKBLAZE_BUCKET } from '@/core/website_constants'
import type { TimelineEntry } from './TimelineEntry'
import type { Image } from './Image'
import type { Thumbnail } from './Thumbnail'

export interface ProjectDescriptor {
  // Unique ID for this project.
  id: string
  // Human-readable title for the project
  title: string
  // Years the project was active, as I wish it to appear on my website
  // in human-readable form
  years: string
  // Sort key, in the format YYYY-MM-00:NN
  // where YYYY-MM is the month the project was most recently updated, and
  // NNN is a 0-padded number to uniquely identify the project (if multiple
  // were updated in the same month)
  sort_key: string
  // HTML description of the project
  description: string
  // Image format.
  img_format: 'png' | 'jpg'
  // GitHub repo name. If present, a link to GitHub will be added on the
  // project page. For programming projects, this must match the ID.
  github_repo?: string
  // If the project has a demo link, put it here
  demo_link?: string
  // Additional updates to add to the timeline that aren't Artworks.
  updates?: TimelineEntry[]
  // If true, hide this entry from the list
  hide?: boolean
}

export class Project {
  readonly id: string
  readonly title: string
  readonly years: string
  readonly description: string
  readonly github_url?: string
  readonly demo_url?: string

  readonly thumbnail: Thumbnail
  readonly card: Image
  readonly updates: TimelineEntry[]

  constructor(descriptor: ProjectDescriptor) {
    this.id = descriptor.id
    this.title = descriptor.title
    this.years = descriptor.years
    this.demo_url = descriptor.demo_link
    this.description = descriptor.description
    this.updates = descriptor.updates ?? []

    this.github_url = descriptor.github_repo
      ? `https://github.com/ptrgags/${descriptor.github_repo}`
      : undefined

    const project_url = `/project/${this.id}`
    const img_format = descriptor.img_format
    const thumbnail_url = `${BACKBLAZE_BUCKET}/project-thumbnails/${this.id}.${img_format}`
    this.thumbnail = {
      title: this.title,
      dates: this.years,
      link: project_url,
      sort_key: descriptor.sort_key,
      thumbnail: {
        url: thumbnail_url,
      },
      hide: descriptor.hide,
    }

    const card_url = `${BACKBLAZE_BUCKET}/project-cards/${this.id}.${img_format}`
    this.card = {
      url: card_url,
    }
  }
}

export function update_url(project_id: string, image_fname: string): string {
  return `${BACKBLAZE_BUCKET}/project-updates/${project_id}/${image_fname}`
}
