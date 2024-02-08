import type { Thumbnail } from "./Thumbnail"

export interface TimelineEntry {
    sort_key: string
    thumbnail?: Thumbnail
    date: string
    description: string
}