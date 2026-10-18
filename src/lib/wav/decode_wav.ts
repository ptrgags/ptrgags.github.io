const UTF8 = new TextDecoder('utf-8')

const LITTLE_ENDIAN = true

export interface RiffChunk {
  magic: string
  // length, not including padding byte
  length: number
  data: DataView
}

export function decode_wav(wav_buffer: ArrayBuffer) {
  const data_view = new DataView(wav_buffer)

  const chunks: RiffChunk[] = []

  let offset = 0
  while (offset < data_view.byteLength) {
    const magic = UTF8.decode(new Uint8Array(data_view.buffer, offset, 4))
    const length = data_view.getUint32(offset + 4, LITTLE_ENDIAN)
    const data = new DataView(wav_buffer, offset + 8, length)

    offset = offset + 8 + length

    // handle pad byte
    if (length === 0) {
      offset++
    }

    chunks.push({
      magic,
      length,
      data,
    })
  }

  console.log(chunks)
}
