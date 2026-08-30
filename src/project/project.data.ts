import { createContentLoader } from 'vitepress'
import { Project, type ProjectDescriptor } from '../core/Project.ts'

export default createContentLoader('project/**/*.md', {
  transform(data) {
    return data.map((x) => new Project(x.frontmatter as ProjectDescriptor))
  },
})
