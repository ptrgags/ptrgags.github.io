import { Feed } from 'feed'

import soup from '../src/update/update.data'

const SITE_ROOT = 'https://ptrgags.github.io/'

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
    atom: 'https://ptrgags.dev/feeds/main.xml',
  },
  author: {
    name: 'Peter Gagliardi',
  },
})

console.log(soup)
