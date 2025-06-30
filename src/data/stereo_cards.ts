import type { ArtworkDescriptor } from '@/core/Artwork'
import { undersea_3d_artworks } from './stereo_artworks/undersea_3d'
import { StereoPairArtwork } from '@/core/StereoPairArtwork'
import { nature_3d_artworks } from './stereo_artworks/nature_3d'

const STEREO_ARTWORK_DESCRIPTORS: ArtworkDescriptor[] = [
  ...undersea_3d_artworks,
  ...nature_3d_artworks,
]

export const STEREO_ARTWORKS = STEREO_ARTWORK_DESCRIPTORS.map((x) => new StereoPairArtwork(x))

type StereoPairsByProject = { [key: string]: StereoPairArtwork[] }

function index_artworks(): StereoPairsByProject {
  const result: StereoPairsByProject = {}
  for (const artwork of STEREO_ARTWORKS) {
    const id = artwork.project_id
    if (result[id] === undefined) {
      result[id] = []
    }
    result[id].push(artwork)
  }

  return result
}
export const STEREO_ARTWORKS_BY_PROJECT = index_artworks()
