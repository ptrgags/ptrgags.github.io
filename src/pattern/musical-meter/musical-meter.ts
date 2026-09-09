import p5 from 'p5'

import type { Dimensionlike } from '../../lib/primitives/Dimensionlike.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { Clock } from '../../lib/animation/Clock.ts'
import { Tempo } from '../../lib/music/Tempo.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { MeterPrimitive } from './MeterPrimitive.ts'
import { Meter } from './Meter.ts'
import { TimelineCursor } from './TimelineCursor.ts'
import { PulsePrimitive } from './PulsePrimitive.ts'
import type { Drawable } from '../../lib/primitives/Drawable.ts'
import { group, style } from '../../lib/primitives/shorthand.ts'

const SIZE_TIMELINE = {
  width: 400,
  height: 100,
}

interface SceneP5 {
  canvas_size: Dimensionlike
  setup(p: p5): void
  update(p: p5): void
  draw(lib: DrawP5): void
}

function make_sketch(scene: SceneP5) {
  return (p: p5) => {
    const lib = new DrawP5(p)
    p.setup = () => {
      const { width, height } = scene.canvas_size
      p.createCanvas(width, height)
      p.pixelDensity(1)

      scene.setup(p)
    }

    p.draw = () => {
      p.background(0)

      scene.update(p)
      scene.draw(lib)
    }
  }
}

const STYLE_LINES = Style.lines(Color.WHITE, 2)
const STYLE_TEXT = Style.flat(Color.WHITE)

const MEASURE_COUNT = 5
const BEAT_COUNT = 4 * MEASURE_COUNT
const PIXELS_PER_BEAT = 18

class BasicPulse implements SceneP5 {
  canvas_size = SIZE_TIMELINE
  cursor: TimelineCursor
  pulse: PulsePrimitive
  clock: Clock
  beat_label: Text

  constructor() {
    this.clock = new Clock()
    const timeline_start = { x: 10, y: 0.5 * SIZE_TIMELINE.height }

    this.cursor = new TimelineCursor(timeline_start, 0.5 * SIZE_TIMELINE.height, PIXELS_PER_BEAT)
    this.pulse = new PulsePrimitive({
      position: timeline_start,
      radius: 0.25 * SIZE_TIMELINE.height,
      beat_count: BEAT_COUNT,
      spacing: PIXELS_PER_BEAT,
    })
    this.beat_label = new Text('0', { x: 0, y: 10 })
  }

  setup(p: p5): void {
    this.clock.reset()
  }

  update(p: p5): void {
    const t = this.clock.elapsed_time
    const measures = Tempo.sec_to_measures(t, 128) % 5
    const beats = measures * 4

    this.beat_label.text = `Beat ${Math.floor(beats)}`

    this.cursor.update(beats)
  }

  draw(lib: DrawP5): void {
    lib.apply_style(STYLE_LINES)
    this.pulse.draw(lib)
    this.cursor.draw(lib)

    lib.apply_style(STYLE_TEXT)
    this.beat_label.draw(lib)
  }
}

class CommonTime implements SceneP5 {
  canvas_size = { width: SIZE_TIMELINE.width, height: 2 * SIZE_TIMELINE.height }
  meter: Meter
  cursor: TimelineCursor
  clock: Clock
  beat_label: Text
  pulse: PulsePrimitive
  common_time: MeterPrimitive
  measure_label: Text

  constructor() {
    this.clock = new Clock()

    const START_X = 10

    this.cursor = new TimelineCursor(
      { x: START_X, y: SIZE_TIMELINE.height },
      SIZE_TIMELINE.height,
      PIXELS_PER_BEAT,
    )
    this.pulse = new PulsePrimitive({
      position: { x: START_X, y: 0.5 * SIZE_TIMELINE.height },
      radius: 0.25 * SIZE_TIMELINE.height,
      beat_count: BEAT_COUNT,
      spacing: PIXELS_PER_BEAT,
    })
    this.meter = new Meter(4, 4, 0)
    this.common_time = new MeterPrimitive({
      meter: this.meter,
      measure_count: MEASURE_COUNT,
      position: { x: START_X, y: 1.25 * SIZE_TIMELINE.height },
      radius: 0.25 * SIZE_TIMELINE.height,
      beat_spacing: PIXELS_PER_BEAT,
      show_time_signature: false,
    })
    this.beat_label = new Text('', { x: 0, y: 10 })
    this.measure_label = new Text('', { x: 0, y: 175 })
  }

  setup(p: p5): void {
    this.clock.reset()
  }

  update(p: p5): void {
    const t = this.clock.elapsed_time
    const measures = Tempo.sec_to_measures(t, 128) % 5
    const beats = measures * 4

    this.cursor.update(beats)
    this.beat_label.text = `Beat ${Math.floor(beats)}`

    const { measures: measures44, subdivisions: beats44 } = this.meter.beats_to_offset(beats)

    this.measure_label.text = `Measure ${measures44 + 1}, Beat ${Math.floor(beats44) + 1}`
  }

  draw(lib: DrawP5): void {
    lib.apply_style(STYLE_LINES)
    this.pulse.draw(lib)
    this.cursor.draw(lib)
    this.common_time.draw(lib)

    lib.apply_style(STYLE_TEXT)
    this.beat_label.draw(lib)
    this.measure_label.draw(lib)
  }
}

class TimeSignatures implements SceneP5 {
  cursor: TimelineCursor
  clock: Clock
  canvas_size = { width: SIZE_TIMELINE.width, height: 5 * SIZE_TIMELINE.height }
  meters = [new Meter(4, 4, 3), new Meter(2, 2, 3), new Meter(3, 4, 3), new Meter(12, 8, 3)]
  meter_diagrams: MeterPrimitive[]
  primitive: Drawable

  constructor() {
    const start_x = 10 + 3 * PIXELS_PER_BEAT

    this.clock = new Clock()

    this.cursor = new TimelineCursor(
      { x: 10, y: 2.5 * SIZE_TIMELINE.height },
      2.5 * SIZE_TIMELINE.height,
      PIXELS_PER_BEAT,
    )

    const pulse = new PulsePrimitive({
      position: { x: 10, y: 0.5 * SIZE_TIMELINE.height },
      radius: 0.25 * SIZE_TIMELINE.height,
      beat_count: BEAT_COUNT,
      spacing: PIXELS_PER_BEAT,
    })
    this.meter_diagrams = this.meters.map(
      (x, i) =>
        new MeterPrimitive({
          meter: x,
          measure_count: 2,
          position: { x: start_x, y: (i + 1.5) * SIZE_TIMELINE.height },
          radius: 0.5 * SIZE_TIMELINE.height,
          beat_spacing: PIXELS_PER_BEAT,
        }),
    )

    this.primitive = group(...this.meter_diagrams, style(STYLE_LINES, pulse, this.cursor))
  }

  setup(p: p5): void {
    this.clock.reset()
  }

  update(p: p5): void {
    const t = this.clock.elapsed_time
    const measures = Tempo.sec_to_measures(t, 128) % 5
    const beats = measures * 4

    this.cursor.update(beats)
  }
  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  pulse: make_sketch(new BasicPulse()),
  common_time: make_sketch(new CommonTime()),
  time_signatures: make_sketch(new TimeSignatures()),
}
