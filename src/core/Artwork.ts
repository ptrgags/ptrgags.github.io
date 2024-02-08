import { BACKBLAZE_BUCKET } from "@/core/website_constants"
import type { TimelineEntry } from "@/core/TimelineEntry"

export interface ArtworkDescriptor {
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
    // Alt text for the images
    alt_text?: string,
    // If false, the artwork is hidden.
    show: boolean
}

export class Artwork {
    project_id: string
    id: string
    sort_key: string
    show: boolean
    title: string
    date: string
    card_url?: string
    thumbnail_url?: string
    alt_text: string

    constructor(descriptor: ArtworkDescriptor) {
        this.id = descriptor.id
        this.project_id = descriptor.project_id
        this.sort_key = descriptor.sort_key
        this.show = descriptor.show
        this.title = descriptor.title
        this.date = descriptor.date
        this.alt_text = descriptor.alt_text ?? "TODO: Write alt text"


        this.thumbnail_url = descriptor.has_thumbnail ? `${BACKBLAZE_BUCKET}/artwork-thumbnails/${this.project_id}/${this.id}.png` : undefined
        this.card_url = descriptor.has_card ? `${BACKBLAZE_BUCKET}/artwork-cards/${this.project_id}/${this.id}.png` : undefined
    }

    get artwork_url() {
        return `/artworks/${this.project_id}/${this.id}`
    }

    to_timeline_entry(): TimelineEntry {
        let thumbnail;
        if (this.thumbnail_url) {
            thumbnail = {
                url: this.thumbnail_url,
                alt_text: this.alt_text
            }
        }

        return {
            sort_key: this.sort_key,
            date: `Artwork: ${this.title} (${this.date})`,
            thumbnail,
            description: "Lorem Ipsum blah blah blah blah blah blah"
        }
    }
}