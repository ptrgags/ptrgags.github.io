import type { ArtworkDescriptor } from '@/core/Artwork'

function make_artwork(date: string, title: string, demo_id: string): ArtworkDescriptor {
  const pascal_case = title.replace(/ /g, '')
  return {
    id: `${date}_${pascal_case}`,
    title: title,
    date,
    timeline_desc: 'TODO: Description',
    sort_key: `${date}:01`,
    project_id: 'webgpu-sketchbook',
    img_format: 'png',
    demo_link: `https://ptrgags.dev/webgpu-sketchbook/#/sketch/${demo_id}`,
  }
}

export const webgpu_sketchbook_artworks: ArtworkDescriptor[] = [
  make_artwork('2024-04-25', 'Eyes', 'eyes'),
  {
    ...make_artwork('2025-03-22', 'Sun and Moon', 'sun-and-moon'),
    id: '2025-03-22_SunAndMoon',
    date: '2024-2025',
  },
  make_artwork('2025-03-27', 'Meltaway', 'meltaway'),
  make_artwork('2026-01-21', 'Boolean Color', 'boolean-color'),
]
