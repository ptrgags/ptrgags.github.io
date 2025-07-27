import { update_url, type ProjectDescriptor } from '@/core/Project'

export const raster_tangles: ProjectDescriptor = {
  id: 'raster-tangles',
  title: 'Raster Tangles',
  years: '2022, 2024-2025',
  sort_key: '2025-07-12:00',
  description: `
    <p>
        Raster Tangles is an algorithm to generat pixel art doodles that mimic how I draw.
        It involves repeatedly sub-dividing a canvas with various geometric patterns. Each
        resulting region can be colored, creating a patchwork-like artwork.
    </p>
    <p>
        For more details on how this algorithm works, see the
        <a href="https://github.com/ptrgags/raster-tangles/blob/main/raster-tangles.md">Raster Tangles Guide</a>
        in the GitHub repository.
    </p> 
  `,
  github_repo: 'raster-tangles',
  img_format: 'png',
  updates: [
    {
      title: 'Explainer',
      date: '2025-06-30',
      image: {
        url: update_url('raster-tangles', '2025-06-30_ExplainerDoodle.png'),
      },
      description: `
        <p>
            I made documentation for how the algorithm works, complete with
            plenty of illustrations. You can find it in the
            <a href="https://github.com/ptrgags/raster-tangles/blob/main/raster-tangles.md">Raster Tangles Guide</a>
            in the GitHub repository.
        </p>
      `,
      sort_key: '2025-06-30:01',
    },
    {
      title: 'Raster Tangles Classic',
      date: '2022',
      image: {
        url: update_url('raster-tangles', '2022_RasterTanglesClassic.png'),
      },
      description: `
            <p>
                The original prototype for Raster Tangles was made in a
                different repo, <a href="#/project/p5-sketchbook">P5 Sketchbook</a>.
                The main difference is that it didn't have a concept of outline
                pixels, so the boundaries between regions are less clearly
                defined. This gives it a more fabric-like appearance.
            </p>
            <p>
                <a href="https://ptrgags.dev/p5-sketchbook/RasterTangles/">Link to live version</a>.
            </p>
        `,
      sort_key: `2022-00-00:01`,
    },
  ],
}
