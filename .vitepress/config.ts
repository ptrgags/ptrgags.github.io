import { defineConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  title: 'Peter Gagliardi',
  description: 'My portfolio of creative projects',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:title', content: 'Peter Gagliardi' }],
    ['meta', { property: 'og:url', content: 'https://ptrgags.dev' }],
    ['meta', { property: 'og:image', content: '/preview.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:description', content: 'My portfolio of creative projects' }],
  ],
  /*
  rewrites: {
    'path/:slug*': ':slug*'
  }
  */
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  markdown: {
    math: true,
  },
  async buildEnd(siteConfig) {
    const { make_feed } = await import('./generate_feed')
    const atom = await make_feed()

    const filename = `${siteConfig.outDir}/feed.xml`
    writeFileSync(filename, atom)
  },
})
