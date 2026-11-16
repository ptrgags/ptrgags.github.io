import { is_nearly } from '../math/is_nearly.ts'

/**
 * Diff a property of two objects for jest matchers,
 * adding an error message to the diffs if the property doesn't match
 * @param {string[]} diffs Array of diff messages to update
 * @param {object} received Received object
 * @param {object} expected Expected object
 * @param {string} property_name Property to compare
 */
export function diff_property(
  diffs: string[],
  received: any,
  expected: any,
  property_name: string,
) {
  const received_value = received[property_name]
  const expected_value = expected[property_name]
  if (received_value !== expected_value) {
    diffs.push(`${property_name}: ${received_value} !== ${expected_value}`)
  }
}

/**
 * Like diff_property, but uses is_nearly for float comparisons
 * @param {string[]} diffs Array of diff messages to update
 * @param {object} received Received object
 * @param {object} expected Expected object
 * @param {string} property_name Property to compare
 * @param {string} [label] Label to use for formatting if different than label
 */
export function diff_float_property(
  diffs: string[],
  received: any,
  expected: any,
  property_name: string,
  label?: string,
) {
  const received_value = received[property_name]
  const expected_value = expected[property_name]

  label = label ?? property_name
  if (!is_nearly(received_value, expected_value)) {
    diffs.push(`${label}: !is_nearly(${received_value}, ${expected_value})`)
  }
}

export function diff_arrays<T>(
  diff_func: (diffs: string[], a: T, b: T) => void,
  diffs: string[],
  received: T[],
  expected: T[],
): string[] {
  if (received.length !== expected.length) {
    diffs.push(`wrong length: ${received.length} | ${expected.length}`)
    return diffs
  }

  received.forEach((x, i) => {
    diff_func(diffs, x, expected[i])
  })

  return diffs
}

/**
 * Format diffs for test helpers
 * @param {string[]} diffs Diff error messages
 * @returns {string} Formatted diff string
 */
export function format_diff(diffs: string[]): string {
  const diff_lines = diffs.join('\n')
  return `Actual | Expected\n${diff_lines}`
}
