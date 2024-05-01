import { Project } from './Project'
import { BACKBLAZE_BUCKET } from './website_constants'

export interface TrackDescriptor {
  filename: string
  title: string
  date: string
  description: string
}

export interface MusicAlbumDescriptor {
  id: string
  title: string
  release_date: string
  sort_key: string
  description: string
  tracks: TrackDescriptor[]
  // Whether the track should advance or loop when it reaches the end.
  play_style: 'advance' | 'loop'
  hide?: boolean
  featured?: boolean
}

export class MusicAlbum extends Project {
  tracks: TrackDescriptor[]
  play_style: 'advance' | 'loop'

  private album_url: string

  constructor(descriptor: MusicAlbumDescriptor) {
    super({
      id: descriptor.id,
      title: `${descriptor.title} 🎵`,
      years: descriptor.release_date,
      sort_key: descriptor.sort_key,
      description: descriptor.description,
      img_format: 'png',
      featured: descriptor.featured,
    })

    this.url = `/album/${this.id}`
    this.album_url = `${BACKBLAZE_BUCKET}/music-albums/${this.id}`
    const thumbnail_url = `${BACKBLAZE_BUCKET}/project-thumbnails/${this.id}.png`
    this.thumbnail = {
      title: this.title,
      dates: this.years,
      link: this.url,
      sort_key: descriptor.sort_key,
      thumbnail: {
        url: thumbnail_url,
      },
      hide: descriptor.hide,
      featured: descriptor.featured,
    }

    this.tracks = descriptor.tracks
    this.play_style = descriptor.play_style
  }

  get first_track(): TrackDescriptor {
    return this.tracks[0]
  }

  get_track_url(track: TrackDescriptor): string {
    return `${this.album_url}/${track.filename}`
  }
}
