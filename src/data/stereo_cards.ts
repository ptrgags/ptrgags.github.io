import type { ArtworkDescriptor } from '@/core/Artwork'
import { undersea_3d_artworks } from './stereo_artworks/undersea_3d'
import { StereoPairArtwork } from '@/core/StereoPairArtwork'

const STEREO_ARTWORK_DESCRIPTORS: ArtworkDescriptor[] = {
  ...undersea_3d_artworks,
}

export const STEREO_ARTWORKS = STEREO_ARTWORK_DESCRIPTORS.map((x) => new StereoPairArtwork(x))
