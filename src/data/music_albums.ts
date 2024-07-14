import { MusicAlbum, type MusicAlbumDescriptor } from '@/core/MusicAlbum'
import { boo } from './music_albums/boo'
import { loops } from './music_albums/loops'
import { improvised_vol2 } from './music_albums/improvised_vol2'
import { improvised_vol1 } from './music_albums/improvised_vol1'
import { improvised_vol3 } from './music_albums/improvised_vol3'
import { rewind_and_ffwd } from './music_albums/rewind_and_ffwd'

const ALBUM_DESCRIPTORS: MusicAlbumDescriptor[] = [
  boo,
  improvised_vol1,
  improvised_vol2,
  loops,
  improvised_vol3,
  rewind_and_ffwd,
]

export const ALBUMS = ALBUM_DESCRIPTORS.map((x) => new MusicAlbum(x))
