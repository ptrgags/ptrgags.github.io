import { SIZE_F32 } from './data_sizes.js'

/**
 * Round up a value as described in the WGSL spec, see
 * https://www.w3.org/TR/WGSL/#roundup
 *
 * @param alignment The alignment size. This is a power of two in bytes
 * @param value The value to round up
 * @returns The number rounded up to the next multiple of alignment
 */
function round_up(alignment: number, value: number): number {
  return Math.ceil(value / alignment) * alignment
}

/**
 * A single array of vertex attribute values. Right now, this assumes:
 * - The data is written once at buffer creation
 * - The data is f32 or vecNf
 */
export class VertexAttribute {
  readonly count: number
  readonly components: number
  readonly values: number[]

  constructor(components: number, values: number[]) {
    this.count = values.length / components
    this.components = components
    this.values = values
  }

  get element_size(): number {
    return this.components * SIZE_F32
  }

  get align(): number {
    let aligned_components = this.components
    if (this.components === 3) {
      aligned_components = 4
    }

    return aligned_components * SIZE_F32
  }

  /**
   * Get the total size of the attribute values (not accounting for padding)
   */
  get size(): number {
    return this.count * this.element_size
  }

  get format(): GPUVertexFormat {
    switch (this.components) {
      case 1:
        return 'float32'
      case 2:
        return 'float32x2'
      case 3:
        return 'float32x3'
      case 4:
        return 'float32x4'
    }

    throw new Error('unsupported number of components')
  }

  /**
   * Get a single element of the vertex buffer (which may have multiple components if it is a vector)
   * @param index Index of the element
   * @returns an array of components
   */
  get_element(index: number): number[] {
    const result = new Array(this.components)
    for (let i = 0; i < this.components; i++) {
      result[i] = this.values[this.components * index + i]
    }
    return result
  }

  fill_values(data_view: DataView, offset: number, stride: number) {
    const LITTLE_ENDIAN = true
    for (let i = 0; i < this.count; i++) {
      const element_offset = i * stride + offset

      for (let j = 0; j < this.components; j++) {
        data_view.setFloat32(
          element_offset + j * SIZE_F32,
          this.values[i * this.components + j],
          LITTLE_ENDIAN,
        )
      }
    }
  }
}

function compute_member_offsets(attributes: readonly VertexAttribute[]): number[] {
  const result = []

  let offset = 0
  for (const attribute of attributes) {
    offset = round_up(attribute.align, offset)
    result.push(offset)
    offset += attribute.element_size
  }

  return result
}

function compute_align(attributes: readonly VertexAttribute[]): number {
  let align = 0
  for (const attribute of attributes) {
    align = Math.max(align, attribute.align)
  }

  return align
}

function compute_struct_size(
  align: number,
  member_offsets: readonly number[],
  attributes: readonly VertexAttribute[],
): number {
  const offsets = member_offsets
  const last_index = attributes.length - 1

  return round_up(align, offsets[last_index] + attributes[last_index].element_size)
}

/**
 * Vertex buffer that stores an array of structs, one per vertex. This assumes:
 * - Each member is f32 or vecNf
 * - The attributes have locations 0, 1, ..., N - 1 in the shader
 */
export class VertexBuffer {
  readonly label: string
  readonly attributes: VertexAttribute[]
  readonly member_offsets: number[]
  readonly align: number
  readonly struct_size: number
  private buffer?: GPUBuffer

  constructor(label: string, attributes: VertexAttribute[]) {
    if (attributes.length === 0) {
      throw new Error('Trying to create vertex buffer with no attributes')
    }

    const count = attributes[0].count
    if (attributes.some((x) => x.count !== count)) {
      throw new Error('attributes in a VertexBuffer must have the same length')
    }

    this.label = label
    this.attributes = attributes

    this.member_offsets = compute_member_offsets(attributes)
    this.align = compute_align(attributes)
    this.struct_size = compute_struct_size(this.align, this.member_offsets, attributes)
  }

  get count(): number {
    return this.attributes[0].count
  }

  /**
   * Get the offsets for each member of the VertexInput struct
   */
  create(device: GPUDevice) {
    if (this.buffer) {
      return
    }

    const vertex_buffer = device.createBuffer({
      size: this.count * this.struct_size,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    })

    const data_view = new DataView(vertex_buffer.getMappedRange())
    for (let i = 0; i < this.attributes.length; i++) {
      const offset = this.member_offsets[i]
      const attribute = this.attributes[i]
      attribute.fill_values(data_view, offset, this.struct_size)
    }

    vertex_buffer.unmap()

    this.buffer = vertex_buffer
  }

  get buffer_layout(): GPUVertexBufferLayout {
    const attribute_layouts: GPUVertexAttribute[] = []
    for (let i = 0; i < this.attributes.length; i++) {
      const attribute = this.attributes[i]
      attribute_layouts.push({
        format: attribute.format,
        offset: this.member_offsets[i],
        shaderLocation: i,
      })
    }

    return {
      arrayStride: this.struct_size,
      stepMode: 'vertex',
      attributes: attribute_layouts,
    }
  }

  attach(pass: GPURenderPassEncoder) {
    if (!this.buffer) {
      throw new Error('setting vertex buffer before creation!')
    }

    pass.setVertexBuffer(0, this.buffer)
  }
}
