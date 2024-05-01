/**
 * Most of the concepts on my website should be sorted reverse chronologically
 */
export interface Sortable {
  // Sort key for this entry. YYYY-MM-00:NN for projects, YYYY-MM-DD:NN for
  // artworks and project updates
  sort_key: string
}

export function sort_reverse_chronological(a: Sortable, b: Sortable) {
  return b.sort_key.localeCompare(a.sort_key)
}
