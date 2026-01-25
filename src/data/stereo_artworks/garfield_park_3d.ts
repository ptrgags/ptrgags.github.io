import type { ArtworkDescriptor } from '@/core/Artwork.ts'

function make_artwork(year: string, title: string, position: number): ArtworkDescriptor {
  const pascal_case = title.replace(/ /g, '')

  return {
    id: `${year}_${pascal_case}`,
    title: title,
    date: year,
    timeline_desc: 'TODO',
    sort_key: `${year}:0${position}`,
    project_id: 'garfield-park-3d',
    img_format: 'jpg',
  }
}

export const garfield_park_3d_artworks: ArtworkDescriptor[] = [
  make_artwork('2022-10-21', 'Euphorbia', 1),
  make_artwork('2022-10-21', 'Harla Aloe', 2),
  make_artwork('2022-10-21', 'Itty Bitty Cacti', 3),
  make_artwork('2022-10-21', 'Mosaic Plant', 4),
  make_artwork('2022-10-21', 'Succulent', 5),
  make_artwork('2022-10-21', 'Palm Room', 6),
  make_artwork('2022-10-21', 'The Fern Room', 7),
]
