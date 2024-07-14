import { MusicAlbum, type MusicAlbumDescriptor } from '@/core/MusicAlbum'
import { boo } from './music_albums/boo'
import { loops } from './music_albums/loops'
import { improvised_vol2 } from './music_albums/improvised_vol2'
import { improvised_vol1 } from './music_albums/improvised_vol1'
import { improvised_vol3 } from './music_albums/improvised_vol3'

const ALBUM_DESCRIPTORS: MusicAlbumDescriptor[] = [
  boo,
  improvised_vol1,
  improvised_vol2,
  loops,
  improvised_vol3,
]

export const ALBUMS = ALBUM_DESCRIPTORS.map((x) => new MusicAlbum(x))
