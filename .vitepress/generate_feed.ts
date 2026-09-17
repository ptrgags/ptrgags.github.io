import { Feed } from 'feed'

import blog_data from '../src/update/update_blog.data'

const SITE_ROOT = 'https://ptrgags.github.io'

function parse_date(iso_date: string): Date {
  const [year, month, date] = iso_date.split('-')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(date))
}

export async function make_feed(): Promise<string> {
  const feed = new Feed({
    title: "Peter Gagliardi's Website",
    id: SITE_ROOT,
    link: SITE_ROOT,
    language: 'en',
    image: `${SITE_ROOT}/preview.png`,
    //favicon: `${SITE_ROOT}/favicon.ico,
    copyright: '©2015-2026 Peter Gagliardi',
    updated: new Date(),
    feedLinks: {
      atom: 'https://ptrgags.dev/feed.xml',
    },
    author: {
      name: 'Peter Gagliardi',
    },
  })

  const updates = await blog_data.load()
  for (const item of updates) {
    feed.addItem({
      title: item.frontmatter.title,
      id: `${SITE_ROOT}${item.url}`,
      link: `${SITE_ROOT}${item.url}`,
      date: parse_date(item.frontmatter.blog_date),
      content: item.html,
      // Image
    })
  }

  return feed.atom1()
}
