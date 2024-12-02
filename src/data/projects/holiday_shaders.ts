import type { ProjectDescriptor } from '@/core/Project'

export const holiday_shaders: ProjectDescriptor = {
  id: 'holiday-shaders',
  title: 'Holiday Shaders',
  years: '2016',
  sort_key: '2016-12-00:01',
  github_repo: 'holiday-shaders',
  demo_link: 'https://holiday.shaders.dev',
  description: `
    <p>
        In the middle of college, I found myself interested in graphics on
        the GPU. In particular, I found GLSL pixel shaders fascinating. I 
        learned a lot from <a href="https://thebookofshaders.com/">The Book of Shaders</a>,
        <a href="https://www.shadertoy.com/">ShaderToy</a>,
        <a href="https://iquilezles.org/articles/">Inigo Quilez's aticles</a>, 
        and other resources.
    </p>
    <p>
        Around the holidays that year, I used what I learned to make this
        creative project to share with friends and family.
    </p>
  `,
  img_format: 'png',
}
