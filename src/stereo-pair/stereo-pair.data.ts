import { createContentLoader } from 'vitepress'
import { StereoPairArtwork } from '../core/StereoPairArtwork.ts'
import type { ArtworkDescriptor } from '../core/Artwork.ts'

export default createContentLoader('stereo-pair/**/*.md', {
  transform(data) {
    return data.map((x) => new StereoPairArtwork(x.frontmatter as ArtworkDescriptor))
  },
})
