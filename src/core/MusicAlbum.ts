import { Project } from './Project'

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
}

export class MusicAlbum extends Project {
  tracks: TrackDescriptor[]
  play_style: 'advance' | 'loop'

  constructor(descriptor: MusicAlbumDescriptor) {
    super({
      id: descriptor.id,
      title: descriptor.title,
      years: descriptor.release_date,
      sort_key: descriptor.sort_key,
      description: descriptor.description,
      img_format: 'png',
    })

    this.url = `/album/${this.id}`
    this.thumbnail = {
      title: this.title,
      dates: this.years,
      link: this.url,
      sort_key: descriptor.sort_key,
      thumbnail: {
        url: 'https://placekitten.com/250/350',
      },
      hide: descriptor.hide,
    }

    this.tracks = descriptor.tracks
    this.play_style = descriptor.play_style

    this.card = {
      url: 'http://localhost:8080/cover.png',
    }
  }

  get first_track(): TrackDescriptor {
    return this.tracks[0]
  }
}
