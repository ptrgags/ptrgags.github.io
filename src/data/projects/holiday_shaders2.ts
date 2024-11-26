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
        I made this sequel, Holiday Shaders 2. This one has many new shaders,
        and a more polished-looking UI.
      </p>
      <p>
        To allow a great variation in the imagery, I found a neat trick.
        a hashing algorithm (in this case SHA-256) takes text of any length
        and produces a scrambled sequence of bytes of a fixed size. This means
        the user can type _any_ text in the box and produce a sequence of
        numbers. These numbers are sent to the shader to control the shapes,
        colors and other settings.
      </p>
      <p>
        For the artworks below, I chose various things you might find in a
        kitchen as the input words for the algorithm.
      </p>
    `,
  img_format: 'png',
}
