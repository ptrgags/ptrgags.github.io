import {BACKBLAZE_BUCKET} from '@/core/website_constants'

export interface Artwork {
    // Unique ID of this artwork
    id: string,
    // Human-readable title of this artwork
    title: string,
    // Date the artwork was made as YYYY-MM-DD
    date: string,
    // Sort the artwork in the format YYYY-MM-DD:NN
    sort_key: string,
    // The corresponding project ID (if it exists)
    project_id: string,
    // If true, a 250x350 thumbnail representation of the artwork exists in
    // backblaze as /artwork-thumbnails/<project_id>/<date>_<id>.png
    has_thumbnail: boolean,
    // If true, a larger 500x700 version of the artwork exists in
    // backblaze as /artwork-cards/<project_id>/<date>_<id>.png
    has_card: boolean,
    // If false, the artwork is hidden.
    show: boolean
}

export function get_artwork_url(artwork: Artwork) {
    return `/artwork/${artwork.project_id}/${artwork.id}`
}

export const ARTWORKS: Artwork[] = [
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

export function get_thumbnail_url(artwork: Artwork): string {
    if (artwork.has_thumbnail) {
        // These images will always be 250x350
        return `${BACKBLAZE_BUCKET}/artwork-thumbnails/${artwork.project_id}/${artwork.id}.png`
    }

    // Fallback, use placekitten for now.
    return 'https://placekitten.com/250/350'
}

export function get_card_url(artwork: Artwork): string {
    if (artwork.has_card) {
        // These images will always be 500x700
        return `${BACKBLAZE_BUCKET}/artwork-cards/${artwork.project_id}/${artwork.id}.png`
    }

    // Fallback, use placekitten for now.
    return 'https://placekitten.com/500/700'
}

export const ARTWORKS_NEWEST_FIRST = [...ARTWORKS].sort(
    (a: Artwork, b: Artwork) => b.sort_key.localeCompare(a.sort_key)
)

export const ARTWORKS_NEWEST_5 = ARTWORKS_NEWEST_FIRST.filter(x => x.show).slice(0, 5)