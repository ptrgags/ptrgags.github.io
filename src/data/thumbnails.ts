import { sort_reverse_chronological } from '../core/Sortable.ts'
import { ALL_ALBUMS, ALL_ARTWORKS, ALL_PROJECTS, ALL_STEREO_PAIRS } from './page_indices.ts'

export const ALL_ARTWORK_THUMBNAILS = [
  ...ALL_ARTWORKS.map((x) => x.thumbnail),
  ...ALL_STEREO_PAIRS.map((x) => x.thumbnail),
]
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
