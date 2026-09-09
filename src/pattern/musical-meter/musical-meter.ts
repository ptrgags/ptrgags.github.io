import p5 from 'p5'

import type { Dimensionlike } from '../../lib/primitives/Dimensionlike.ts'
import { Gridlines } from '../../lib/primitives/Gridlines.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Color } from '../../lib/styling/Color.ts'
import { LineSegment } from '../../lib/primitives/LineSegment.ts'
import { Rect } from '../../lib/primitives/Rect.ts'
import { DrawP5 } from '../../lib/p5-helpers/DrawP5.ts'
import { Clock } from '../../lib/animation/Clock.ts'
import { Tempo } from '../../lib/music/Tempo.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { MeterPrimitive } from './MeterPrimitive.ts'
import { Meter } from './Meter.ts'
import { TimelineCursor } from './TimelineCursor.ts'

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

const MEASURES_WIDE = 5
const PIXELS_PER_BEAT = 20

class BasicPulse implements SceneP5 {
  canvas_size = SIZE_TIMELINE
  cursor: TimelineCursor
  gridlines: Gridlines
  clock: Clock
  beat_label: Text

  constructor() {
    this.clock = new Clock()
    this.cursor = new TimelineCursor(
      { x: 0, y: 0.5 * SIZE_TIMELINE.height },
      0.5 * SIZE_TIMELINE.height,
      PIXELS_PER_BEAT,
    )
    this.gridlines = new Gridlines({
      bounds: new Rect(
        { x: 0, y: 0.25 * SIZE_TIMELINE.height },
        { width: SIZE_TIMELINE.width, height: 0.5 * SIZE_TIMELINE.height },
      ),
      x_axis: { spacing: PIXELS_PER_BEAT, phase: 0 },
      draw_bounds: false,
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
    this.gridlines.draw(lib)
    this.cursor.draw(lib)

    lib.apply_style(STYLE_TEXT)
    this.beat_label.draw(lib)
  }
}

class CommonTime implements SceneP5 {
  canvas_size = { width: SIZE_TIMELINE.width, height: 2 * SIZE_TIMELINE.height }
  cursor: LineSegment
  beat_lines: Gridlines
  clock: Clock
  beat_label: Text
  common_time_lines: MeterPrimitive

  constructor() {
    this.clock = new Clock()
    this.cursor = new LineSegment({ x: 0, y: 0 }, { x: 0, y: SIZE_TIMELINE.height })
    this.beat_lines = new Gridlines({
      bounds: new Rect(
        { x: 0, y: 0.25 * SIZE_TIMELINE.height },
        { width: SIZE_TIMELINE.width, height: 0.5 * SIZE_TIMELINE.height },
      ),
      x_axis: { spacing: PIXELS_PER_BEAT, phase: 0 },
      draw_bounds: false,
    })
    this.common_time_lines = new MeterPrimitive(
      new Meter(4, 4, 0),
      new Rect({ x: 0, y: SIZE_TIMELINE.height }, SIZE_TIMELINE),
      4,
    )
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

    const cursor_x = beats * PIXELS_PER_BEAT
    this.cursor.start = { x: cursor_x, y: 0 }
    this.cursor.end = { x: cursor_x, y: 2 * SIZE_TIMELINE.height }
  }

  draw(lib: DrawP5): void {
    lib.apply_style(STYLE_LINES)
    this.beat_lines.draw(lib)
    this.cursor.draw(lib)

    this.common_time_lines.draw(lib)

    lib.apply_style(STYLE_TEXT)
    this.beat_label.draw(lib)
  }
}

export const SKETCHES = {
  pulse: make_sketch(new BasicPulse()),
  common_time: make_sketch(new CommonTime()),
}
