import { fetch_text } from '../fetch_text'

export class LazyShader {
  url: string
  wgsl?: string
  fetch_promise?: Promise<string>

  constructor(url: string) {
    this.url = url
  }

  async fetch_wgsl(): Promise<string> {
    // we have a result
    if (this.wgsl !== undefined) {
      return this.wgsl
    }

    if (this.fetch_promise === undefined) {
      this.fetch_promise = fetch_text(this.url).then((wgsl) => (this.wgsl = wgsl))
    }

    return await this.fetch_promise
  }
}
