import type { ArtworkDescriptor } from '@/core/Artwork'

function make_artwork(date: string, title: string): ArtworkDescriptor {
  const pascal_case = title.replace(/ /g, '')
  return {
    id: `${date}_${pascal_case}`,
    title: title,
    date,
    timeline_desc: 'TODO',
    sort_key: `${date}:01`,
    project_id: 'webgpu-sketchbook',
    img_format: 'png',
  }
}

export const webgpu_sketchbook_artworks: ArtworkDescriptor[] = [
  make_artwork('2024-??-??', 'Eyes'),
  {
    ...make_artwork('2025-??-??', 'Sun and Moon'),
    date: '2024-2025',
  },
  make_artwork('2025-??-??', 'Meltaway'),
  make_artwork('2026-01-??', 'Boolean Color'),
]
