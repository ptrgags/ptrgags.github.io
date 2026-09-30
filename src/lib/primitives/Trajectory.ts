import { RingBuffer } from '../data_structures/RingBuffer.ts'
import type { Drawable } from './Drawable.ts'
import type { DrawingLibrary } from './DrawingLibrary.ts'
import type { Pointlike } from './Pointlike.ts'

export class Trajectory implements Drawable {
  history: RingBuffer<Pointlike>

  constructor(capacity: number) {
    this.history = new RingBuffer(capacity)
  }

  add_point(point: Pointlike) {
    this.history.push(point)
  }

  clear() {
    const old_capacity = this.history.capacity
    this.history = new RingBuffer(old_capacity)
  }

  draw(lib: DrawingLibrary): void {
    lib.polyline([...this.history])
  }
}
