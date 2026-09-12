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
import { TextStyle } from '../../lib/styling/TextStyle.ts'
import { SongMeter } from './SongMeter.ts'
import { SongMeterPrimitive } from './SongMeterPrimitive.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import type { Pointlike } from '../../lib/primitives/Pointlike.ts'

interface SceneP5 {
  canvas_size: Dimensionlike
  // No setup() function, just use the constructor!
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
    }

    p.draw = () => {
      p.background(0)
      scene.update(p)
      scene.draw(lib)
    }
  }
}

// like make_sketch but for a sketch that will only render once
function make_static_sketch(scene: SceneP5) {
  return (p: p5) => {
    const lib = new DrawP5(p)
    p.setup = () => {
      const { width, height } = scene.canvas_size
      p.createCanvas(width, height)
      p.pixelDensity(1)
      p.noLoop()

      // Only render once
      p.background(0)
      scene.update(p)
      scene.draw(lib)
    }
  }
}

const ROW_SIZE = { width: 400, height: 100 }
const TIMELINE_SIZE = { width: 360, height: 50 }
const BOUNDS_ROW = new Rect({ x: 0, y: 0 }, ROW_SIZE)
const BOUNDS_TIMELINE = BOUNDS_ROW.align(TIMELINE_SIZE, 'center', 'center')
const PULSE_COUNT = 24
const MEASURE_COUNT = PULSE_COUNT / 4
const PIXELS_PER_PULSE = TIMELINE_SIZE.width / PULSE_COUNT

function make_size(rows: number): Dimensionlike {
  return {
    width: ROW_SIZE.width,
    height: rows * ROW_SIZE.height,
  }
}

function make_cursor(rows: number): TimelineCursor {
  const { x, y } = BOUNDS_ROW.position
  const r = 0.5 * rows * ROW_SIZE.height

  return new TimelineCursor({ x: x, y: y + r }, r, PIXELS_PER_PULSE)
}

function meter_start(row: number): Pointlike {
  const { x, y } = BOUNDS_TIMELINE.position
  return {
    x: x,
    y: row * ROW_SIZE.height + y + 0.5 * TIMELINE_SIZE.height,
  }
}

const STYLE_LINES = Style.lines(Color.WHITE, 2)
const STYLE_TEXT = { style: Style.flat(Color.WHITE), text_style: new TextStyle() }

const PULSES = style(
  STYLE_LINES,
  new PulsePrimitive({
    position: meter_start(0),
    radius: 0.5 * TIMELINE_SIZE.height,
    beat_count: PULSE_COUNT,
    spacing: PIXELS_PER_PULSE,
  }),
)

class BasicPulse implements SceneP5 {
  canvas_size = make_size(1)
  cursor: TimelineCursor
  clock: Clock
  beat_label: Text
  primitive: Drawable

  constructor() {
    this.clock = new Clock()
    this.cursor = make_cursor(1)

    this.beat_label = new Text('0', { x: 0, y: 10 })
    this.primitive = group(
      PULSES,
      style(STYLE_LINES, this.cursor),
      style(STYLE_TEXT, this.beat_label),
    )
  }

  setup(lib: DrawP5): void {
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
    this.primitive.draw(lib)
  }
}

class CommonTime implements SceneP5 {
  canvas_size = make_size(2)
  meter: Meter
  cursor: TimelineCursor
  clock: Clock
  beat_label: Text
  common_time: MeterPrimitive
  measure_label: Text
  primitive: Drawable

  constructor() {
    this.clock = new Clock()

    this.cursor = make_cursor(2)
    this.meter = new Meter(4, 4, 0)
    this.common_time = new MeterPrimitive({
      meter: this.meter,
      measure_count: MEASURE_COUNT,
      position: meter_start(1),
      radius: 0.25 * ROW_SIZE.height,
      beat_spacing: PIXELS_PER_PULSE,
      show_time_signature: false,
    })
    this.beat_label = new Text('', { x: 0, y: 10 })
    this.measure_label = new Text('', { x: 0, y: 175 })

    this.primitive = group(
      PULSES,
      this.common_time,
      style(STYLE_LINES, this.cursor),
      style(STYLE_TEXT, this.beat_label, this.measure_label),
    )
  }

  setup(lib: DrawP5): void {
    this.clock.reset()
  }

