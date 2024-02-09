export interface Thumbnail {
    url: string
    // Orientation of the image. Defaults to 'portrait' if not specified
    orientation?: 'portrait' | 'landscape'
    alt_text: string
}
