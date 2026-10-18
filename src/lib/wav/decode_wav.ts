const LITTLE_ENDIAN = true

export interface RiffChunk {
  magic: string
  // length, not including padding byte
  length: number
  data: DataView
}

const UTF8 = new TextDecoder('utf-8')
function decode_magic(data_view: DataView, offset: number): string {
  return UTF8.decode(new Uint8Array(data_view.buffer, offset, 4))
}

function parse_riff_chunk(data_view: DataView, offset: number): [number, RiffChunk] {
  const magic = decode_magic(data_view, offset)
  const length = data_view.getUint32(offset + 4, LITTLE_ENDIAN)
  const data = new DataView(data_view.buffer, offset + 8, length)

  let after = offset + 8 + length

  // handle pad byte
  if (length % 2 === 1) {
    after++
  }

  return [after, { magic, length, data }]
}

export function decode_wav(wav_buffer: ArrayBuffer) {
  const data_view = new DataView(wav_buffer)

  const [after_end, riff] = parse_riff_chunk(data_view, 0)
  console.log('RIFF chunk length', riff.length)

  const wav_magic = decode_magic(riff.data, 8)
  console.log('wav chunk magic:', wav_magic)

  const chunks: RiffChunk[] = []
  let chunk_offset = 12
  while (chunk_offset < wav_buffer.byteLength) {
    const [after, chunk] = parse_riff_chunk(data_view, chunk_offset)
    chunks.push(chunk)
    chunk_offset += after
  }

  for (const chunk of chunks) {
    console.log(chunk.magic, 'chunk', chunk.length, 'bytes')
  }
}
