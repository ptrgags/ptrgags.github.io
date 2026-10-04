export class SoundSystem {
  audio_ready: boolean
  events: EventTarget

  constructor() {
    this.audio_ready = false
    this.events = new EventTarget()
  }

  async init() {}

  get time(): number {
    return 0
  }

  register_music(id: string) {}
  play_music(id: string) {}

  register_sfx(id: string) {}
  play_sfx(id: string) {}
}
