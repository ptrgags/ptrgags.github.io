import { is_nearly } from '../math/is_nearly.ts'

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
  label: string,
) {
  const received_value = received[property_name]
  const expected_value = expected[property_name]

  label = label ?? property_name
  if (!is_nearly(received_value, expected_value)) {
    diffs.push(`${label}: !is_nearly(${received_value}, ${expected_value})`)
  }
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
