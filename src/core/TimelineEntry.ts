import type { Thumbnail } from "./Thumbnail"

export interface TimelineEntry {
    sort_key: string
    title: string
    title_link?: string
    thumbnail?: Thumbnail
    date: string
    description: string
}