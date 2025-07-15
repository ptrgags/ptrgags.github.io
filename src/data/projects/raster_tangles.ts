import { update_url, type ProjectDescriptor } from '@/core/Project'

export const raster_tangles: ProjectDescriptor = {
  id: 'raster-tangles',
  title: 'Raster Tangles',
  years: '2022, 2024-2025',
  sort_key: '2025-07-12:00',
  description: `
    <p>DESCRIPTION</p>
    <p>
    For more details on how this algorithm works, see the
    <a href="https://github.com/ptrgags/raster-tangles/blob/main/raster-tangles.md">Raster Tangles Guide</a>
    </p> in the GitHub repository.
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
            in the GitHub repo
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
                LINK to Raster Tangles Classic
            </p>
        `,
      sort_key: `2022-00-00:01`,
    },
  ],
}
