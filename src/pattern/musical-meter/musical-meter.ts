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
      p.createCanvas(SIZE_TIMELINE.width, SIZE_TIMELINE.height)
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
  cursor: LineSegment
  gridlines: Gridlines
  clock: Clock
  beat_label: Text

  constructor() {
    this.clock = new Clock()
    this.cursor = new LineSegment({ x: 0, y: 0 }, { x: 0, y: SIZE_TIMELINE.height })
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

    const cursor_x = beats * PIXELS_PER_BEAT
    this.cursor.start = { x: cursor_x, y: 0 }
    this.cursor.end = { x: cursor_x, y: SIZE_TIMELINE.height }
  }

  draw(lib: DrawP5): void {
    lib.apply_style(STYLE_LINES)
    this.gridlines.draw(lib)
    this.cursor.draw(lib)

    lib.apply_style(STYLE_TEXT)
    this.beat_label.draw(lib)
  }
}

export const SKETCHES = {
  pulse: make_sketch(new BasicPulse()),
}
