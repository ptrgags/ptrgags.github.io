import { BACKBLAZE_BUCKET } from '@/core/website_constants'
import { type ArtworkDescriptor, Artwork } from '@/core/Artwork'

const ARTWORK_DESCRIPTORS: ArtworkDescriptor[] = [
    {
        id: "2022-06-27_TurtleDances",
        title: "Turtle Dances",
        date: "2022-06-27",
        sort_key: "2022-06-27:01",
        project_id: "paper-toaster",
        has_thumbnail: true,
        has_card: false,
        show: true,
    },
    {
        id: "2022-07-09_ElementaryCA",
        title: "Elementary Cellular Automaton",
        date: "2022-07-09",
        sort_key: "2022-07-09:01",
        project_id: "paper-toaster",
        has_thumbnail: true,
        has_card: false,
        show: true,
    },
    {
        id: "2022-07-24_IsoGrid",
        title: "Isometric Grid",
        date: "2022-07-24",
        sort_key: "2022-07-24:01",
        project_id: "paper-toaster",
        has_thumbnail: true,
        has_card: false,
        show: true,
    },
    {
        id: "2022-08-23_ColoredBraids",
        title: "Colored Braids",
        date: "2022-08-23",
        sort_key: "2022-08-23:01",
        project_id: "paper-toaster",
        has_thumbnail: true,
        has_card: false,
        show: true,
    }
]

export const ARTWORKS = ARTWORK_DESCRIPTORS.map(x => new Artwork(x))

export const ARTWORKS_NEWEST_FIRST = [...ARTWORKS].sort(
    (a: Artwork, b: Artwork) => b.sort_key.localeCompare(a.sort_key)
)

export const ARTWORKS_NEWEST_5 = ARTWORKS_NEWEST_FIRST.filter(x => x.show).slice(0, 5)

type ArtworksByProject = {[key: string]: Artwork[]}

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