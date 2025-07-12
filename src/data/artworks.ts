import { type ArtworkDescriptor, Artwork } from '@/core/Artwork'
import { symmetry_sketchbook_artworks } from './artworks/symmetry_sketchbook'
import { paper_toaster_artworks } from './artworks/paper_toaster'
import { p5_sketchbook_artworks } from './artworks/p5_sketchbook'
import { math_notebook_artworks } from './artworks/math_notebook'
import { next_1000_cards_artworks } from './artworks/next_1000_cards'
import { holiday_shaders2_artworks } from './artworks/holiday_shaders2'
import { raster_tangles } from './artworks/raster_tangles'

const ARTWORK_DESCRIPTORS: ArtworkDescriptor[] = [
  ...paper_toaster_artworks,
  {
    id: '2024-02-04_BlueVelvetScarf',
    title: 'Blue Velvet Scarf',
    date: '2024-02-04',
    sort_key: '2024-02-04:01',
    project_id: 'blue-velvet-scarf',
    timeline_desc:
      'The finished scarf. In total, it took about a month and a half and 25 pattern repeats',
    img_format: 'jpg',
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
  },
  {
    id: '2023-09-01_HyperbolicCrochet',
    title: 'Hyperbolic Crochet',
    date: '2023-09-01',
    sort_key: '2023-09:01',
    project_id: 'hyperbolic-crochet',
    timeline_desc:
      'After about two years and one month, I finally finished making this crochet pattern.',
    img_format: 'jpg',
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
  },
  ...symmetry_sketchbook_artworks,
  ...p5_sketchbook_artworks,
  ...math_notebook_artworks,
  ...next_1000_cards_artworks,
  ...holiday_shaders2_artworks,
  ...raster_tangles,
]

export const ARTWORKS = ARTWORK_DESCRIPTORS.map((x) => new Artwork(x))

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
