import * as Tone from 'tone'

export interface MusicOptions {
  schedule: () => void
  // Start and end measures if a loop is set
  loop?: [number, number]
}

export interface SFXOptions {
  schedule: () => void
}

export class SoundSystem {
  audio_ready: boolean
  events: EventTarget
  music: Map<string, MusicOptions>
  sfx: Map<string, SFXOptions>

  constructor() {
    this.audio_ready = false
    this.events = new EventTarget()

    this.music = new Map()
    this.sfx = new Map()
  }

  async init() {
    await Tone.start()
    this.audio_ready = true
  }

  // transport ============================================================
  get time_ticks(): number {
    if (!this.audio_ready) {
      return 0
    }

    const transport = Tone.getTransport()
    return transport.ticks / transport.PPQ
  }

  // Music ==================================================================
  register_music(id: string, options: MusicOptions) {
    this.music.set(id, options)
  }

  play_music(id: string) {
    if (!this.audio_ready) {
      throw new Error('Audio not yet ready! Did you call init()?')
    }

    const options = this.music.get(id)
    if (!options) {
      throw new Error(`Unknown music ID: ${id}`)
    }

    const transport = Tone.getTransport()

    options.schedule()

    if (options.loop) {
      const [start_measure, end_measure] = options.loop
      const start_time = `${start_measure}:0`
      const end_time = `${end_measure}:0`
      transport.setLoopPoints(start_time, end_time)
      transport.loop = true
    }

    transport.position = 0
    transport.start()
  }

  // Sound Effects ===========================================================
  register_sfx(id: string, options: SFXOptions) {
    this.sfx.set(id, options)
  }

  play_sfx(id: string) {
    if (!this.audio_ready) {
      throw new Error('Audio not yet ready! Did you call init()?')
    }
  }
}
