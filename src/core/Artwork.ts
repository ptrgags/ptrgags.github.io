import { BACKBLAZE_BUCKET } from "@/core/website_constants"
import type { TimelineEntry } from "@/core/TimelineEntry"

export interface ArtworkDescriptor {
    // Unique ID of this artwork
    id: string,
    // Human-readable title of this artwork
    title: string,
    // Date the artwork was made as YYYY-MM-DD
    date: string,
    // Short description for the timeline
    tagline: string,
    // Longer HTML description of the artwork for the artwork page
    description: string,
    // Sort the artwork in the format YYYY-MM-DD:NN
    sort_key: string,
    // The corresponding project ID (if it exists)
    project_id: string,
    // Alt text for the images
    alt_text: string,
    // If false, the artwork is hidden.
    show: boolean,
    img_format: "png" | "jpg"
}

export class Artwork {
    project_id: string
    id: string
    sort_key: string
    show: boolean
    title: string
    date: string
    tagline: string
    description: string
    alt_text: string
    img_format: "png" | "jpg"

    constructor(descriptor: ArtworkDescriptor) {
        this.id = descriptor.id
        this.project_id = descriptor.project_id
        this.sort_key = descriptor.sort_key
        this.show = descriptor.show
        this.title = descriptor.title
        this.date = descriptor.date
        this.tagline = descriptor.tagline
        this.description = descriptor.description
        this.alt_text = descriptor.alt_text
        this.img_format = descriptor.img_format
    }

    get artwork_url(): string {
        return `/artwork/${this.project_id}/${this.id}`
    }

    get thumbnail_url(): string {
        return `${BACKBLAZE_BUCKET}/artwork-thumbnails/${this.project_id}/${this.id}.${this.img_format}`
    }

    get card_url(): string {
        return `${BACKBLAZE_BUCKET}/artwork-cards/${this.project_id}/${this.id}.${this.img_format}`
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
            title: `Artwork: ${this.title}`,
            title_link: this.artwork_url,
            date: `${this.date}`,
            thumbnail,
            description: this.tagline,
        }
    }
}