import { createContentLoader } from 'vitepress'
import { Project, type ProjectDescriptor } from '../core/Project.ts'

export default createContentLoader('project/**/*.md')
