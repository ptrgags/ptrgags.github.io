export interface Image {
  // URL to the image URL.
  url: string
  // Size of the card. Thumbnails are 250x350, full-size cards are 500x700.
  // Defaults to 'thumbnail' if not specified
  size?: 'thumbnail' | 'card'
  // Alt text. Defaults to "" if not specified
  alt_text?: string
  // Link to a resource on this website (where applicable)
  link?: string
}
