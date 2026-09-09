import { describe, it, expect } from 'vitest'
import { Group } from './Group.ts'
import { style } from './shorthand.ts'
import { Style } from '../styling/Style.ts'
import { StyleOp } from './StyleOp.ts'
import { Rect } from './Rect.ts'
import type { Drawable } from './Drawable.ts'
import { Text } from './Text.ts'
import { TextStyle } from '../styling/TextStyle.ts'
import { TextStyleOp } from './TextStyleOp.ts'

function make_rect(): Drawable {
  return new Rect({ x: 0, y: 0 }, { width: 10, height: 10 })
}

function make_text(): Drawable {
  return new Text('Test text', { x: 100, y: 100 })
}

describe('style', () => {
  it('with no children returns empty group', () => {
    const result = style(Style.DEFAULT_FLAT)

    const expected = Group.EMPTY
    expect(result).toEqual(expected)
  })

  it('with single child returns operator with single child', () => {
    const rect = make_rect()

    const result = style(Style.DEFAULT_FLAT, rect)

    const expected = new StyleOp(Style.DEFAULT_FLAT, rect)
    expect(result).toEqual(expected)
  })

  it('with multiple children returns operator with multiple children', () => {
    const rect = make_rect()
    const text = make_text()

    const result = style(Style.DEFAULT_FLAT, rect, text)

    const expected = new StyleOp(Style.DEFAULT_FLAT, new Group(rect, text))
    expect(result).toEqual(expected)
  })

  it('with style returns StyleOp', () => {
    const rect = make_rect()

    const result = style(Style.DEFAULT_LINES, rect)

    const expected = new StyleOp(Style.DEFAULT_LINES, rect)
    expect(result).toEqual(expected)
  })

  it('with text style returns TextStyleOp', () => {
    const text = make_text()

    const result = style(TextStyle.DEFAULT, text)

    const expected = new TextStyleOp(TextStyle.DEFAULT, text)
    expect(result).toEqual(expected)
  })

  it('with multiple styles wraps child correctly', () => {
    const text = make_text()

    const result = style({ style: Style.DEFAULT_FLAT, text_style: TextStyle.DEFAULT }, text)

    const expected = new TextStyleOp(TextStyle.DEFAULT, new StyleOp(Style.DEFAULT_FLAT, text))
    expect(result).toEqual(expected)
  })
})
