// Images are hosted here
export const BACKBLAZE_BUCKET = `https://assets.ptrgags.dev/file/ptrgags-website-assets`

/**
 * Format a link for backblaze
 * @param path The path relative to the root of the asset server. Do not include the
 * slash
 */
export function backblaze_link(path: string): string {
  return `${BACKBLAZE_BUCKET}/${path}`
}
