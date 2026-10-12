export async function fetch_text(url: string): Promise<string> {
  const response = await fetch(url)
  return await response.text()
}
