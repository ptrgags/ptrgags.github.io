import { createContentLoader } from 'vitepress'
import { Artwork, type ArtworkDescriptor } from '../core/Artwork.ts'

export default createContentLoader('artwork/**/*.md', {
  transform(data) {
    return data.map((x) => new Artwork(x.frontmatter as ArtworkDescriptor))
  },
})
