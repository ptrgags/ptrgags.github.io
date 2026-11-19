/**
 * Fetch the response of a URL as plaintext. Used e.g. for importing
 * shader code
 * @param url URL to fetch
 * @returns The text of the file
 */
export async function fetch_text(url: string): Promise<string> {
  const response = await fetch(url)
  return await response.text()
}
