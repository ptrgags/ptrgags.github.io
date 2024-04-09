import { type ArtworkDescriptor, Artwork } from '@/core/Artwork'
import { symmetry_sketchbook_artworks } from './artworks/symmetry_sketchbook'
import { paper_toaster_artworks } from './artworks/paper_toaster'
import { p5_sketchbook_artworks } from './artworks/p5_sketchbook'

const ARTWORK_DESCRIPTORS: ArtworkDescriptor[] = [
  ...paper_toaster_artworks,
  {
    id: '2024-02-04_BlueVelvetScarf',
    title: 'Blue Velvet Scarf',
    date: '2024-02-04',
    sort_key: '2024-02-04:01',
    project_id: 'blue-velvet-scarf',
    tagline:
      'The finished scarf. In total, it took about a month and a half and 25 pattern repeats',
    img_format: 'jpg',
    alt_text: 'The finished scarf resting on a table',
    description: `
        <p>
            A scarf knitted with blue and black velvet yarn. From start to
            finish, it took me about a month and a half, faster than the previous
            scarf I made.
        </p>
        <p>
            See the project page for more details.
        </p>
        `,
    show: true,
  },
  {
    id: '2023-09-01_HyperbolicCrochet',
    title: 'Hyperbolic Crochet',
    date: '2023-09-01',
    sort_key: '2023-09:01',
    project_id: 'hyperbolic-crochet',
    tagline: 'After about two years and one month, I finally finished making this crochet pattern.',
    img_format: 'jpg',
    alt_text: 'The finished crochet pattern. It looks like coral or a loofah.',
    description: `
        <p>
            This crochet pattern was inspired by the TED talk <a href="https://youtu.be/w1TBZhd-sN0?si=XsH01B6DCeU8LoqT">"Crocheting Hyperbolic Planes"</a>
            by Daina Taimiņa. Every stitch is an increase.
        </p>
        <p>
            Since each additional row is twice the length of the previous one,
            there is no way for the fabric to lay flat. Instead, it curls
            up in 3D space.
        </p>
        <p>
            This type of growth happens often in nature. For example, think
            of brains, coral, or lettuce.
        </p>
    `,
    show: true,
  },
  ...symmetry_sketchbook_artworks,
  ...p5_sketchbook_artworks,
]

export const ARTWORKS = ARTWORK_DESCRIPTORS.map((x) => new Artwork(x))

export const ARTWORKS_NEWEST_FIRST = [...ARTWORKS].sort((a: Artwork, b: Artwork) =>
  b.sort_key.localeCompare(a.sort_key),
)

export const ARTWORKS_NEWEST_5 = ARTWORKS_NEWEST_FIRST.filter((x) => x.show).slice(0, 5)

type ArtworksByProject = { [key: string]: Artwork[] }

function index_artworks(): ArtworksByProject {
  const result: ArtworksByProject = {}
  for (const artwork of ARTWORKS) {
    const id = artwork.project_id
    if (result[id] === undefined) {
      result[id] = []
    }
    result[id].push(artwork)
  }

  return result
}
export const ARTWORKS_BY_PROJECT = index_artworks()
