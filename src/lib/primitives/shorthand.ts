import { Style } from '../styling/Style.ts'
import { TextStyle } from '../styling/TextStyle.ts'
import type { Drawable } from './Drawable.ts'
import { Group } from './Group.ts'
import { StyleOp } from './StyleOp.ts'
import { TextStyleOp } from './TextStyleOp.ts'

/**
 * Shorthand for wrapping children in a group. it saves a few characters
 * @param children Children to wrap in a Group
 * @returns grouped children
 */
export function group(...children: Drawable[]): Group {
  return new Group(...children)
}

export interface MultipleStyles {
  style: Style
  text_style: TextStyle
}

/**
 * Style a collection of children
 * @param style The style to apply
 * @param children child primitives
 */
export function style(style: Style, ...children: Drawable[]): Drawable
/**
 * Apply a text style to a collection of children
 * @param text_style The style to apply
 * @param children child primitives
 */
export function style(text_style: TextStyle, ...children: Drawable[]): Drawable
/**
 * Apply multiple kinds of styling to a collection of children.
 * @param style_info The style to apply
 * @param children Child primitives
 */
export function style(style_info: MultipleStyles, ...children: Drawable[]): Drawable
export function style(
  style_info: Style | TextStyle | MultipleStyles,
  ...children: Drawable[]
): Drawable {
  if (children.length === 0) {
    return Group.EMPTY
  }

  // Wrap children in a group if needed so we have a single child.
  const child = children.length === 1 ? children[0] : new Group(...children)

  if (style_info instanceof Style) {
    return new StyleOp(style_info, child)
  }

  if (style_info instanceof TextStyle) {
    return new TextStyleOp(style_info, child)
  }

  return new TextStyleOp(style_info.text_style, new StyleOp(style_info.style, child))
}
