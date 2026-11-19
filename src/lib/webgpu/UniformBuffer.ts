// Only some types are supported for simplicity.
export enum UniformType {
  F32 = 'f32',
  U32 = 'u32',
  VEC4F = 'vec4f',
  VEC4U = 'vec4u',
}

function component_count(type: UniformType): number {
  switch (type) {
    case UniformType.F32:
    case UniformType.U32:
      return 1
    case UniformType.VEC4F:
    case UniformType.VEC4U:
      return 4
  }
}

interface UniformMember {
  get size_bytes(): number
  get size_components(): number
  set value(val: Uint32Array | Float32Array)
  get value(): Uint32Array
  is_dirty: boolean
}

export class Uniform implements UniformMember {
  readonly type: UniformType
  #value: Uint32Array
  is_dirty: boolean
  readonly size_components: number
  readonly size_bytes: number

  constructor(type: UniformType, value: Uint32Array | Float32Array) {
    this.type = type
    this.size_components = component_count(type)
    this.size_bytes = this.size_components * 4

    if (value.length !== this.size_components) {
      throw new Error(`Uniform: expected ${this.size_components}, got ${value.length}`)
    }

    this.#value = new Uint32Array(value.buffer)
    this.is_dirty = true
  }

  get value(): Uint32Array {
    return this.#value
  }

  set value(val: Uint32Array | Float32Array) {
    const array = new Uint32Array(val.buffer)
    if (array.length !== this.size_components) {
      throw new Error(`value must be an array of length ${this.size_components}`)
    }

    // If the value is the same as the last update, skip the update.
    let changed = false
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== this.#value[i]) {
        changed = true
        break
      }
    }

    if (changed) {
      this.is_dirty = true
      this.#value = array
    }
  }
}

export class UniformArray implements UniformMember {
  readonly type: UniformType
  readonly size_components: number
  readonly size_bytes: number
  #values: Uint32Array
  is_dirty: boolean

  constructor(type: UniformType, length: number, values: Uint32Array | Float32Array) {
    this.type = type
    const components = component_count(type)
    this.size_components = length * components
    this.size_bytes = this.size_components * 4

    if (components % 4 !== 0) {
      throw new Error('Array values must be a multiple of 4 components')
    }

    if (values.length !== this.size_components) {
      throw new Error(`Array must have length ${this.size_components} got ${values.length}`)
    }

    this.#values = new Uint32Array(values.buffer)
    this.is_dirty = true
  }

  get value(): Uint32Array {
    return this.#values
  }

  set value(val: Uint32Array | Float32Array) {
    const array = new Uint32Array(val.buffer)
    if (array.length !== this.size_components) {
      throw new Error(`value must be an array of length ${this.size_components}`)
    }

    // If the value is the same as the last update, skip the update.
    let changed = false
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== this.#values[i]) {
        changed = true
        break
      }
    }

    if (changed) {
      this.is_dirty = true
      this.#values = array
    }
  }
}

export interface UniformMemberDescriptor {
  name: string
  value: UniformMember
}

export class UniformStruct {
  private binding: number
  private member_names: string[]
  private member_map: { [key: string]: UniformMember }
  private buffer?: GPUBuffer
  readonly size_components: number
  readonly size_bytes: number
  values: Uint32Array

  constructor(binding: number, members: UniformMemberDescriptor[]) {
    this.binding = binding
    this.member_names = members.map((x) => x.name)
    this.member_map = {}
    for (const member of members) {
      this.member_map[member.name] = member.value
    }

    this.size_components = members.map((x) => x.value.size_components).reduce((a, b) => a + b, 0)
    this.size_bytes = this.size_components * 4
    this.values = new Uint32Array(this.size_components)
  }

  create(device: GPUDevice) {
    if (this.buffer) {
      throw new Error('uniform buffer already exists!')
    }

    this.buffer = device.createBuffer({
      size: this.size_bytes,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    })

    this.update_buffer(device)
  }

  update_buffer(device: GPUDevice) {
    if (!this.buffer) {
      throw new Error("Buffer hasn't been created yet!")
    }

    // Short circuit if nothing changed this frame
    const is_dirty = Object.values(this.member_map).some((x) => x.is_dirty)
    if (!is_dirty) {
      return
    }

    let offset = 0
    for (let i = 0; i < this.member_names.length; i++) {
      const name = this.member_names[i]
      const member = this.member_map[name]
      if (member.is_dirty) {
        this.values.set(member.value, offset)
        member.is_dirty = false
      }
      offset += member.size_components
    }

    device.queue.writeBuffer(this.buffer, 0, this.values.buffer)
  }

  get layout_entry(): GPUBindGroupLayoutEntry {
    return {
      binding: this.binding,
      visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.VERTEX,
      buffer: {
        type: 'uniform',
      },
    }
  }

  get bind_group_entry(): GPUBindGroupEntry {
    if (!this.buffer) {
      throw new Error('buffer not ready yet!')
    }

    return {
      binding: this.binding,
      resource: {
        buffer: this.buffer,
      },
    }
  }

  get_uniform(name: string): UniformMember {
    return this.member_map[name]
  }

  update(device: GPUDevice) {
    this.update_buffer(device)
  }
}
