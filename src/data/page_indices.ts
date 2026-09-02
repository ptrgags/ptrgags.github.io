// Vitepress seems to automatically call the load() async function so
// by the time the import happens these will return ContentData[], but
// typescript seems to get confused.
//@ts-ignore
import { data as ARTWORK_METADATA } from '../artwork/artwork.data'
//@ts-ignore
import { data as STEREO_PAIR_METADATA } from '../stereo-pair/stereo-pair.data'
//@ts-ignore
import { data as PROJECT_METADATA } from '../project/project.data'
//@ts-ignore
import { data as ALBUM_METADATA } from '../album/music_album.data'

import { Artwork, type ArtworkDescriptor } from '../core/Artwork.ts'
import { StereoPairArtwork } from '../core/StereoPairArtwork.ts'
import { Project, type ProjectDescriptor } from '../core/Project.ts'
import { MusicAlbum, type MusicAlbumDescriptor } from '../core/MusicAlbum.ts'

export const ALL_ARTWORKS: Artwork[] = ARTWORK_METADATA.map(
  (x: { frontmatter: any }) => new Artwork(x.frontmatter as ArtworkDescriptor),
)
export const ALL_STEREO_PAIRS: StereoPairArtwork[] = STEREO_PAIR_METADATA.map(
  (x: { frontmatter: any }) => new StereoPairArtwork(x.frontmatter as ArtworkDescriptor),
)
export const ALL_PROJECTS: Project[] = PROJECT_METADATA.map(
  (x: { frontmatter: any }) => new Project(x.frontmatter as ProjectDescriptor),
)
export const ALL_ALBUMS: MusicAlbum[] = ALBUM_METADATA.map(
  (x: { frontmatter: any }) => new MusicAlbum(x.frontmatter as MusicAlbumDescriptor),
)
