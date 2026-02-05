import type { ArtworkDescriptor } from '@/core/Artwork'

// Exported only for unit testing
export function make_atc(iso_date: string, card_id: number): ArtworkDescriptor {
  const padded_id = card_id.toString().padStart(4, '0')
  return {
    id: `${iso_date}_Card${padded_id}`,
    title: `Card ${card_id}/1000`,
    date: iso_date,
    timeline_desc: 'Yet another doodle.',
    sort_key: `${iso_date}:01`,
    project_id: 'next-1000-cards',
    img_format: 'jpg',
  }
}

export const next_1000_cards_artworks: ArtworkDescriptor[] = [
  make_atc('2024-09-23', 3),
  {
    ...make_atc('2024-10-12', 12),
    timeline_desc: `
        I was reading <cite><a href="https://www.google.com/books/edition/The_Algorithmic_Beauty_of_Plants/4F7lBwAAQBAJ?hl=en&gbpv=0">The Algorithmic Beauty of Plants</a></cite>
        around this time. This inspired the tree-shaped motifs.
    `,
    featured: true,
  },
  {
    ...make_atc('2024-10-12', 19),
    timeline_desc: `
        This doodle inspired the "nacho" fractal I made in 
        <a href="#/project/math-notebook">Math Notebook</a>. I was trying to
        match the general structure of the classic
        <a href="https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle">Sierpiński triangle</a>
        fractal, but using curved triangles instead.
    `,
  },
  make_atc('2024-10-18', 27),
  make_atc('2024-11-03', 44),
  make_atc('2024-12-07', 73),
  make_atc('2024-11-15', 58),
  make_atc('2024-12-03', 71),
  make_atc('2024-11-07', 48),
  make_atc('2025-01-07', 85),
  make_atc('2025-01-26', 94),
  make_atc('2025-02-11', 100),
  make_atc('2025-03-07', 112),
  make_atc('2025-05-06', 132),
  make_atc('2025-05-06', 150),
  make_atc('2025-05-25', 121),
  make_atc('2025-06-??', 141),
]
