import { createContentLoader } from 'vitepress'
import { Artwork } from '../core/Artwork.ts'

export default createContentLoader('./**/*.md', {
  transform(data) {
    return data.map((x) => {
      const fm = x.frontmatter
      return new Artwork({
        id: fm.id,
        title: fm.title,
        date: fm.date,
        timeline_desc: fm.timeline_desc,
        description: fm.description,
        sort_key: fm.sort_key,
        project_id: fm.project_id,
        img_format: fm.image_format,
        demo_link: fm.demo_link,
        hide: fm.hide,
      })
    })
  },
})