  update(p: p5): void {
    const t = this.clock.elapsed_time
    const measures = Tempo.sec_to_measures(t, 128) % 5
    const beats = measures * 4

    this.cursor.update(beats)
    this.beat_label.text = `Beat ${Math.floor(beats)}`

    const { measures: measures44, beats: beats44 } = this.meter.pulses_to_measures(beats)

    this.measure_label.text = `Measure ${measures44 + 1}, Beat ${Math.floor(beats44) + 1}`
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class TimeSignatures implements SceneP5 {
  canvas_size = make_size(5)
  meters = [new Meter(4, 4, 3), new Meter(2, 2, 3), new Meter(3, 4, 3), new Meter(12, 8, 3)]
  measure_counts = [4, 4, 5, 3]
  meter_diagrams: MeterPrimitive[]
  primitive: Drawable

  constructor() {
    this.meter_diagrams = this.meters.map(
      (x, i) =>
        new MeterPrimitive({
          meter: x,
          measure_count: this.measure_counts[i],
          position: meter_start(i + 1),
          radius: 0.5 * ROW_SIZE.height,
          beat_spacing: PIXELS_PER_PULSE,
        }),
    )

    this.primitive = group(...this.meter_diagrams, PULSES)
  }

  update(p: p5): void {}
  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class MeasureNumbers implements SceneP5 {
  canvas_size = make_size(2)
  cursor: TimelineCursor
  clock: Clock
  meter: Meter
  primitive: Drawable
  measure_label: Text

  constructor() {
    this.clock = new Clock()
    this.meter = new Meter(3, 4, 2)
    this.cursor = make_cursor(2)

    const time_signature = new MeterPrimitive({
      meter: this.meter,
      measure_count: 6,
      position: meter_start(1),
      radius: 0.25 * ROW_SIZE.height,
      beat_spacing: PIXELS_PER_PULSE,
      show_time_signature: true,
    })

    this.measure_label = new Text('', { x: 0, y: 175 })

    this.primitive = group(
      PULSES,
      time_signature,
      style(STYLE_LINES, this.cursor),
      style(STYLE_TEXT, this.measure_label),
    )
  }

  update(p: p5): void {
    const t = this.clock.elapsed_time
    const measures = Tempo.sec_to_measures(t, 128) % 5
    const beats = measures * 4

    this.cursor.update(beats)

    const { measures: measures34, beats: beats34 } = this.meter.pulses_to_measures(beats)

    const pickup = measures34 < 0 ? ' (pickup measure)' : ''

    this.measure_label.text = `Measure ${measures34 + 1}.${Math.floor(beats34) + 1}${pickup}`
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

class MixedMeter implements SceneP5 {
  canvas_size = make_size(2)

  clock: Clock
  cursor: TimelineCursor
  meter: SongMeter
  measure_label: Text
  primitive: Drawable

  constructor() {
    this.clock = new Clock()
    this.cursor = make_cursor(2)

    this.meter = new SongMeter({
      pickup_pulses: 1,
      time_signatures: [
        [4, 4, 3],
        [3, 4, 1],
        [7, 8, 1],
      ],
    })

    const meter_primitive = new SongMeterPrimitive({
      meter: this.meter,
      position: meter_start(1),
      radius: 0.25 * ROW_SIZE.height,
      pulse_spacing: PIXELS_PER_PULSE,
      show_time_signature: true,
    })

    this.measure_label = new Text('', { x: 0, y: 175 })

    this.primitive = group(
      meter_primitive,
      PULSES,
      style(STYLE_LINES, this.cursor),
      style(STYLE_TEXT, this.measure_label),
    )
  }

  update(p: p5): void {
    const t = this.clock.elapsed_time
    const measures = Tempo.sec_to_measures(t, 128) % 5
    const beats = measures * 4

    this.cursor.update(beats)

    const measures_beats = this.meter.pulses_to_measures(beats)
    const pickup = measures_beats.is_pickup ? ' (pickup measure)' : ''
    this.measure_label.text = `${measures_beats.measure_number}${pickup}`
  }

  draw(lib: DrawP5): void {
    this.primitive.draw(lib)
  }
}

export const SKETCHES = {
  pulse: make_sketch(new BasicPulse()),
  common_time: make_sketch(new CommonTime()),
  time_signatures: make_static_sketch(new TimeSignatures()),
  measure_numbers: make_sketch(new MeasureNumbers()),
  mixed_meters: make_sketch(new MixedMeter()),
}
