import type { Vec2 } from '../primitives/Vec2.ts'
import { ObserverSignal, type AnalogSignal, type DigitalSignal } from './Signal.ts'

export function prevent_mobile_scroll(canvas: HTMLCanvasElement) {
  const callback = (e: TouchEvent) => {
    if (e.target === canvas) {
      e.preventDefault()
    }
  }

  // Since we're calling event.preventDefault(), we need to mark the event
  // as not passive.
  const options = { passive: false }
  document.body.addEventListener('touchstart', callback, options)
  document.body.addEventListener('touchend', callback, options)
  document.body.addEventListener('touchmove', callback, options)
}

// TODO: Need to implement https://github.com/ptrgags/p5-sketchbook/blob/main/sketchlib/fix_mouse_coords.js
function compute_position(canvas: HTMLCanvasElement, client_x: number, client_y: number): Vec2 {
  const bounding_rect = canvas.getBoundingClientRect()
  const x = client_x - bounding_rect.left
  const y = client_y - bounding_rect.top
  return { x, y }
}

function clamp(x: number, a: number, b: number): number {
  return Math.min(Math.max(x, a), b)
}

function in_bounds(x: number, y: number, width: number, height: number): boolean {
  return x >= 0 && x < width && y >= 0 && y < height
}

const DEAD_ZONE_RADIUS = 0.1

export class PointerInput {
  pressed: boolean
  position: Vec2
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.pressed = false
    this.position = { x: 0, y: 0 }
    this.canvas = canvas
  }

  init() {
    prevent_mobile_scroll(this.canvas)

    this.canvas.addEventListener('pointerdown', (e) => {
      this.pressed = true
      this.position = compute_position(this.canvas, e.clientX, e.clientY)
    })

    this.canvas.addEventListener('pointermove', (e) => {
      this.position = compute_position(this.canvas, e.clientX, e.clientY)
    })

    this.canvas.addEventListener('pointerleave', (e) => {
      this.position = compute_position(this.canvas, e.clientX, e.clientY)
    })

    this.canvas.addEventListener('pointerup', (e) => {
      this.pressed = false
      this.position = compute_position(this.canvas, e.clientX, e.clientY)
    })
  }

  get pressed_signal(): DigitalSignal {
    return new ObserverSignal(() => {
      return this.pressed
    })
  }

  get screen_axes(): [AnalogSignal, AnalogSignal] {
    const x_axis = new ObserverSignal(() => {
      const { width, height } = this.canvas.getBoundingClientRect()
      const center_x = width / 2
      const scale = width / 2

      // If the mouse leaves the canvas, return 0 as if springing back
      // to center.
      if (!in_bounds(this.position.x, this.position.y, width, height)) {
        return 0
      }

      const x = (this.position.x - center_x) / scale

      // Create a dead zone near the center of the screen to minimize
      // false positives
      if (Math.abs(x) < DEAD_ZONE_RADIUS) {
        return 0
      }

      return clamp(x, -1, 1)
    })

    const y_axis = new ObserverSignal(() => {
      const { width, height } = this.canvas.getBoundingClientRect()
      const center_y = height / 2

      // If the mouse leaves the canvas, return 0 as if springing back
      // to center.
      if (!in_bounds(this.position.x, this.position.y, width, height)) {
        return 0
      }

      // Scale with the same units as the x-axis to ensure the pixels are
      // a 1:1 aspect ratio
      const scale = width / 2

      const y = (this.position.y - center_y) / scale

      // Create a dead zone near the center of the screen to minimize
      // false positives
      if (Math.abs(y) < DEAD_ZONE_RADIUS) {
        return 0
      }

      // flip result so y is up
      return -clamp(y, -1, 1)
    })

    return [x_axis, y_axis]
  }

  virtual_button(position_uv: Vec2, dimensions_uv: Vec2): DigitalSignal {
    return new ObserverSignal(() => {
      const { width, height } = this.canvas.getBoundingClientRect()
      const mouse_u = this.position.x / width
      const mouse_v = this.position.y / height
      const mouse_over_button = in_bounds(
        mouse_u - position_uv.x,
        mouse_v - position_uv.y,
        dimensions_uv.x,
        dimensions_uv.y,
      )
      return this.pressed && mouse_over_button
    })
  }
}
