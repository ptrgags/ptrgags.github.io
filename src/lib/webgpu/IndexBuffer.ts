import { SIZE_U32 } from '../binary/data_sizes.ts'

export class IndexBuffer {
  readonly label: string
  readonly indices: number[]
  private buffer?: GPUBuffer

  constructor(label: string, indices: number[]) {
    this.label = label
    this.indices = indices
  }

  get count(): number {
    return this.indices.length
  }

  create(device: GPUDevice) {
    if (this.buffer) {
      throw new Error('index buffer already exists!')
    }

    const index_buffer = device.createBuffer({
      size: this.indices.length * SIZE_U32,
      usage: GPUBufferUsage.INDEX,
      mappedAtCreation: true,
    })

    const values = new Uint32Array(index_buffer.getMappedRange())
    values.set(this.indices)

    index_buffer.unmap()

    this.buffer = index_buffer
  }

  attach(pass: GPURenderPassEncoder) {
    if (!this.buffer) {
      throw new Error('setting index buffer before creation!')
    }

    pass.setIndexBuffer(this.buffer, 'uint32')
  }
}
