import type { ProjectDescriptor } from '@/core/Project'

export const holiday_shaders2: ProjectDescriptor = {
  id: 'holiday-shaders2',
  title: 'Holiday Shaders 2',
  years: '2017',
  sort_key: '2017-12-00:01',
  github_repo: 'holiday-shaders2',
  demo_link: 'https://holiday2.shaders.dev',
  description: `
      <p>
        The year after making <a href="#/project/holiday-shaders">Holiday Shaders</a>,
        I made this sequel. I added many new shaders, and a more polished UI.
      </p>
      <p>
        To allow great variation in the imagery, I found a neat trick.
        a hashing algorithm (in this case SHA-256) takes text of any length
        and produces a scrambled sequence of bytes of a fixed size. This means
        the user can type <em>any</em> text in the box and produce a sequence of
        numbers. These numbers are sent to the shader to control the shapes,
        colors and other settings.
      </p>
      <p>
        For the example artworks below, I chose various foods and items you 
        might find in a kitchen as the input words for the algorithm.
      </p>
    `,
  img_format: 'png',
}
