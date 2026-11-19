export interface BindGroupEntry {
  layout_entry: GPUBindGroupLayoutEntry
  bind_group_entry: GPUBindGroupEntry
}

export class BindGroup {
  readonly label: string
  private entries: BindGroupEntry[]
  layout?: GPUBindGroupLayout
  bind_group?: GPUBindGroup

  constructor(label: string, entries: BindGroupEntry[]) {
    this.label = label
    this.entries = entries
  }

  create(device: GPUDevice) {
    this.layout = device.createBindGroupLayout({
      label: this.label,
      entries: this.entries.map((x) => x.layout_entry),
    })

    this.bind_group = device.createBindGroup({
      label: this.label,
      layout: this.layout,
      entries: this.entries.map((x) => x.bind_group_entry),
    })
  }

  attach(index: number, pass: GPUComputePassEncoder | GPURenderPassEncoder) {
    if (!this.bind_group) {
      throw new Error('Bind group not ready!')
    }
    pass.setBindGroup(index, this.bind_group)
  }
}
