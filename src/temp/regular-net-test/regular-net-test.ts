import { group, style, xform } from '../../lib/primitives/shorthand.ts'
import { ATC_SCREEN } from '../../core/dimensions.ts'
import { Style } from '../../lib/styling/Style.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { vec2 } from '../../lib/primitives/Vec2.ts'

import { Color } from '../../lib/styling/Color.ts'

import type { Printable } from '../../lib/printables/Printable.ts'
import { US_LETTER_INCHES } from '../../lib/printables/dimensions.ts'
import { TextStyle } from '../../lib/styling/TextStyle.ts'
import { Text } from '../../lib/primitives/Text.ts'
import { draw_net, type RegularPolygonNet } from './regular_net.ts'

function triangular_prism(): Printable {
  const TRIANGULAR_PRISM: RegularPolygonNet = {
    sides: 4,
    children: [{ sides: 3 }, { sides: 4, children: [undefined, { sides: 4 }] }, { sides: 3 }],
  }

  const PPI = 100
  const LENGTH_IN = 2
  const scene = xform(
    Rigid.translation(vec2(350, 0)).compose(Rigid.rot_n(4)),
    draw_net(TRIANGULAR_PRISM, LENGTH_IN * PPI, PPI),
  )
  return {
    filename: 'triangular-prism.pdf',
    pixels_per_inch: PPI,
    page_size_inches: US_LETTER_INCHES.dimensions,
    pages: [{ scene, dimensions: ATC_SCREEN.dimensions }],
  }
}

function triangular_cupola(): Printable {
  const PPI = 100
  const LENGTH_IN = 1.5

  const TRIANGULAR_CUPOLA: RegularPolygonNet = {
    sides: 6,
    children: [
      { sides: 4 },
      { sides: 3 },
      { sides: 4, children: [undefined, { sides: 3 }] },
      { sides: 3 },
      { sides: 4 },
      { sides: 3 },
    ],
  }

  const scene = xform(
    Rigid.translation(vec2(150, 200)),
    draw_net(TRIANGULAR_CUPOLA, LENGTH_IN * PPI, PPI),
  )

  const ANOTHER_NET: RegularPolygonNet = {
    sides: 6,
    children: [
      {
        sides: 4,
        children: [
          undefined,
          { sides: 3 },
          {
            sides: 3,
            children: [
              {
                sides: 4,
                children: [
                  undefined,
                  { sides: 3, children: [{ sides: 4, children: [undefined, { sides: 3 }] }] },
                ],
              },
            ],
          },
        ],
      },
    ],
  }

  const scene2 = xform(
    Rigid.translation(vec2(200, 450)),
    draw_net(ANOTHER_NET, LENGTH_IN * PPI, PPI),
  )

  return {
    filename: 'triangular-cupola.pdf',
    pixels_per_inch: PPI,
    page_size_inches: US_LETTER_INCHES.dimensions,
    pages: [
      { scene: scene2, dimensions: ATC_SCREEN.dimensions },
      { scene, dimensions: ATC_SCREEN.dimensions },
    ],
  }
}

function toroid(): Printable {
  const PPI = 100
  const LENGTH_IN = 1.5
  const LENGTH_PX = LENGTH_IN * PPI

  const INNER_TRIANGLE_WALLS: RegularPolygonNet = {
    sides: 4,
    children: [undefined, { sides: 4, children: [undefined, { sides: 4 }] }],
  }

  const CUPOLA_WALLS: RegularPolygonNet = {
    sides: 4,
    children: [
      undefined,
      undefined,
      {
        sides: 3,
        children: [
          {
            sides: 4,
            children: [
              undefined,
              { sides: 3, children: [{ sides: 4, children: [undefined, { sides: 3 }] }] },
            ],
          },
        ],
      },
    ],
  }

  const STYLE_HEADINGS = {
    style: Style.flat(Color.BLACK),
    text_style: new TextStyle(24, 'center', 'baseline'),
  }

  const page1 = group(
    draw_net(INNER_TRIANGLE_WALLS, LENGTH_PX, PPI),
    xform(Rigid.translation(vec2(-100, 300)), draw_net(CUPOLA_WALLS, LENGTH_PX, PPI)),
    style(STYLE_HEADINGS, new Text('Interior Faces', vec2(250, -100))),
  )

  const OUTER_HEX_WALLS: RegularPolygonNet = {
    sides: 4,
    children: [
      undefined,
      {
        sides: 4,
        children: [
          undefined,
          {
            sides: 4,
            children: [
              undefined,
              {
                sides: 4,
                children: [undefined, { sides: 4, children: [undefined, { sides: 4 }] }],
              },
            ],
          },
        ],
      },
    ],
  }

  const page2 = group(
    xform(
      new Rigid({
        translation: vec2(75, -75),
        rotation: Math.PI / 2,
      }),
      draw_net(OUTER_HEX_WALLS, LENGTH_PX, PPI),
    ),

    xform(
      new Rigid({ translation: vec2(200, 600), rotation: -Math.PI / 2 }),
      draw_net(CUPOLA_WALLS, LENGTH_PX, PPI),
    ),
    style(STYLE_HEADINGS, new Text('Exterior Faces', vec2(250, -100))),
  )

  return {
    filename: 'toroid.pdf',
    pixels_per_inch: PPI,
    page_size_inches: US_LETTER_INCHES.dimensions,
    pages: [
      { scene: page1, dimensions: ATC_SCREEN.dimensions },
      { scene: page2, dimensions: ATC_SCREEN.dimensions },
    ],
  }
}

export const PRINTABLES = {
  triangular_prism: triangular_prism(),
  triangular_cupola: triangular_cupola(),
  toroid: toroid(),
}
