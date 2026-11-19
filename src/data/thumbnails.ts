import { backblaze_link } from '../core/links.ts'
import { sort_reverse_chronological } from '../core/Sortable.ts'
import type { Thumbnail } from '../core/Thumbnail.ts'
import {
  ALL_ALBUMS,
  ALL_PROJECTS,
  ALL_STEREO_PAIRS,
  NEW_ARTWORKS,
  OLD_ARTWORKS,
  type PageMetadata,
} from './page_indices.ts'

function frontmatter_to_thumbnail(metadata: PageMetadata): Thumbnail {
  const frontmatter = metadata.frontmatter
  return {
    link: metadata.url,
    thumbnail: {
      url: backblaze_link(frontmatter.thumbnail),
    },
    title: frontmatter.title,
    dates: frontmatter.date,

    sort_key: frontmatter.sort_key,
    hide: frontmatter.hide,
    featured: frontmatter.featured,
  }
}

const OLD_ARTWORK_THUMBNAILS = [...OLD_ARTWORKS, ...ALL_STEREO_PAIRS].map((x) => x.thumbnail)

const NEW_ARTWORK_THUMBNAILS = NEW_ARTWORKS.map(frontmatter_to_thumbnail)

export const ALL_ARTWORK_THUMBNAILS = [...OLD_ARTWORK_THUMBNAILS, ...NEW_ARTWORK_THUMBNAILS]
  .filter((x) => !x.hide)
  .sort(sort_reverse_chronological)

export const ALL_PROJECT_THUMBNAILS = [
  ...ALL_PROJECTS.map((x) => x.thumbnail),
  ...ALL_ALBUMS.map((x) => x.thumbnail),
]
  .filter((x) => !x.hide)
  .sort(sort_reverse_chronological)

export const ALL_ALBUM_THUMBNAILS = ALL_ALBUMS.map((x) => x.thumbnail)
  .filter((x) => !x.hide)
  .sort(sort_reverse_chronological)
